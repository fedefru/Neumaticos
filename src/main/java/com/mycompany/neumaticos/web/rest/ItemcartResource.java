package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.domain.Itemcart;
import com.mycompany.neumaticos.repository.ItemcartRepository;
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
 * REST controller for managing {@link com.mycompany.neumaticos.domain.Itemcart}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemcartResource {

    private final Logger log = LoggerFactory.getLogger(ItemcartResource.class);

    private static final String ENTITY_NAME = "itemcart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemcartRepository itemcartRepository;

    public ItemcartResource(ItemcartRepository itemcartRepository) {
        this.itemcartRepository = itemcartRepository;
    }

    /**
     * {@code POST  /itemcarts} : Create a new itemcart.
     *
     * @param itemcart the itemcart to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemcart, or with status {@code 400 (Bad Request)} if the itemcart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/itemcarts")
    public ResponseEntity<Itemcart> createItemcart(@RequestBody Itemcart itemcart) throws URISyntaxException {
        log.debug("REST request to save Itemcart : {}", itemcart);
        if (itemcart.getId() != null) {
            throw new BadRequestAlertException("A new itemcart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Itemcart result = itemcartRepository.save(itemcart);
        return ResponseEntity.created(new URI("/api/itemcarts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /itemcarts} : Updates an existing itemcart.
     *
     * @param itemcart the itemcart to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemcart,
     * or with status {@code 400 (Bad Request)} if the itemcart is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemcart couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/itemcarts")
    public ResponseEntity<Itemcart> updateItemcart(@RequestBody Itemcart itemcart) throws URISyntaxException {
        log.debug("REST request to update Itemcart : {}", itemcart);
        if (itemcart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Itemcart result = itemcartRepository.save(itemcart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemcart.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /itemcarts} : get all the itemcarts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemcarts in body.
     */
    @GetMapping("/itemcarts")
    public List<Itemcart> getAllItemcarts() {
        log.debug("REST request to get all Itemcarts");
        return itemcartRepository.findAll();
    }

    /**
     * {@code GET  /itemcarts/:id} : get the "id" itemcart.
     *
     * @param id the id of the itemcart to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemcart, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/itemcarts/{id}")
    public ResponseEntity<Itemcart> getItemcart(@PathVariable Long id) {
        log.debug("REST request to get Itemcart : {}", id);
        Optional<Itemcart> itemcart = itemcartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemcart);
    }

    /**
     * {@code DELETE  /itemcarts/:id} : delete the "id" itemcart.
     *
     * @param id the id of the itemcart to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/itemcarts/{id}")
    public ResponseEntity<Void> deleteItemcart(@PathVariable Long id) {
        log.debug("REST request to delete Itemcart : {}", id);
        itemcartRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
