package com.mycompany.neumaticos.web.rest;

import com.mycompany.neumaticos.NeumaticosApp;
import com.mycompany.neumaticos.domain.Measure;
import com.mycompany.neumaticos.repository.MeasureRepository;
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
 * Integration tests for the {@link MeasureResource} REST controller.
 */
@SpringBootTest(classes = NeumaticosApp.class)
public class MeasureResourceIT {

    private static final String DEFAULT_TIRETYPE = "AAAAAAAAAA";
    private static final String UPDATED_TIRETYPE = "BBBBBBBBBB";

    private static final Double DEFAULT_WIDTH = 1D;
    private static final Double UPDATED_WIDTH = 2D;

    private static final Double DEFAULT_HEIGHT = 1D;
    private static final Double UPDATED_HEIGHT = 2D;

    private static final Long DEFAULT_DIAMETER = 1L;
    private static final Long UPDATED_DIAMETER = 2L;

    private static final String DEFAULT_SPEEDRATING = "AAAAAAAAAA";
    private static final String UPDATED_SPEEDRATING = "BBBBBBBBBB";

    private static final Long DEFAULT_LOAD = 1L;
    private static final Long UPDATED_LOAD = 2L;

    private static final String DEFAULT_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_DETAIL = "BBBBBBBBBB";

    @Autowired
    private MeasureRepository measureRepository;

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

    private MockMvc restMeasureMockMvc;

    private Measure measure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeasureResource measureResource = new MeasureResource(measureRepository);
        this.restMeasureMockMvc = MockMvcBuilders.standaloneSetup(measureResource)
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
    public static Measure createEntity(EntityManager em) {
        Measure measure = new Measure()
            .tiretype(DEFAULT_TIRETYPE)
            .width(DEFAULT_WIDTH)
            .height(DEFAULT_HEIGHT)
            .diameter(DEFAULT_DIAMETER)
            .speedrating(DEFAULT_SPEEDRATING)
            .load(DEFAULT_LOAD)
            .detail(DEFAULT_DETAIL);
        return measure;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Measure createUpdatedEntity(EntityManager em) {
        Measure measure = new Measure()
            .tiretype(UPDATED_TIRETYPE)
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT)
            .diameter(UPDATED_DIAMETER)
            .speedrating(UPDATED_SPEEDRATING)
            .load(UPDATED_LOAD)
            .detail(UPDATED_DETAIL);
        return measure;
    }

    @BeforeEach
    public void initTest() {
        measure = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasure() throws Exception {
        int databaseSizeBeforeCreate = measureRepository.findAll().size();

        // Create the Measure
        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isCreated());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeCreate + 1);
        Measure testMeasure = measureList.get(measureList.size() - 1);
        assertThat(testMeasure.getTiretype()).isEqualTo(DEFAULT_TIRETYPE);
        assertThat(testMeasure.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testMeasure.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testMeasure.getDiameter()).isEqualTo(DEFAULT_DIAMETER);
        assertThat(testMeasure.getSpeedrating()).isEqualTo(DEFAULT_SPEEDRATING);
        assertThat(testMeasure.getLoad()).isEqualTo(DEFAULT_LOAD);
        assertThat(testMeasure.getDetail()).isEqualTo(DEFAULT_DETAIL);
    }

    @Test
    @Transactional
    public void createMeasureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measureRepository.findAll().size();

        // Create the Measure with an existing ID
        measure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasureMockMvc.perform(post("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasures() throws Exception {
        // Initialize the database
        measureRepository.saveAndFlush(measure);

        // Get all the measureList
        restMeasureMockMvc.perform(get("/api/measures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measure.getId().intValue())))
            .andExpect(jsonPath("$.[*].tiretype").value(hasItem(DEFAULT_TIRETYPE)))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].diameter").value(hasItem(DEFAULT_DIAMETER.intValue())))
            .andExpect(jsonPath("$.[*].speedrating").value(hasItem(DEFAULT_SPEEDRATING)))
            .andExpect(jsonPath("$.[*].load").value(hasItem(DEFAULT_LOAD.intValue())))
            .andExpect(jsonPath("$.[*].detail").value(hasItem(DEFAULT_DETAIL)));
    }
    
    @Test
    @Transactional
    public void getMeasure() throws Exception {
        // Initialize the database
        measureRepository.saveAndFlush(measure);

        // Get the measure
        restMeasureMockMvc.perform(get("/api/measures/{id}", measure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(measure.getId().intValue()))
            .andExpect(jsonPath("$.tiretype").value(DEFAULT_TIRETYPE))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()))
            .andExpect(jsonPath("$.diameter").value(DEFAULT_DIAMETER.intValue()))
            .andExpect(jsonPath("$.speedrating").value(DEFAULT_SPEEDRATING))
            .andExpect(jsonPath("$.load").value(DEFAULT_LOAD.intValue()))
            .andExpect(jsonPath("$.detail").value(DEFAULT_DETAIL));
    }

    @Test
    @Transactional
    public void getNonExistingMeasure() throws Exception {
        // Get the measure
        restMeasureMockMvc.perform(get("/api/measures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasure() throws Exception {
        // Initialize the database
        measureRepository.saveAndFlush(measure);

        int databaseSizeBeforeUpdate = measureRepository.findAll().size();

        // Update the measure
        Measure updatedMeasure = measureRepository.findById(measure.getId()).get();
        // Disconnect from session so that the updates on updatedMeasure are not directly saved in db
        em.detach(updatedMeasure);
        updatedMeasure
            .tiretype(UPDATED_TIRETYPE)
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT)
            .diameter(UPDATED_DIAMETER)
            .speedrating(UPDATED_SPEEDRATING)
            .load(UPDATED_LOAD)
            .detail(UPDATED_DETAIL);

        restMeasureMockMvc.perform(put("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasure)))
            .andExpect(status().isOk());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeUpdate);
        Measure testMeasure = measureList.get(measureList.size() - 1);
        assertThat(testMeasure.getTiretype()).isEqualTo(UPDATED_TIRETYPE);
        assertThat(testMeasure.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testMeasure.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testMeasure.getDiameter()).isEqualTo(UPDATED_DIAMETER);
        assertThat(testMeasure.getSpeedrating()).isEqualTo(UPDATED_SPEEDRATING);
        assertThat(testMeasure.getLoad()).isEqualTo(UPDATED_LOAD);
        assertThat(testMeasure.getDetail()).isEqualTo(UPDATED_DETAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasure() throws Exception {
        int databaseSizeBeforeUpdate = measureRepository.findAll().size();

        // Create the Measure

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasureMockMvc.perform(put("/api/measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(measure)))
            .andExpect(status().isBadRequest());

        // Validate the Measure in the database
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasure() throws Exception {
        // Initialize the database
        measureRepository.saveAndFlush(measure);

        int databaseSizeBeforeDelete = measureRepository.findAll().size();

        // Delete the measure
        restMeasureMockMvc.perform(delete("/api/measures/{id}", measure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Measure> measureList = measureRepository.findAll();
        assertThat(measureList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
