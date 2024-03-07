package com.example.demo.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryMapperTest {

    private CategoryMapper categoryMapper;
    // Annotation @BeforeEach est utilisée pour marquer une méthode pour qu'elle soit exécutée avant chaque méthode de test.
    @BeforeEach
    // Initialisation de l'objet categoryMapper
    void setUp() {
        categoryMapper = new CategoryMapper();
    }

    // Annotation @Test est utilisée pour marquer une méthode comme un test
    @Test
    void toCategory() {
        // Créer un objet CategoryDto avec les valeurs 1 et "category"
        CategoryDto categoryDto = new CategoryDto(1, "category");
        // Appeler la méthode toCategory de l'objet categoryMapper
        Category category = categoryMapper.toCategory(categoryDto);
        // Vérifier si l'objet categoryDto.id() est égal à l'objet category.getId()
        assertEquals(categoryDto.id(), category.getId());
        // Vérifier si l'objet categoryDto.name() n'est pas null
        assertNotNull(category.getName());
        // Vérifier si l'objet categoryDto.name() est égal à l'objet category.getName()
        assertEquals(categoryDto.name(), category.getName());
    }
    @Test
    void toCategory_when_categoryDto_is_null() {
        var exp = assertThrows(NullPointerException.class, () -> categoryMapper.toCategory(null));
        assertEquals("CategoryDto should not be null.", exp.getMessage());
    }
}