package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.domain.Usuarios;
import com.mycompany.neumaticos.repository.UsuariosRepository;
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
 * REST controller for managing {@link com.mycompany.neumaticos.domain.Usuarios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UsuariosResource {

    private final Logger log = LoggerFactory.getLogger(UsuariosResource.class);

    private static final String ENTITY_NAME = "usuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuariosRepository usuariosRepository;

    public UsuariosResource(UsuariosRepository usuariosRepository) {
        this.usuariosRepository = usuariosRepository;
    }

    /**
     * {@code POST  /usuarios} : Create a new usuarios.
     *
     * @param usuarios the usuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuarios, or with status {@code 400 (Bad Request)} if the usuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuarios")
    public ResponseEntity<Usuarios> createUsuarios(@RequestBody Usuarios usuarios) throws URISyntaxException {
        log.debug("REST request to save Usuarios : {}", usuarios);
        if (usuarios.getId() != null) {
            throw new BadRequestAlertException("A new usuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Usuarios result = usuariosRepository.save(usuarios);
        return ResponseEntity.created(new URI("/api/usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuarios} : Updates an existing usuarios.
     *
     * @param usuarios the usuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarios,
     * or with status {@code 400 (Bad Request)} if the usuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuarios")
    public ResponseEntity<Usuarios> updateUsuarios(@RequestBody Usuarios usuarios) throws URISyntaxException {
        log.debug("REST request to update Usuarios : {}", usuarios);
        if (usuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Usuarios result = usuariosRepository.save(usuarios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /usuarios} : get all the usuarios.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarios in body.
     */
    @GetMapping("/usuarios")
    public List<Usuarios> getAllUsuarios() {
        log.debug("REST request to get all Usuarios");
        return usuariosRepository.findAll();
    }

    /**
     * {@code GET  /usuarios/:id} : get the "id" usuarios.
     *
     * @param id the id of the usuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuarios> getUsuarios(@PathVariable Long id) {
        log.debug("REST request to get Usuarios : {}", id);
        Optional<Usuarios> usuarios = usuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuarios);
    }

    /**
     * {@code DELETE  /usuarios/:id} : delete the "id" usuarios.
     *
     * @param id the id of the usuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuarios(@PathVariable Long id) {
        log.debug("REST request to delete Usuarios : {}", id);
        usuariosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
