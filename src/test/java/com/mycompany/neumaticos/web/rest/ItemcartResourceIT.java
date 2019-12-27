package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.NeumaticosApp;
import com.mycompany.neumaticos.domain.Itemcart;
import com.mycompany.neumaticos.repository.ItemcartRepository;
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
 * Integration tests for the {@link ItemcartResource} REST controller.
 */
@SpringBootTest(classes = NeumaticosApp.class)
public class ItemcartResourceIT {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    private static final String DEFAULT_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_DETAIL = "BBBBBBBBBB";

    @Autowired
    private ItemcartRepository itemcartRepository;

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

    private MockMvc restItemcartMockMvc;

    private Itemcart itemcart;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemcartResource itemcartResource = new ItemcartResource(itemcartRepository);
        this.restItemcartMockMvc = MockMvcBuilders.standaloneSetup(itemcartResource)
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
    public static Itemcart createEntity(EntityManager em) {
        Itemcart itemcart = new Itemcart()
            .quantity(DEFAULT_QUANTITY)
            .detail(DEFAULT_DETAIL);
        return itemcart;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Itemcart createUpdatedEntity(EntityManager em) {
        Itemcart itemcart = new Itemcart()
            .quantity(UPDATED_QUANTITY)
            .detail(UPDATED_DETAIL);
        return itemcart;
    }

    @BeforeEach
    public void initTest() {
        itemcart = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemcart() throws Exception {
        int databaseSizeBeforeCreate = itemcartRepository.findAll().size();

        // Create the Itemcart
        restItemcartMockMvc.perform(post("/api/itemcarts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemcart)))
            .andExpect(status().isCreated());

        // Validate the Itemcart in the database
        List<Itemcart> itemcartList = itemcartRepository.findAll();
        assertThat(itemcartList).hasSize(databaseSizeBeforeCreate + 1);
        Itemcart testItemcart = itemcartList.get(itemcartList.size() - 1);
        assertThat(testItemcart.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testItemcart.getDetail()).isEqualTo(DEFAULT_DETAIL);
    }

    @Test
    @Transactional
    public void createItemcartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemcartRepository.findAll().size();

        // Create the Itemcart with an existing ID
        itemcart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemcartMockMvc.perform(post("/api/itemcarts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemcart)))
            .andExpect(status().isBadRequest());

        // Validate the Itemcart in the database
        List<Itemcart> itemcartList = itemcartRepository.findAll();
        assertThat(itemcartList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllItemcarts() throws Exception {
        // Initialize the database
        itemcartRepository.saveAndFlush(itemcart);

        // Get all the itemcartList
        restItemcartMockMvc.perform(get("/api/itemcarts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemcart.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].detail").value(hasItem(DEFAULT_DETAIL)));
    }
    
    @Test
    @Transactional
    public void getItemcart() throws Exception {
        // Initialize the database
        itemcartRepository.saveAndFlush(itemcart);

        // Get the itemcart
        restItemcartMockMvc.perform(get("/api/itemcarts/{id}", itemcart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemcart.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.detail").value(DEFAULT_DETAIL));
    }

    @Test
    @Transactional
    public void getNonExistingItemcart() throws Exception {
        // Get the itemcart
        restItemcartMockMvc.perform(get("/api/itemcarts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemcart() throws Exception {
        // Initialize the database
        itemcartRepository.saveAndFlush(itemcart);

        int databaseSizeBeforeUpdate = itemcartRepository.findAll().size();

        // Update the itemcart
        Itemcart updatedItemcart = itemcartRepository.findById(itemcart.getId()).get();
        // Disconnect from session so that the updates on updatedItemcart are not directly saved in db
        em.detach(updatedItemcart);
        updatedItemcart
            .quantity(UPDATED_QUANTITY)
            .detail(UPDATED_DETAIL);

        restItemcartMockMvc.perform(put("/api/itemcarts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemcart)))
            .andExpect(status().isOk());

        // Validate the Itemcart in the database
        List<Itemcart> itemcartList = itemcartRepository.findAll();
        assertThat(itemcartList).hasSize(databaseSizeBeforeUpdate);
        Itemcart testItemcart = itemcartList.get(itemcartList.size() - 1);
        assertThat(testItemcart.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testItemcart.getDetail()).isEqualTo(UPDATED_DETAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingItemcart() throws Exception {
        int databaseSizeBeforeUpdate = itemcartRepository.findAll().size();

        // Create the Itemcart

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemcartMockMvc.perform(put("/api/itemcarts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemcart)))
            .andExpect(status().isBadRequest());

        // Validate the Itemcart in the database
        List<Itemcart> itemcartList = itemcartRepository.findAll();
        assertThat(itemcartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemcart() throws Exception {
        // Initialize the database
        itemcartRepository.saveAndFlush(itemcart);

        int databaseSizeBeforeDelete = itemcartRepository.findAll().size();

        // Delete the itemcart
        restItemcartMockMvc.perform(delete("/api/itemcarts/{id}", itemcart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Itemcart> itemcartList = itemcartRepository.findAll();
        assertThat(itemcartList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
