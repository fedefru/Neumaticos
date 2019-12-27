package com.mycompany.neumaticos.repository;
import com.mycompany.neumaticos.domain.Brands;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Brands entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrandsRepository extends JpaRepository<Brands, Long> {

}
