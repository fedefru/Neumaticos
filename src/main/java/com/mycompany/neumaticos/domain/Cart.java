package com.mycompany.neumaticos.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Cart.
 */
@Entity
@Table(name = "cart")
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shipping")
    private Double shipping;

    @Column(name = "total")
    private Double total;

    @Column(name = "detail")
    private String detail;

    @ManyToOne
    @JsonIgnoreProperties("carts")
    private Itemcart items;

    @ManyToOne
    @JsonIgnoreProperties("carts")
    private Usuarios user;

    @ManyToOne
    @JsonIgnoreProperties("carts")
    private Method method;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getShipping() {
        return shipping;
    }

    public Cart shipping(Double shipping) {
        this.shipping = shipping;
        return this;
    }

    public void setShipping(Double shipping) {
        this.shipping = shipping;
    }

    public Double getTotal() {
        return total;
    }

    public Cart total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getDetail() {
        return detail;
    }

    public Cart detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Itemcart getItems() {
        return items;
    }

    public Cart items(Itemcart itemcart) {
        this.items = itemcart;
        return this;
    }

    public void setItems(Itemcart itemcart) {
        this.items = itemcart;
    }

    public Usuarios getUser() {
        return user;
    }

    public Cart user(Usuarios usuarios) {
        this.user = usuarios;
        return this;
    }

    public void setUser(Usuarios usuarios) {
        this.user = usuarios;
    }

    public Method getMethod() {
        return method;
    }

    public Cart method(Method method) {
        this.method = method;
        return this;
    }

    public void setMethod(Method method) {
        this.method = method;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cart)) {
            return false;
        }
        return id != null && id.equals(((Cart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            ", shipping=" + getShipping() +
            ", total=" + getTotal() +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}
