package com.westernacher.mycv.generation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OfficeGenerationService implements GenerationService {

//    @Override
//    public void generateWordCV() throws Docx4JException, FileNotFoundException {
//        WordprocessingMLPackage packageWord =  (WordprocessingMLPackage) this.getTemplate("", "WORD");
//    }
//
//    @Override
//    public void generatePowerPointCV() throws Docx4JException, FileNotFoundException{
//        PresentationMLPackage packagePP =  (PresentationMLPackage) this.getTemplate("", "POWERPOINT");
//    }
//
//    private OpcPackage getTemplate(String name, String type)
//            throws Docx4JException, FileNotFoundException {
//        switch(type) {
//            case "WORD":{ return WordprocessingMLPackage
//                    .load(new FileInputStream(new File(name)));
//                     }
//            case "POWERPOINT": {
//                return PresentationMLPackage.load(new FileInputStream(new File(name)));
//            }
//
//            default: return null;
//        }
//    }
}
