package com.example.demo.category;

import org.springframework.stereotype.Service;

@Service
public class CategoryMapper {
    public Category toCategory(CategoryDto dto) {
        var category = new Category();
        category.setId(dto.id());
        category.setName(dto.name());
        return category;
    }

    public CategoryResponseDto toCategoryResponseDto(Category category) {
        return new CategoryResponseDto(
                category.getId(),
                category.getName());
    }
}
