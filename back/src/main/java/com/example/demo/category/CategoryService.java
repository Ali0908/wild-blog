package com.example.demo.category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> create(CategoryRequest request) {
        var category = Category.builder()
                .id(request.getId())
                .name(request.getName())
                .build();
        categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }


}
