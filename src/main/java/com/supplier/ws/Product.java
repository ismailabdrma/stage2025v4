
package com.supplier.ws;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour product complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType name="product"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="description" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="supplierPrice" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="displayedPrice" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="availableQuantity" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="pictureUrl" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="realTimeStock" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="lastStockUpdate" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "product", propOrder = {
    "id",
    "name",
    "description",
    "supplierPrice",
    "displayedPrice",
    "availableQuantity",
    "pictureUrl",
    "realTimeStock",
    "lastStockUpdate"
})
public class Product {

    protected long id;
    @XmlElement(required = true)
    protected String name;
    @XmlElement(required = true)
    protected String description;
    protected double supplierPrice;
    protected double displayedPrice;
    protected int availableQuantity;
    protected String pictureUrl;
    protected int realTimeStock;
    @XmlElement(required = true)
    protected String lastStockUpdate;

    /**
     * Obtient la valeur de la propriété id.
     * 
     */
    public long getId() {
        return id;
    }

    /**
     * Définit la valeur de la propriété id.
     * 
     */
    public void setId(long value) {
        this.id = value;
    }

    /**
     * Obtient la valeur de la propriété name.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Définit la valeur de la propriété name.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Obtient la valeur de la propriété description.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescription() {
        return description;
    }

    /**
     * Définit la valeur de la propriété description.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescription(String value) {
        this.description = value;
    }

    /**
     * Obtient la valeur de la propriété supplierPrice.
     * 
     */
    public double getSupplierPrice() {
        return supplierPrice;
    }

    /**
     * Définit la valeur de la propriété supplierPrice.
     * 
     */
    public void setSupplierPrice(double value) {
        this.supplierPrice = value;
    }

    /**
     * Obtient la valeur de la propriété displayedPrice.
     * 
     */
    public double getDisplayedPrice() {
        return displayedPrice;
    }

    /**
     * Définit la valeur de la propriété displayedPrice.
     * 
     */
    public void setDisplayedPrice(double value) {
        this.displayedPrice = value;
    }

    /**
     * Obtient la valeur de la propriété availableQuantity.
     * 
     */
    public int getAvailableQuantity() {
        return availableQuantity;
    }

    /**
     * Définit la valeur de la propriété availableQuantity.
     * 
     */
    public void setAvailableQuantity(int value) {
        this.availableQuantity = value;
    }

    /**
     * Obtient la valeur de la propriété pictureUrl.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPictureUrl() {
        return pictureUrl;
    }

    /**
     * Définit la valeur de la propriété pictureUrl.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPictureUrl(String value) {
        this.pictureUrl = value;
    }

    /**
     * Obtient la valeur de la propriété realTimeStock.
     * 
     */
    public int getRealTimeStock() {
        return realTimeStock;
    }

    /**
     * Définit la valeur de la propriété realTimeStock.
     * 
     */
    public void setRealTimeStock(int value) {
        this.realTimeStock = value;
    }

    /**
     * Obtient la valeur de la propriété lastStockUpdate.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastStockUpdate() {
        return lastStockUpdate;
    }

    /**
     * Définit la valeur de la propriété lastStockUpdate.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastStockUpdate(String value) {
        this.lastStockUpdate = value;
    }

}
