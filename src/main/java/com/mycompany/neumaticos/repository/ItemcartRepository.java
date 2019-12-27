package com.mycompany.neumaticos.repository;
import com.mycompany.neumaticos.domain.Itemcart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Itemcart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemcartRepository extends JpaRepository<Itemcart, Long> {

}
