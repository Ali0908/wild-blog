package com.example.demo.article;

import com.example.demo.blog.Blog;
import org.springframework.stereotype.Service;

@Service
public class ArticleMapper {
    public Article toArticle(ArticleDto dto) {
        var article = new Article();
        article.setId(dto.id());
        article.setTitle(dto.title());
        article.setContent(dto.content());
        var blog = new Blog();
        blog.setId(dto.blogId());
        article.setBlog(blog);
        return article;
    }

    public ArticleResponseDto toArticleResponseDto(Article article) {
        return new ArticleResponseDto(
            article.getTitle(),
            article.getContent(),
            article.getBlog().getTitle()
        );
    }
}
