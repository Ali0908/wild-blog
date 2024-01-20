package com.example.demo.article;

import com.example.demo.blog.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final BlogRepository blogRepository;

    private final ArticleMapper articleMapper;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, BlogRepository blogRepository, ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.blogRepository = blogRepository;
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
//    public void create(ArticleRequest request) {
//        var article = Article.builder()
//                .id(request.getId())
//                .title(request.getTitle())
//                .content(request.getContent())
//                .blog(blogRepository.findById(request.getBlogId()).orElseThrow())
//                .build();
//        articleRepository.save(article);
//    }
}
