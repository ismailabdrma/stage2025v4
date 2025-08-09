// src/main/java/com/example/stage2025/service/parser/SoapProductParser.java
package com.example.stage2025.service.parser;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.enums.DataFormat;
import org.springframework.stereotype.Component;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.client.core.SoapActionCallback;

import javax.xml.transform.Source;
import javax.xml.transform.dom.DOMResult;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamSource;
import java.io.StringReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class SoapProductParser extends WebServiceGatewaySupport implements ProductParser {
    
    @Override
    public DataFormat supports() { 
        return DataFormat.SOAP; 
    }

    @Override
    public List<SupplierProductDto> parse(byte[] payload) throws Exception {
        // This method is called for SOAP responses
        String soapResponse = new String(payload);
        return parseSoapResponse(soapResponse);
    }

    public List<SupplierProductDto> fetchProductsFromSoapApi(String soapUrl, String soapAction, String requestXml) {
        try {
            // Create SOAP request
            Source requestSource = new StreamSource(new StringReader(requestXml));
            
            // Make SOAP call
            DOMResult responseResult = new DOMResult();
            getWebServiceTemplate().sendSourceAndReceiveToResult(
                soapUrl,
                requestSource,
                new SoapActionCallback(soapAction),
                responseResult
            );
            Source responseSource = new DOMSource(responseResult.getNode());
            
            // Convert response to string
            String responseXml = convertSourceToString(responseSource);
            
            // Parse the response
            return parseSoapResponse(responseXml);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products from SOAP API: " + e.getMessage(), e);
        }
    }

    private List<SupplierProductDto> parseSoapResponse(String soapResponse) {
        List<SupplierProductDto> products = new ArrayList<>();
        
        try {
            // Parse SOAP XML response
            // This is a simplified parser - you may need to adjust based on your SOAP response structure
            String[] productBlocks = soapResponse.split("<Product>");
            
            for (int i = 1; i < productBlocks.length; i++) { // Skip first split
                String productBlock = productBlocks[i].split("</Product>")[0];
                SupplierProductDto product = parseProductBlock(productBlock);
                if (product != null) {
                    products.add(product);
                }
            }
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse SOAP response: " + e.getMessage(), e);
        }
        
        return products;
    }

    private SupplierProductDto parseProductBlock(String productBlock) {
        try {
            SupplierProductDto product = new SupplierProductDto();
            
            // Extract product information from XML block
            product.setName(extractXmlValue(productBlock, "Name"));
            product.setDescription(extractXmlValue(productBlock, "Description"));
            product.setExternalProductId(extractXmlValue(productBlock, "ExternalId"));
            
            String priceStr = extractXmlValue(productBlock, "Price");
            if (priceStr != null && !priceStr.isEmpty()) {
                product.setPrice(new BigDecimal(priceStr).doubleValue());
            }
            
            String stockStr = extractXmlValue(productBlock, "Stock");
            if (stockStr != null && !stockStr.isEmpty()) {
                product.setStock(Integer.parseInt(stockStr));
            }
            
            // Extract image URLs
            String imageUrls = extractXmlValue(productBlock, "ImageUrls");
            if (imageUrls != null && !imageUrls.isEmpty()) {
                String[] urls = imageUrls.split(",");
                List<String> urlList = new ArrayList<>();
                for (String url : urls) {
                    urlList.add(url.trim());
                }
                product.setImageUrls(urlList);
            }
            
            return product;
        } catch (Exception e) {
            System.err.println("Error parsing product block: " + e.getMessage());
            return null;
        }
    }

    private String extractXmlValue(String xml, String tagName) {
        try {
            String startTag = "<" + tagName + ">";
            String endTag = "</" + tagName + ">";
            
            int startIndex = xml.indexOf(startTag);
            if (startIndex == -1) {
                return null;
            }
            
            startIndex += startTag.length();
            int endIndex = xml.indexOf(endTag, startIndex);
            
            if (endIndex == -1) {
                return null;
            }
            
            return xml.substring(startIndex, endIndex).trim();
        } catch (Exception e) {
            return null;
        }
    }

    private String convertSourceToString(Source source) {
        // Convert Source to String - implementation depends on your needs
        // This is a simplified version
        try {
            if (source instanceof StreamSource) {
                StreamSource streamSource = (StreamSource) source;
                if (streamSource.getInputStream() != null) {
                    return new String(streamSource.getInputStream().readAllBytes());
                }
            }
            return source.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert SOAP response to string", e);
        }
    }
}
