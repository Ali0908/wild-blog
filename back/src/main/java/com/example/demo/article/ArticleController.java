package com.example.demo.article;

import lombok.RequiredArgsConstructor;
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
    @GetMapping("/{blog-id}")
    public List<ArticleResponseDto> getArticleByBlogId(@PathVariable("blog-id") Integer blogId) {
        return articleService.getArticleByBlogId(blogId);
    }
    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ArticleResponseDto create(
            @RequestBody ArticleDto articleDto) {
        return articleService.create(articleDto);
    }
}
