package com.mycompany.neumaticos.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Branch.
 */
@Entity
@Table(name = "branch")
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "branchname")
    private String branchname;

    @Column(name = "address")
    private String address;

    @Column(name = "telephone")
    private Long telephone;

    @Column(name = "location")
    private String location;

    @Column(name = "province")
    private String province;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranchname() {
        return branchname;
    }

    public Branch branchname(String branchname) {
        this.branchname = branchname;
        return this;
    }

    public void setBranchname(String branchname) {
        this.branchname = branchname;
    }

    public String getAddress() {
        return address;
    }

    public Branch address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getTelephone() {
        return telephone;
    }

    public Branch telephone(Long telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(Long telephone) {
        this.telephone = telephone;
    }

    public String getLocation() {
        return location;
    }

    public Branch location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProvince() {
        return province;
    }

    public Branch province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Branch)) {
            return false;
        }
        return id != null && id.equals(((Branch) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Branch{" +
            "id=" + getId() +
            ", branchname='" + getBranchname() + "'" +
            ", address='" + getAddress() + "'" +
            ", telephone=" + getTelephone() +
            ", location='" + getLocation() + "'" +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
