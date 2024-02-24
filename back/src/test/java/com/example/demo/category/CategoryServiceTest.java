package com.example.demo.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceTest {
    // Service tested:
    @InjectMocks
    private CategoryService categoryService;

    // Dependencies:
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private CategoryMapper categoryMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create() {
        // Given
        CategoryDto categoryDto = new CategoryDto(1, "category");
        Category category = new Category(1, "category", null);
        Category savedCategory = new Category(1, "category", null);
        savedCategory.setId(1);

        // Mocking
        when(categoryMapper.toCategory(categoryDto)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(savedCategory);
        when(categoryMapper.toCategoryResponseDto(savedCategory)).thenReturn(new CategoryResponseDto(1, "category"));
        // When
        CategoryResponseDto categoryResponseDto = categoryService.create(categoryDto);
        // Then
        assertEquals(categoryDto.id(), categoryResponseDto.id());
        assertEquals(categoryDto.name(), categoryResponseDto.name());

        // Verify if the method was called only once
        verify(categoryMapper, times(1)).toCategory(categoryDto);
        verify(categoryRepository, times(1)).save(category);
        verify(categoryMapper, times(1)).toCategoryResponseDto(savedCategory);

    }
}