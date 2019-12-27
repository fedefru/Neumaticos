package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.NeumaticosApp;
import com.mycompany.neumaticos.domain.Usuarios;
import com.mycompany.neumaticos.repository.UsuariosRepository;
import com.mycompany.neumaticos.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.neumaticos.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UsuariosResource} REST controller.
 */
@SpringBootTest(classes = NeumaticosApp.class)
public class UsuariosResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUsuariosMockMvc;

    private Usuarios usuarios;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsuariosResource usuariosResource = new UsuariosResource(usuariosRepository);
        this.restUsuariosMockMvc = MockMvcBuilders.standaloneSetup(usuariosResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuarios createEntity(EntityManager em) {
        Usuarios usuarios = new Usuarios()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .email(DEFAULT_EMAIL);
        return usuarios;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuarios createUpdatedEntity(EntityManager em) {
        Usuarios usuarios = new Usuarios()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL);
        return usuarios;
    }

    @BeforeEach
    public void initTest() {
        usuarios = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsuarios() throws Exception {
        int databaseSizeBeforeCreate = usuariosRepository.findAll().size();

        // Create the Usuarios
        restUsuariosMockMvc.perform(post("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isCreated());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeCreate + 1);
        Usuarios testUsuarios = usuariosList.get(usuariosList.size() - 1);
        assertThat(testUsuarios.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUsuarios.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testUsuarios.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createUsuariosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usuariosRepository.findAll().size();

        // Create the Usuarios with an existing ID
        usuarios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuariosMockMvc.perform(post("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        // Get all the usuariosList
        restUsuariosMockMvc.perform(get("/api/usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }
    
    @Test
    @Transactional
    public void getUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        // Get the usuarios
        restUsuariosMockMvc.perform(get("/api/usuarios/{id}", usuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usuarios.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }

    @Test
    @Transactional
    public void getNonExistingUsuarios() throws Exception {
        // Get the usuarios
        restUsuariosMockMvc.perform(get("/api/usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();

        // Update the usuarios
        Usuarios updatedUsuarios = usuariosRepository.findById(usuarios.getId()).get();
        // Disconnect from session so that the updates on updatedUsuarios are not directly saved in db
        em.detach(updatedUsuarios);
        updatedUsuarios
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL);

        restUsuariosMockMvc.perform(put("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsuarios)))
            .andExpect(status().isOk());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
        Usuarios testUsuarios = usuariosList.get(usuariosList.size() - 1);
        assertThat(testUsuarios.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUsuarios.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testUsuarios.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();

        // Create the Usuarios

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuariosMockMvc.perform(put("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        int databaseSizeBeforeDelete = usuariosRepository.findAll().size();

        // Delete the usuarios
        restUsuariosMockMvc.perform(delete("/api/usuarios/{id}", usuarios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
