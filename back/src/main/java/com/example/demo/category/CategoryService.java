package com.example.demo.category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    public void create(CategoryRequest request) {
        var category = Category.builder()
                .id(request.getId())
                .name(request.getName())
                .build();
        categoryRepository.save(category);

    }


}
