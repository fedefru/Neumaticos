package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.NeumaticosApp;
import com.mycompany.neumaticos.domain.Brands;
import com.mycompany.neumaticos.repository.BrandsRepository;
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
 * Integration tests for the {@link BrandsResource} REST controller.
 */
@SpringBootTest(classes = NeumaticosApp.class)
public class BrandsResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private BrandsRepository brandsRepository;

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

    private MockMvc restBrandsMockMvc;

    private Brands brands;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BrandsResource brandsResource = new BrandsResource(brandsRepository);
        this.restBrandsMockMvc = MockMvcBuilders.standaloneSetup(brandsResource)
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
    public static Brands createEntity(EntityManager em) {
        Brands brands = new Brands()
            .name(DEFAULT_NAME);
        return brands;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Brands createUpdatedEntity(EntityManager em) {
        Brands brands = new Brands()
            .name(UPDATED_NAME);
        return brands;
    }

    @BeforeEach
    public void initTest() {
        brands = createEntity(em);
    }

    @Test
    @Transactional
    public void createBrands() throws Exception {
        int databaseSizeBeforeCreate = brandsRepository.findAll().size();

        // Create the Brands
        restBrandsMockMvc.perform(post("/api/brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brands)))
            .andExpect(status().isCreated());

        // Validate the Brands in the database
        List<Brands> brandsList = brandsRepository.findAll();
        assertThat(brandsList).hasSize(databaseSizeBeforeCreate + 1);
        Brands testBrands = brandsList.get(brandsList.size() - 1);
        assertThat(testBrands.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createBrandsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = brandsRepository.findAll().size();

        // Create the Brands with an existing ID
        brands.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBrandsMockMvc.perform(post("/api/brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brands)))
            .andExpect(status().isBadRequest());

        // Validate the Brands in the database
        List<Brands> brandsList = brandsRepository.findAll();
        assertThat(brandsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBrands() throws Exception {
        // Initialize the database
        brandsRepository.saveAndFlush(brands);

        // Get all the brandsList
        restBrandsMockMvc.perform(get("/api/brands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(brands.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getBrands() throws Exception {
        // Initialize the database
        brandsRepository.saveAndFlush(brands);

        // Get the brands
        restBrandsMockMvc.perform(get("/api/brands/{id}", brands.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(brands.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingBrands() throws Exception {
        // Get the brands
        restBrandsMockMvc.perform(get("/api/brands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBrands() throws Exception {
        // Initialize the database
        brandsRepository.saveAndFlush(brands);

        int databaseSizeBeforeUpdate = brandsRepository.findAll().size();

        // Update the brands
        Brands updatedBrands = brandsRepository.findById(brands.getId()).get();
        // Disconnect from session so that the updates on updatedBrands are not directly saved in db
        em.detach(updatedBrands);
        updatedBrands
            .name(UPDATED_NAME);

        restBrandsMockMvc.perform(put("/api/brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBrands)))
            .andExpect(status().isOk());

        // Validate the Brands in the database
        List<Brands> brandsList = brandsRepository.findAll();
        assertThat(brandsList).hasSize(databaseSizeBeforeUpdate);
        Brands testBrands = brandsList.get(brandsList.size() - 1);
        assertThat(testBrands.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBrands() throws Exception {
        int databaseSizeBeforeUpdate = brandsRepository.findAll().size();

        // Create the Brands

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBrandsMockMvc.perform(put("/api/brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brands)))
            .andExpect(status().isBadRequest());

        // Validate the Brands in the database
        List<Brands> brandsList = brandsRepository.findAll();
        assertThat(brandsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBrands() throws Exception {
        // Initialize the database
        brandsRepository.saveAndFlush(brands);

        int databaseSizeBeforeDelete = brandsRepository.findAll().size();

        // Delete the brands
        restBrandsMockMvc.perform(delete("/api/brands/{id}", brands.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Brands> brandsList = brandsRepository.findAll();
        assertThat(brandsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
