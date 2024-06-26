package com.example.demo.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryResponseDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponseDto)
                .collect(Collectors.toList());
    }
    public CategoryResponseDto getCategoryById(Integer id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toCategoryResponseDto)
                .orElseThrow();
    }
    public List<CategoryResponseDto> getCategoriesByName(String name) {
        return categoryRepository.findCategoryByName(name)
                .stream()
                .map(categoryMapper::toCategoryResponseDto)
                .collect(Collectors.toList());
    }

    public CategoryResponseDto create(CategoryDto categoryDto) {
        var category = categoryMapper.toCategory(categoryDto);
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponseDto(category);
    }
}
