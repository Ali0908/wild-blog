package com.example.demo.article;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;
    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(
            @RequestBody ArticleRequest article) {
        articleService.create(article);
        return ResponseEntity.ok().build();
    }
}
