package com.example.demo.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping
    public List<CategoryResponseDto> getAllCategories() {
        return categoryService.getAllCategories();
    }
    @GetMapping("/{id}")
    public CategoryResponseDto CategoryBlogById(@PathVariable("id") Integer id) {
        return categoryService.getCategoryById(id);
    }
    @GetMapping({"/{name}"})
    public List<CategoryResponseDto> getAllCategoriesByName(@PathVariable("name") String name) {
        return categoryService.getCategoriesByName(name);
    }
    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CategoryResponseDto> create(
            @RequestBody CategoryDto categoryDto) {
         return  ResponseEntity.ok(categoryService.create(categoryDto));
    }
}
