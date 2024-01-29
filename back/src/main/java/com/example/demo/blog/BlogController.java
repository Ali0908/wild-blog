package com.example.demo.blog;

import com.example.demo.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public List<BlogResponseDto> getAllBlogs() {
        return blogService.getAllBlogs();

    }

    @GetMapping("/{blog-id}")
    public BlogResponseDto getBlogById(@PathVariable("blog-id") Integer id) {
        return blogService.getBlogById(id);
    }

    @GetMapping("/user/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public List<BlogResponseDto> getBlogByUserId(@PathVariable("user-id") Integer userId) {
        return blogService.getBlogByUserId(userId);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<BlogResponseDto> create(
            @RequestBody BlogDto blogDto) {
        return ResponseEntity.ok(blogService.create(blogDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Blog> updateBlog(@PathVariable Integer id,
                                           @RequestBody Blog blogDto) {
        return ResponseEntity.ok(blogService.updateBlog(id, blogDto));

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBlog(@PathVariable Integer id) {
        blogService.deleteUser(id);
    }
}
