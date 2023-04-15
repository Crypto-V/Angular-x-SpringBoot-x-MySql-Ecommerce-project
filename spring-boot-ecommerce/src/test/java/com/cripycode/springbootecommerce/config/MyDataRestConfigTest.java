package com.cripycode.springbootecommerce.config;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest
@Import(MyDataRestConfig.class)
public class MyDataRestConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHttpMethodsDisabled() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.POST, "/api/products"))
                .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.PUT, "/api/products/1"))
                .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.DELETE, "/api/products/1"))
                .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.POST, "/api/product-category"))
                .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.PUT, "/api/product-category/1"))
                .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.DELETE, "/api/product-category/1"))
                .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());
    }
}
