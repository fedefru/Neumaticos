package com.mycompany.neumaticos.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Stock.
 */
@Entity
@Table(name = "stock")
public class Stock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stock")
    private Long stock;

    @Column(name = "minimumstock")
    private Long minimumstock;

    @Column(name = "maximumstock")
    private Long maximumstock;

    @Column(name = "detail")
    private String detail;

    @ManyToOne
    @JsonIgnoreProperties("stocks")
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("stocks")
    private Branch branchname;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStock() {
        return stock;
    }

    public Stock stock(Long stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public Long getMinimumstock() {
        return minimumstock;
    }

    public Stock minimumstock(Long minimumstock) {
        this.minimumstock = minimumstock;
        return this;
    }

    public void setMinimumstock(Long minimumstock) {
        this.minimumstock = minimumstock;
    }

    public Long getMaximumstock() {
        return maximumstock;
    }

    public Stock maximumstock(Long maximumstock) {
        this.maximumstock = maximumstock;
        return this;
    }

    public void setMaximumstock(Long maximumstock) {
        this.maximumstock = maximumstock;
    }

    public String getDetail() {
        return detail;
    }

    public Stock detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Product getProduct() {
        return product;
    }

    public Stock product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Branch getBranchname() {
        return branchname;
    }

    public Stock branchname(Branch branch) {
        this.branchname = branch;
        return this;
    }

    public void setBranchname(Branch branch) {
        this.branchname = branch;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stock)) {
            return false;
        }
        return id != null && id.equals(((Stock) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", stock=" + getStock() +
            ", minimumstock=" + getMinimumstock() +
            ", maximumstock=" + getMaximumstock() +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}
