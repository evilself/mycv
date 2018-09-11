package com.westernacher.mycv.generation;

import com.westernacher.mycv.model.Cv;
import io.netty.util.concurrent.CompleteFuture;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Slf4j
public class OfficeGenerationService implements GenerationService {

    @Autowired
    private GenerationUtils generationUtils;

    @Override
    public org.springframework.core.io.Resource generateWordCV(Cv cv) throws Exception {
        WordprocessingMLPackage packageWord =  (WordprocessingMLPackage) generationUtils.getTemplate("/templates/templateTest.docx",
                                                                                                     "WORD");
        return generationUtils.generateWordCv(packageWord, cv).get();
    }

    @Override
    public Resource generateZipFromCvList(List<Cv> cvList) throws Exception {

        List<CompletableFuture<Resource>> completableFutureList = cvList.stream().map(cv -> {
            CompletableFuture<Resource> res = null;
            try {
                WordprocessingMLPackage packageWord =  (WordprocessingMLPackage) generationUtils.getTemplate("/templates/templateTest.docx",
                                                                                                             "WORD");
                res = generationUtils.generateWordCv(packageWord, cv);
            }
            catch (Exception e) {
                //TODO
                e.printStackTrace();
            }
            return res;
        }).collect(Collectors
                                                                                                                                     .toList());
        CompletableFuture<Void> combined = CompletableFuture.allOf(completableFutureList.toArray(new CompletableFuture[completableFutureList
                .size()]));

        CompletableFuture<List<Resource>> allResourcesReady = combined.thenApply(v -> completableFutureList.stream()
                                                                                                           .map(r -> r.join())
                                                                                                           .collect(Collectors.toList()));
        return allResourcesReady.thenApply(f-> this.generateZipFromResourceList(f)).get();
    }

    @Override
    public void generatePowerPointCV() throws Docx4JException, FileNotFoundException{
        PresentationMLPackage packagePP =  (PresentationMLPackage) generationUtils.getTemplate("", "POWERPOINT");
    }

    private Resource generateZipFromResourceList(List<Resource> resourceList) {
        String zipFile = "./CvList.zip";

        //String[] srcFiles = { "C:/srcfile1.txt", "C:/srcfile2.txt", "C:/srcfile3.txt"};

        try {

            // create byte buffer
            byte[] buffer = new byte[1024];

            FileOutputStream fos = new FileOutputStream(zipFile);

            ZipOutputStream zos = new ZipOutputStream(fos);

            for (int i=0; i < resourceList.size(); i++) {

//                File srcFile = new File(srcFiles[i]);

//                FileInputStream fis = new FileInputStream(srcFile);

                Resource resource = resourceList.get(i);

                // begin writing a new ZIP entry, positions the stream to the start of the entry data
                zos.putNextEntry(new ZipEntry("cv_"+Math.random()+".docx"));

                int length;
//                byte [] content = new byte[(int)resource.contentLength()];
//                IOUtils.read(resource.getInputStream(), content);

                byte[] content = IOUtils.toByteArray(resource.getInputStream());


//                while ((length = resource.getInputStream().read(buffer)) > 0) {
//                    zos.write(buffer, 0, length);
//                }

                zos.write(content);

                zos.closeEntry();

                // close the InputStream
                //resource.getInputStream().close();

            }

            // close the ZipOutputStream
            zos.close();

            InputStream         stream              = new FileInputStream(new File("./CvList.zip"));
            Resource inputStreamResource = new InputStreamResource(stream);
            return  inputStreamResource;

        }
        catch (IOException ioe) {
            System.out.println("Error creating zip file: " + ioe);
        }
        return null;
    }

}
