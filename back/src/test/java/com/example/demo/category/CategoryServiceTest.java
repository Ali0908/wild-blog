package com.example.demo.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    void createCategory() {
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

    @Test
    void getAllCategories() {
        // Given
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(2, " second category", null));

        // Mocking
        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.toCategoryResponseDto(any(Category.class))).thenReturn(new CategoryResponseDto(2, " second category"));
        //When
        List<CategoryResponseDto> categoryResponseDtos = categoryService.getAllCategories();

        //Then
        assertEquals(categories.size(), categoryResponseDtos.size());

        // Verify if the method was called only once
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void getCategoryById() {
        // Given
        Integer categoryId = 1;
        Category category = new Category(1, "category", null);

        // Mocking
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
        when(categoryMapper.toCategoryResponseDto(category)).thenReturn(new CategoryResponseDto(1, "category"));
        //When
        CategoryResponseDto categoryResponseDto = categoryService.getCategoryById(categoryId);

        //Then
        assertEquals(categoryResponseDto.id(), category.getId());
        assertEquals(categoryResponseDto.name(), category.getName());

        // Verify if the method was called only once
        verify(categoryRepository, times(1)).findById(categoryId);
    }

    @Test
    void getAllCategoriesByName() {
        // Given
        String categoryExample = "category-example";
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(2, " second category", null));

        // Mocking
        when(categoryRepository.findCategoryByName(categoryExample)).thenReturn(categories);
        when(categoryMapper.toCategoryResponseDto(any(Category.class))).thenReturn(new CategoryResponseDto(2, " second category"));
        //When
        var categoryResponseDto = categoryService.getCategoriesByName(categoryExample);
        //Then
        assertEquals(categories.size(), categoryResponseDto.size());
        // Verify if the method was called only once
        verify(categoryRepository, times(1)).findCategoryByName(categoryExample);
    }
}