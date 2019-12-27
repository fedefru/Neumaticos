package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.domain.Method;
import com.mycompany.neumaticos.repository.MethodRepository;
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
 * REST controller for managing {@link com.mycompany.neumaticos.domain.Method}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MethodResource {

    private final Logger log = LoggerFactory.getLogger(MethodResource.class);

    private static final String ENTITY_NAME = "method";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MethodRepository methodRepository;

    public MethodResource(MethodRepository methodRepository) {
        this.methodRepository = methodRepository;
    }

    /**
     * {@code POST  /methods} : Create a new method.
     *
     * @param method the method to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new method, or with status {@code 400 (Bad Request)} if the method has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/methods")
    public ResponseEntity<Method> createMethod(@RequestBody Method method) throws URISyntaxException {
        log.debug("REST request to save Method : {}", method);
        if (method.getId() != null) {
            throw new BadRequestAlertException("A new method cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Method result = methodRepository.save(method);
        return ResponseEntity.created(new URI("/api/methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /methods} : Updates an existing method.
     *
     * @param method the method to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated method,
     * or with status {@code 400 (Bad Request)} if the method is not valid,
     * or with status {@code 500 (Internal Server Error)} if the method couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/methods")
    public ResponseEntity<Method> updateMethod(@RequestBody Method method) throws URISyntaxException {
        log.debug("REST request to update Method : {}", method);
        if (method.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Method result = methodRepository.save(method);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, method.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /methods} : get all the methods.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of methods in body.
     */
    @GetMapping("/methods")
    public List<Method> getAllMethods() {
        log.debug("REST request to get all Methods");
        return methodRepository.findAll();
    }

    /**
     * {@code GET  /methods/:id} : get the "id" method.
     *
     * @param id the id of the method to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the method, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/methods/{id}")
    public ResponseEntity<Method> getMethod(@PathVariable Long id) {
        log.debug("REST request to get Method : {}", id);
        Optional<Method> method = methodRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(method);
    }

    /**
     * {@code DELETE  /methods/:id} : delete the "id" method.
     *
     * @param id the id of the method to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/methods/{id}")
    public ResponseEntity<Void> deleteMethod(@PathVariable Long id) {
        log.debug("REST request to delete Method : {}", id);
        methodRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
