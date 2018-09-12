package com.westernacher.mycv.generation;

import com.westernacher.mycv.model.Cv;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.springframework.core.io.Resource;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface GenerationService {
    Resource generateWordCV(Cv cv) throws Exception;
    Resource generateZipFromCvList(List<Cv> cvList) throws Exception;
    void generatePowerPointCV() throws Docx4JException, IOException;
}
