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

    public List<ArticleResponseDto> getArticlePublishedByUserId(Integer userId) {
        return articleRepository.findArticlesPublishedByUserId(userId)
                .stream()
                .map(articleMapper::toArticleResponseDto)
                .collect(Collectors.toList());
    }

    public ArticleResponseDto updateArticledSavedByUserId(Integer id, Integer userId, ArticleDto updateArticleDto) {
        var existingSavedArticle = articleRepository.findArticlesSavedByIdAndUserId(id, userId).orElseThrow();
        existingSavedArticle.setTitle(updateArticleDto.getTitle());
        existingSavedArticle.setContent(updateArticleDto.getContent());
        existingSavedArticle.setSaved(updateArticleDto.getIsSaved());
        existingSavedArticle.setBlog(existingSavedArticle.getBlog());
        articleRepository.save(existingSavedArticle);
        return articleMapper.toArticleResponseDto(existingSavedArticle);
    }

    public ArticleResponseDto updateArticledPublishedByUserId(Integer id, Integer userId, ArticleDto updateArticleDto) {
        var existingArticle = articleRepository.findArticlesPublishedByIdAndUserId(id, userId).orElseThrow();
        existingArticle.setTitle(updateArticleDto.getTitle());
        existingArticle.setContent(updateArticleDto.getContent());
        existingArticle.setSaved(updateArticleDto.getIsSaved());
        articleRepository.save(existingArticle);
        return articleMapper.toArticleResponseDto(existingArticle);
    }

    public void deleteAllArticlesByUserId(Integer userId) {
        var AllExistingArticles = articleRepository.findArticlesSavedByUserId(userId);
        articleRepository.deleteAll(AllExistingArticles);
    }
}
