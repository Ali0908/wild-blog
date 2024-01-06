package com.example.demo.blog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @PostMapping("/create")
    public Blog create(Blog blog) {
        return blogService.create(blog);
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
