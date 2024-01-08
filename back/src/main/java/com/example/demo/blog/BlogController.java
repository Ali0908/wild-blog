package com.example.demo.blog;

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

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> create(
            @RequestBody BlogRequest blog) {
        blogService.create(blog);
        return ResponseEntity.accepted().build();
    }
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }
    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Integer id, @RequestBody Blog updatedBlog) {
        return blogService.updateBlog(id, updatedBlog);
    }
    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable Integer id) {
        blogService.deleteUser(id);
    }
}
