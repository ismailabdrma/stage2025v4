package com.example.stage2025.dto.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "PaymentRequest")
public class PaymentRequest {

    @XmlElement(name = "OrderId")
    private String orderId;

    @XmlElement(name = "Amount")
    private Double amount;

    @XmlElement(name = "Currency")
    private String currency;
}