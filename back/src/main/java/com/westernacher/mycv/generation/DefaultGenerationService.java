package com.westernacher.mycv.generation;

import com.Ostermiller.util.CircularByteBuffer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.westernacher.mycv.model.Resume;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.objenesis.ObjenesisHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import pl.jsolve.templ4docx.cleaner.DocumentCleaner;
import pl.jsolve.templ4docx.core.Docx;
import pl.jsolve.templ4docx.core.VariablePattern;
import pl.jsolve.templ4docx.exception.OpenDocxException;
import pl.jsolve.templ4docx.variable.Variables;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import static com.westernacher.mycv.generation.TemplateVariablesUtil.flattenToListOfVariables;

@Service
@Slf4j
public class DefaultGenerationService implements GenerationService {

    @Autowired
    ObjectMapper objectMapper;

    private static VariablePattern variablePattern = new VariablePattern("${", "}");

    @Async
    @Override
    public CompletableFuture<Resource> generateResumeDocument(Resume resume, DocumentType documentType) {

        if (documentType == DocumentType.WORD) {
            Docx docx = getDocxInstance();
            docx.setVariablePattern(variablePattern);

            Variables var = new Variables();
            flattenToListOfVariables(var, objectMapper.convertValue(resume, Map.class));
            docx.fillTemplate(var);

            CircularByteBuffer cbb = new CircularByteBuffer(CircularByteBuffer.INFINITE_SIZE);
            docx.save(cbb.getOutputStream());
            return CompletableFuture.completedFuture(new InputStreamResource(cbb.getInputStream()));
        }

        return null;
    }

    private Docx getDocxInstance() {
        // Best practice
        Docx docx = ObjenesisHelper.newInstance(Docx.class);
        try {
            FieldUtils.writeField(docx, "variablePattern", variablePattern, true);
            FieldUtils.writeField(docx, "docx", new XWPFDocument(getClass().getClassLoader().getResourceAsStream("resume.docx")), true);
            FieldUtils.writeField(docx, "documentCleaner", new DocumentCleaner(), true);

        } catch (Exception ex) {
            throw new OpenDocxException(ex.getMessage(), ex.getCause());
        }
        return docx;
    }
}
