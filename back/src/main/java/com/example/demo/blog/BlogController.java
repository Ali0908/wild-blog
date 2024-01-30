package com.example.demo.blog;

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

    @PutMapping("/{blog-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<BlogResponseDto> updateAllBlog(@PathVariable("blog-id") Integer id,
                                                         @RequestBody BlogDto updateAllBlogDto) {
        return ResponseEntity.ok(blogService.updateAllBlog(id, updateAllBlogDto));
    }

    @PutMapping("/user/{blog-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<BlogResponseDto> updateBlogByUserId(@PathVariable("blog-id") Integer id,
                                                              @PathVariable("user-id") Integer userId,
                                                              @RequestBody BlogDto updateBlogDto) {
        return ResponseEntity.ok(blogService.updateBlogByUserId(id, userId, updateBlogDto));
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBlog(@PathVariable Integer id) {
        blogService.deleteUser(id);
    }


    @DeleteMapping("user/blogs/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAllBlogsByUserId(@PathVariable("user-id") Integer userId) {
        blogService.deleteAllBlogsByUserId(userId);
    }

    @DeleteMapping("user/blog/{blog-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBlogByUserId(@PathVariable("blog-id") Integer blogId,
                                   @PathVariable ("user-id") Integer userId) {
        blogService.deleteBlogByUserId(blogId, userId);
    }
}
