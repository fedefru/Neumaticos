package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.domain.Brands;
import com.mycompany.neumaticos.repository.BrandsRepository;
import com.mycompany.neumaticos.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.neumaticos.domain.Brands}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BrandsResource {

    private final Logger log = LoggerFactory.getLogger(BrandsResource.class);

    private static final String ENTITY_NAME = "brands";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BrandsRepository brandsRepository;

    public BrandsResource(BrandsRepository brandsRepository) {
        this.brandsRepository = brandsRepository;
    }

    /**
     * {@code POST  /brands} : Create a new brands.
     *
     * @param brands the brands to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new brands, or with status {@code 400 (Bad Request)} if the brands has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/brands")
    public ResponseEntity<Brands> createBrands(@RequestBody Brands brands) throws URISyntaxException {
        log.debug("REST request to save Brands : {}", brands);
        if (brands.getId() != null) {
            throw new BadRequestAlertException("A new brands cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Brands result = brandsRepository.save(brands);
        return ResponseEntity.created(new URI("/api/brands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /brands} : Updates an existing brands.
     *
     * @param brands the brands to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated brands,
     * or with status {@code 400 (Bad Request)} if the brands is not valid,
     * or with status {@code 500 (Internal Server Error)} if the brands couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/brands")
    public ResponseEntity<Brands> updateBrands(@RequestBody Brands brands) throws URISyntaxException {
        log.debug("REST request to update Brands : {}", brands);
        if (brands.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Brands result = brandsRepository.save(brands);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, brands.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /brands} : get all the brands.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of brands in body.
     */
    @GetMapping("/brands")
    public List<Brands> getAllBrands() {
        log.debug("REST request to get all Brands");
        return brandsRepository.findAll();
    }

    /**
     * {@code GET  /brands/:id} : get the "id" brands.
     *
     * @param id the id of the brands to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the brands, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/brands/{id}")
    public ResponseEntity<Brands> getBrands(@PathVariable Long id) {
        log.debug("REST request to get Brands : {}", id);
        Optional<Brands> brands = brandsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(brands);
    }

    /**
     * {@code DELETE  /brands/:id} : delete the "id" brands.
     *
     * @param id the id of the brands to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/brands/{id}")
    public ResponseEntity<Void> deleteBrands(@PathVariable Long id) {
        log.debug("REST request to delete Brands : {}", id);
        brandsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
