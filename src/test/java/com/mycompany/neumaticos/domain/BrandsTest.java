package com.mycompany.neumaticos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.neumaticos.web.rest.TestUtil;

public class BrandsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Brands.class);
        Brands brands1 = new Brands();
        brands1.setId(1L);
        Brands brands2 = new Brands();
        brands2.setId(brands1.getId());
        assertThat(brands1).isEqualTo(brands2);
        brands2.setId(2L);
        assertThat(brands1).isNotEqualTo(brands2);
        brands1.setId(null);
        assertThat(brands1).isNotEqualTo(brands2);
    }
}
