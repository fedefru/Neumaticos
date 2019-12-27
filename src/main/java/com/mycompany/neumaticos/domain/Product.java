package com.mycompany.neumaticos.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Double price;

    @Column(name = "detail")
    private String detail;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Measure measure;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Brands brands;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public Product price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDetail() {
        return detail;
    }

    public Product detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Measure getMeasure() {
        return measure;
    }

    public Product measure(Measure measure) {
        this.measure = measure;
        return this;
    }

    public void setMeasure(Measure measure) {
        this.measure = measure;
    }

    public Brands getBrands() {
        return brands;
    }

    public Product brands(Brands brands) {
        this.brands = brands;
        return this;
    }

    public void setBrands(Brands brands) {
        this.brands = brands;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}
