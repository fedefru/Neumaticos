package com.mycompany.neumaticos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.neumaticos.web.rest.TestUtil;

public class MethodTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Method.class);
        Method method1 = new Method();
        method1.setId(1L);
        Method method2 = new Method();
        method2.setId(method1.getId());
        assertThat(method1).isEqualTo(method2);
        method2.setId(2L);
        assertThat(method1).isNotEqualTo(method2);
        method1.setId(null);
        assertThat(method1).isNotEqualTo(method2);
    }
}
