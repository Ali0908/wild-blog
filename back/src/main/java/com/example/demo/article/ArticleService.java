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

    public List<ArticleResponseDto> getArticlesByUserId(Integer userId) {
        return articleRepository.findArticlesByUserId(userId)
                .stream()
                .map(articleMapper::toArticleResponseDto)
                .collect(Collectors.toList());
    }

    public ArticleResponseDto updateArticlesByUserId(Integer id, Integer userId, ArticleDto updateArticleDto) {
        var existingArticle = articleRepository.findArticlesByIdAndUserId(id, userId).orElseThrow();
        existingArticle.setTitle(updateArticleDto.getTitle());
        existingArticle.setContent(updateArticleDto.getContent());
        existingArticle.setSaved(updateArticleDto.getIsSaved());
        existingArticle.setBlog(existingArticle.getBlog());
        articleRepository.save(existingArticle);
        return articleMapper.toArticleResponseDto(existingArticle);
    }


    public void deleteAllArticlesByUserId(Integer userId) {
        var AllSavedArticles = articleRepository.findArticlesByUserId(userId);
        articleRepository.deleteAll(AllSavedArticles);
    }

    public void deleteArticleByUserId(Integer articleId, Integer userId) {
        var savedArticle = articleRepository.findArticlesByIdAndUserId(articleId, userId).orElseThrow();
        articleRepository.delete(savedArticle);
    }

}
