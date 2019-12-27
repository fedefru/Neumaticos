package com.mycompany.neumaticos.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Measure.
 */
@Entity
@Table(name = "measure")
public class Measure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tiretype")
    private String tiretype;

    @Column(name = "width")
    private Double width;

    @Column(name = "height")
    private Double height;

    @Column(name = "diameter")
    private Long diameter;

    @Column(name = "speedrating")
    private String speedrating;

    @Column(name = "jhi_load")
    private Long load;

    @Column(name = "detail")
    private String detail;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTiretype() {
        return tiretype;
    }

    public Measure tiretype(String tiretype) {
        this.tiretype = tiretype;
        return this;
    }

    public void setTiretype(String tiretype) {
        this.tiretype = tiretype;
    }

    public Double getWidth() {
        return width;
    }

    public Measure width(Double width) {
        this.width = width;
        return this;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public Measure height(Double height) {
        this.height = height;
        return this;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Long getDiameter() {
        return diameter;
    }

    public Measure diameter(Long diameter) {
        this.diameter = diameter;
        return this;
    }

    public void setDiameter(Long diameter) {
        this.diameter = diameter;
    }

    public String getSpeedrating() {
        return speedrating;
    }

    public Measure speedrating(String speedrating) {
        this.speedrating = speedrating;
        return this;
    }

    public void setSpeedrating(String speedrating) {
        this.speedrating = speedrating;
    }

    public Long getLoad() {
        return load;
    }

    public Measure load(Long load) {
        this.load = load;
        return this;
    }

    public void setLoad(Long load) {
        this.load = load;
    }

    public String getDetail() {
        return detail;
    }

    public Measure detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Measure)) {
            return false;
        }
        return id != null && id.equals(((Measure) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Measure{" +
            "id=" + getId() +
            ", tiretype='" + getTiretype() + "'" +
            ", width=" + getWidth() +
            ", height=" + getHeight() +
            ", diameter=" + getDiameter() +
            ", speedrating='" + getSpeedrating() + "'" +
            ", load=" + getLoad() +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}
