package com.example.demo.article;


import lombok.RequiredArgsConstructor;
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

    @GetMapping("/user/article-saved/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public List<ArticleResponseDto> getArticleSavedByUserId(@PathVariable("user-id") Integer userId) {
        return articleService.getArticleSavedByUserId(userId);
    }

    @GetMapping("/user/article-published/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public List<ArticleResponseDto> getArticlePublishedByUserId(@PathVariable("user-id") Integer userId) {
        return articleService.getArticlePublishedByUserId(userId);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ArticleResponseDto> create(
            @RequestBody ArticleDto articleDto) {
        return ResponseEntity.ok(articleService.create(articleDto));
    }

    @PutMapping("/user/article-saved/{article-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ArticleResponseDto> updateArticledSavedByUserId(@PathVariable("article-id") Integer articleId,
                                                                          @PathVariable("user-id") Integer userId,
                                                                          @RequestBody ArticleDto updateArticleDto) {
        return ResponseEntity.ok(articleService.updateArticledSavedByUserId(articleId, userId, updateArticleDto));
    }

    @PutMapping("/user/article-published/{article-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ArticleResponseDto> updateArticledPublishedByUserId(@PathVariable("article-id") Integer id,
                                                                              @PathVariable("user-id") Integer userId,
                                                                              @RequestBody ArticleDto updateArticleDto) {
        return ResponseEntity.ok(articleService.updateArticledPublishedByUserId(id, userId, updateArticleDto));
    }
}
