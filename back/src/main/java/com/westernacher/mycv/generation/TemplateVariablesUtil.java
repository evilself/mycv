package com.westernacher.mycv.generation;

import pl.jsolve.templ4docx.variable.TextVariable;
import pl.jsolve.templ4docx.variable.Variables;

import java.util.List;
import java.util.Map;

public class TemplateVariablesUtil {

    private TemplateVariablesUtil() {
    }

    public static void flattenToListOfVariables(Variables variables, Object element) {
        handleElement(variables, element, "");
    }

    private static void handleMap(Variables variables, Map map, String path) {
        map.forEach((key, value) -> {
            String newPath = path.equals("") ? (String) key : path + "." + key;
            handleElement(variables, value, newPath);
        });

    }

    private static void handleList(Variables variables, List list, String path) {
        // Handle just first element
        if (list.size() > 0) {
            Object firstElement = list.get(0);
            handleElement(variables, firstElement, path);
        }
    }

    private static void handleElement(Variables variables, Object element, String path) {
        if (element instanceof Map) {
            handleMap(variables, (Map) element, path);
        } else if (element instanceof List) {
            handleList(variables, (List) element, path);
        } else if (null != element) {
            handleText(variables, element.toString(), path);
        }
    }

    private static void handleText(Variables variables, String value, String path) {
        variables.addTextVariable(new TextVariable("${" + path + "}", value));
    }
}
