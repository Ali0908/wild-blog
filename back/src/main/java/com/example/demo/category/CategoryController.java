package com.example.demo.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(
            @RequestBody CategoryRequest blog) {
        categoryService.create(blog);
        return ResponseEntity.accepted().build();
    }
}
