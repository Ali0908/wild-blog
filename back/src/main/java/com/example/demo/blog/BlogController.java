package com.example.demo.blog;

import com.example.demo.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;
    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;
    @GetMapping
    public ResponseEntity<List<Blog>>  getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok().body(blogs);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> create(
            @RequestBody BlogRequest blog) {
        blogService.create(blog);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public Blog updateBlog(@PathVariable Integer id, @RequestBody Blog updatedBlog) {
        var existingBlog = blogRepository.findById(id).orElseThrow();
        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setCategory(categoryRepository.findById(updatedBlog.getCategoryId()).orElseThrow());

        return blogRepository.save(existingBlog);
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable Integer id) {
        blogService.deleteUser(id);
    }
}
