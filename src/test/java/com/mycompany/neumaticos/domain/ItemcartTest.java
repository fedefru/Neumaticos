package com.mycompany.neumaticos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.neumaticos.web.rest.TestUtil;

public class ItemcartTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Itemcart.class);
        Itemcart itemcart1 = new Itemcart();
        itemcart1.setId(1L);
        Itemcart itemcart2 = new Itemcart();
        itemcart2.setId(itemcart1.getId());
        assertThat(itemcart1).isEqualTo(itemcart2);
        itemcart2.setId(2L);
        assertThat(itemcart1).isNotEqualTo(itemcart2);
        itemcart1.setId(null);
        assertThat(itemcart1).isNotEqualTo(itemcart2);
    }
}
