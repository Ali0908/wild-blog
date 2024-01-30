package com.example.demo.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
    }

    public List<ArticleResponseDto> getAllArticles() {
        return articleRepository.findAll()
                .stream()
                .map(articleMapper::toArticleResponseDto)
                .collect(Collectors.toList());
    }
    public ArticleResponseDto create(ArticleDto articleDto) {
        var article = articleMapper.toArticle(articleDto);
        articleRepository.save(article);
        return articleMapper.toArticleResponseDto(article);
    }

    public List<ArticleResponseDto> getArticleByBlogId(Integer blogId) {
        return articleRepository.findArticlesByBlogId(blogId)
                .stream()
                .map(articleMapper::toArticleResponseDto)
                .collect(Collectors.toList());
    }

    public List<ArticleResponseDto> getArticleSavedByUserId(Integer userId) {
        return articleRepository.findArticlesSavedByUserId(userId)
                .stream()
                .map(articleMapper::toArticleResponseDto)
                .collect(Collectors.toList());
    }
}
