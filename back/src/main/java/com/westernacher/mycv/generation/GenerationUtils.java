package com.westernacher.mycv.generation;

import com.westernacher.mycv.model.Cv;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.OpcPackage;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.wml.ContentAccessor;
import org.docx4j.wml.Text;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBElement;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Component
public class GenerationUtils {
    //TODO get data from CV
    @Async
    public CompletableFuture<Resource> generateWordCv(WordprocessingMLPackage template, Cv cv) throws Exception {

        List<Object> texts = getAllElementFromObject(
                template.getMainDocumentPart(), Text.class);
        this.searchAndReplace(texts, new HashMap<String, String>(){
            {
                this.put("${abcd_efg.soanother_hello_broken_shit}", "Company Name here...");
                this.put("${firstName}", cv.getFirstName());
                this.put("${lastName}", cv.getLastName());
                this.put("${one_here_and}", "Firstname");
                this.put("${one}", "ChildA");
                this.put("${two}", "ChildB");
                this.put("${three}", "ChildC");
            }
            @Override
            public String get(Object key) {
                // TODO Auto-generated method stub
                return super.get(key);
            }
        });

        //TODO switcht to NOT deal with files!!!!
        //this.writeDocxToStream(template, "./finalDocx_"+cv.getId()+".docx");
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        template.save(bos);
        bos.close();
        byte[] arr = bos.toByteArray();
//        InputStream         stream              = new FileInputStream(new File("./finalDocx_"+cv.getId()+".docx"));
        InputStream stream = new ByteArrayInputStream(arr);
        InputStreamResource inputStreamResource = new InputStreamResource(stream);
        return CompletableFuture.completedFuture(inputStreamResource);

    }

    public static void searchAndReplace(List<Object> texts, Map<String, String> values) {

        // -- scan all expressions
        // Will later contain all the expressions used though not used at the moment
        List<String> els = new ArrayList<String>();

        StringBuilder sb = new StringBuilder();
        int PASS = 0;
        int PREPARE = 1;
        int READ = 2;
        int mode = PASS;

        // to nullify
        List<int[]> toNullify = new ArrayList<int[]>();
        int[] currentNullifyProps = new int[4];

        // Do scan of els and immediately insert value
        for(int i = 0; i<texts.size(); i++){
            Object text = texts.get(i);
            Text textElement = (Text) text;
            String newVal = "";
            String v = textElement.getValue();
            //          System.out.println("text: "+v);
            StringBuilder textSofar = new StringBuilder();
            int extra = 0;
            char[] vchars = v.toCharArray();
            for(int col = 0; col<vchars.length; col++){
                char c = vchars[col];
                textSofar.append(c);
                switch(c){
                    case '$': {
                        mode=PREPARE;
                        sb.append(c);
                        //                  extra = 0;
                    } break;
                    case '{': {
                        if(mode==PREPARE){
                            sb.append(c);
                            mode=READ;
                            currentNullifyProps[0]=i;
                            currentNullifyProps[1]=col+extra-1;
                            System.out.println("extra-- "+extra);
                        } else {
                            if(mode==READ){
                                // consecutive opening curl found. just read it
                                // but supposedly throw error
                                sb = new StringBuilder();
                                mode=PASS;
                            }
                        }
                    } break;
                    case '}': {
                        if(mode==READ){
                            mode=PASS;
                            sb.append(c);
                            els.add(sb.toString());
                            newVal +=textSofar.toString()
                                     +(null==values.get(sb.toString())?sb.toString():values.get(sb.toString()));
                            textSofar = new StringBuilder();
                            currentNullifyProps[2]=i;
                            currentNullifyProps[3]=col+extra;
                            toNullify.add(currentNullifyProps);
                            currentNullifyProps = new int[4];
                            extra += sb.toString().length();
                            sb = new StringBuilder();
                        } else if(mode==PREPARE){
                            mode = PASS;
                            sb = new StringBuilder();
                        }
                    }
                    default: {
                        if(mode==READ) sb.append(c);
                        else if(mode==PREPARE){
                            mode=PASS;
                            sb = new StringBuilder();
                        }
                    }
                }
            }
            newVal +=textSofar.toString();
            textElement.setValue(newVal);
        }

        // remove original expressions
        if(toNullify.size()>0)
            for(int i = 0; i<texts.size(); i++){
                if(toNullify.size()==0) break;
                currentNullifyProps = toNullify.get(0);
                Object text = texts.get(i);
                Text textElement = (Text) text;
                String v = textElement.getValue();
                StringBuilder nvalSB = new StringBuilder();
                char[] textChars = v.toCharArray();
                for(int j = 0; j<textChars.length; j++){
                    char c = textChars[j];
                    if(null==currentNullifyProps) {
                        nvalSB.append(c);
                        continue;
                    }
                    // I know 100000 is too much!!! And so what???
                    int floor = currentNullifyProps[0]*100000+currentNullifyProps[1];
                    int ceil = currentNullifyProps[2]*100000+currentNullifyProps[3];
                    int head = i*100000+j;
                    if(!(head>=floor && head<=ceil)){
                        nvalSB.append(c);
                    }

                    if(j>currentNullifyProps[3] && i>=currentNullifyProps[2]){
                        toNullify.remove(0);
                        if(toNullify.size()==0) {
                            currentNullifyProps = null;
                            continue;
                        }
                        currentNullifyProps = toNullify.get(0);
                    }
                }
                textElement.setValue(nvalSB.toString());
            }
    }

    private static List<Object> getAllElementFromObject(Object obj, Class<?> toSearch) {
        List<Object> result = new ArrayList<Object>();
        if (obj instanceof JAXBElement)
            obj = ((JAXBElement<?>) obj).getValue();

        if (obj.getClass().equals(toSearch))
            result.add(obj);
        else if (obj instanceof ContentAccessor) {
            List<?> children = ((ContentAccessor) obj).getContent();
            for (Object child : children) {
                result.addAll(getAllElementFromObject(child, toSearch));
            }

        }
        return result;
    }



    public void writeDocxToStream(WordprocessingMLPackage template, String target) throws IOException, Docx4JException {
        template.save(new File(target));
    }

    public OpcPackage getTemplate(String name, String type) throws Docx4JException, IOException {
        switch(type) {
            case "WORD":{
                Resource resource = new ClassPathResource(name);
                BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));

                return WordprocessingMLPackage
                    .load(resource.getInputStream()); }
            case "POWERPOINT": {
                return PresentationMLPackage.load(new FileInputStream(new File(name)));
            }

            default: return null;
        }
    }
}