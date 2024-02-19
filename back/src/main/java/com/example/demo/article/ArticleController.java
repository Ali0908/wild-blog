package com.example.demo.article;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping
    public List<ArticleResponseDto> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/blog/{blog-id}")
    public List<ArticleResponseDto> getArticleByBlogId(@PathVariable("blog-id") Integer blogId) {
        return articleService.getArticleByBlogId(blogId);
    }

    @GetMapping("/user/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public List<ArticleResponseDto> getArticlesByUserId(@PathVariable("user-id") Integer userId) {
        return articleService.getArticlesByUserId(userId);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ArticleResponseDto> create(
            @RequestBody ArticleDto articleDto) {
        return ResponseEntity.ok(articleService.create(articleDto));
    }

    @PutMapping("/user/{article-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ArticleResponseDto> updateArticlesByUserId(@PathVariable("article-id") Integer articleId,
                                                                          @PathVariable("user-id") Integer userId,
                                                                          @RequestBody ArticleDto updateArticleDto) {
        return ResponseEntity.ok(articleService.updateArticlesByUserId(articleId, userId, updateArticleDto));
    }

    @DeleteMapping("user/articles/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAllArticlesByUserId(@PathVariable("user-id") Integer userId) {
        articleService.deleteAllArticlesByUserId(userId);
    }

    @DeleteMapping("user/article/{article-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void deleteArticleByUserId(@PathVariable("article-id") Integer articleId,
                                           @PathVariable("user-id") Integer userId) {
        articleService.deleteArticleByUserId(articleId, userId);
    }
}
