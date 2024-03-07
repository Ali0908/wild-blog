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
    // The @InjectMocks est utilisée pour injecter des dépendances dans le champ de test.
    @InjectMocks
    private CategoryService categoryService;

    // Dépendances du service:
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private CategoryMapper categoryMapper;

    // Annotation @BeforeEach est utilisée pour marquer une méthode pour qu'elle soit exécutée avant chaque méthode de test.
    @BeforeEach
    // Initialisation des objets annotés par @Mock
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCategory() {
        // Créer un objet CategoryDto avec les valeurs 1 et "category"
        CategoryDto categoryDto = new CategoryDto(1, "category");
        // Créer un objet Category avec les valeurs 1 et "category"
        Category category = new Category(1, "category", null);
        // Créer un objet Category avec les valeurs 1 et "category"
        Category savedCategory = new Category(1, "category", null);
        // Définir l'ID de l'objet savedCategory à 1
        savedCategory.setId(1);

        // Mocker les méthodes
        when(categoryMapper.toCategory(categoryDto)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(savedCategory);
        when(categoryMapper.toCategoryResponseDto(savedCategory)).thenReturn(new CategoryResponseDto(1, "category"));
        // Appeler la méthode create de l'objet categoryService
        CategoryResponseDto categoryResponseDto = categoryService.create(categoryDto);
        // Vérifier si l'objet categoryDto.id() est égal à l'objet categoryResponseDto.id()
        assertEquals(categoryDto.id(), categoryResponseDto.id());
        // Vérifier si l'objet categoryDto.name() est égal à l'objet categoryResponseDto.name()
        assertEquals(categoryDto.name(), categoryResponseDto.name());

        // Verifier si la méthode toCategory de l'objet categoryMapper a été appelée une seule fois
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