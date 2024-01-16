package com.example.demo.article;

import com.example.demo.blog.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final BlogRepository blogRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, BlogRepository blogRepository) {
        this.articleRepository = articleRepository;
        this.blogRepository = blogRepository;
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }
    public void create(ArticleRequest request) {
        var article = Article.builder()
                .id(request.getId())
                .title(request.getTitle())
                .content(request.getContent())
                .blog(blogRepository.findById(request.getBlogId()).orElseThrow())
                .build();
        articleRepository.save(article);
    }
//    public void create(BlogRequest request) {
//        var blog = Blog.builder()
//                .id(request.getId())
//                .title(request.getTitle())
//                .category(categoryRepository.findById(request.getCategoryId()).orElseThrow())
//                .build();
//        blogRepository.save(blog);
//    }
}
