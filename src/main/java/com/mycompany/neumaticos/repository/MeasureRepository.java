package com.mycompany.neumaticos.repository;
import com.mycompany.neumaticos.domain.Measure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Measure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasureRepository extends JpaRepository<Measure, Long> {

}
