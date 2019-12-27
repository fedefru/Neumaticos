package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.NeumaticosApp;
import com.mycompany.neumaticos.domain.Method;
import com.mycompany.neumaticos.repository.MethodRepository;
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
 * Integration tests for the {@link MethodResource} REST controller.
 */
@SpringBootTest(classes = NeumaticosApp.class)
public class MethodResourceIT {

    private static final String DEFAULT_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_METHOD = "BBBBBBBBBB";

    @Autowired
    private MethodRepository methodRepository;

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

    private MockMvc restMethodMockMvc;

    private Method method;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MethodResource methodResource = new MethodResource(methodRepository);
        this.restMethodMockMvc = MockMvcBuilders.standaloneSetup(methodResource)
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
    public static Method createEntity(EntityManager em) {
        Method method = new Method()
            .method(DEFAULT_METHOD);
        return method;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Method createUpdatedEntity(EntityManager em) {
        Method method = new Method()
            .method(UPDATED_METHOD);
        return method;
    }

    @BeforeEach
    public void initTest() {
        method = createEntity(em);
    }

    @Test
    @Transactional
    public void createMethod() throws Exception {
        int databaseSizeBeforeCreate = methodRepository.findAll().size();

        // Create the Method
        restMethodMockMvc.perform(post("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(method)))
            .andExpect(status().isCreated());

        // Validate the Method in the database
        List<Method> methodList = methodRepository.findAll();
        assertThat(methodList).hasSize(databaseSizeBeforeCreate + 1);
        Method testMethod = methodList.get(methodList.size() - 1);
        assertThat(testMethod.getMethod()).isEqualTo(DEFAULT_METHOD);
    }

    @Test
    @Transactional
    public void createMethodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = methodRepository.findAll().size();

        // Create the Method with an existing ID
        method.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMethodMockMvc.perform(post("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(method)))
            .andExpect(status().isBadRequest());

        // Validate the Method in the database
        List<Method> methodList = methodRepository.findAll();
        assertThat(methodList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMethods() throws Exception {
        // Initialize the database
        methodRepository.saveAndFlush(method);

        // Get all the methodList
        restMethodMockMvc.perform(get("/api/methods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(method.getId().intValue())))
            .andExpect(jsonPath("$.[*].method").value(hasItem(DEFAULT_METHOD)));
    }
    
    @Test
    @Transactional
    public void getMethod() throws Exception {
        // Initialize the database
        methodRepository.saveAndFlush(method);

        // Get the method
        restMethodMockMvc.perform(get("/api/methods/{id}", method.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(method.getId().intValue()))
            .andExpect(jsonPath("$.method").value(DEFAULT_METHOD));
    }

    @Test
    @Transactional
    public void getNonExistingMethod() throws Exception {
        // Get the method
        restMethodMockMvc.perform(get("/api/methods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMethod() throws Exception {
        // Initialize the database
        methodRepository.saveAndFlush(method);

        int databaseSizeBeforeUpdate = methodRepository.findAll().size();

        // Update the method
        Method updatedMethod = methodRepository.findById(method.getId()).get();
        // Disconnect from session so that the updates on updatedMethod are not directly saved in db
        em.detach(updatedMethod);
        updatedMethod
            .method(UPDATED_METHOD);

        restMethodMockMvc.perform(put("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMethod)))
            .andExpect(status().isOk());

        // Validate the Method in the database
        List<Method> methodList = methodRepository.findAll();
        assertThat(methodList).hasSize(databaseSizeBeforeUpdate);
        Method testMethod = methodList.get(methodList.size() - 1);
        assertThat(testMethod.getMethod()).isEqualTo(UPDATED_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingMethod() throws Exception {
        int databaseSizeBeforeUpdate = methodRepository.findAll().size();

        // Create the Method

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMethodMockMvc.perform(put("/api/methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(method)))
            .andExpect(status().isBadRequest());

        // Validate the Method in the database
        List<Method> methodList = methodRepository.findAll();
        assertThat(methodList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMethod() throws Exception {
        // Initialize the database
        methodRepository.saveAndFlush(method);

        int databaseSizeBeforeDelete = methodRepository.findAll().size();

        // Delete the method
        restMethodMockMvc.perform(delete("/api/methods/{id}", method.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Method> methodList = methodRepository.findAll();
        assertThat(methodList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
