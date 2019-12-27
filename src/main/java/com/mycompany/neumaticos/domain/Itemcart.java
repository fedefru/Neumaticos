package com.mycompany.neumaticos.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Itemcart.
 */
@Entity
@Table(name = "itemcart")
public class Itemcart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "detail")
    private String detail;

    @ManyToOne
    @JsonIgnoreProperties("itemcarts")
    private Stock itemstock;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Itemcart quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getDetail() {
        return detail;
    }

    public Itemcart detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Stock getItemstock() {
        return itemstock;
    }

    public Itemcart itemstock(Stock stock) {
        this.itemstock = stock;
        return this;
    }

    public void setItemstock(Stock stock) {
        this.itemstock = stock;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Itemcart)) {
            return false;
        }
        return id != null && id.equals(((Itemcart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Itemcart{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}
