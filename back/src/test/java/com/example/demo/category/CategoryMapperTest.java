package com.example.demo.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryMapperTest {

    private CategoryMapper categoryMapper;

    @BeforeEach
    void setUp() {
        categoryMapper = new CategoryMapper();
    }

    @Test
    void toCategory() {
        CategoryDto categoryDto = new CategoryDto(1, "category");
        Category category = categoryMapper.toCategory(categoryDto);
        assertEquals(categoryDto.id(), category.getId());
        assertNotNull(category.getName());
        assertEquals(categoryDto.name(), category.getName());
    }
}