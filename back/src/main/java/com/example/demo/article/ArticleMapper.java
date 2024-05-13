package com.example.demo.article;

import com.example.demo.blog.Blog;
import com.example.demo.user.User;
import org.springframework.stereotype.Service;

@Service
public class ArticleMapper {
    public Article toArticle(ArticleDto dto) {
        var article = new Article();
        article.setId(dto.id());
        article.setTitle(dto.title());
        article.setContent(dto.content());
        article.setSaved(dto.isSaved());
        var blog = new Blog();
        blog.setId(dto.blogId());
        article.setBlog(blog);
        var user = new User();
        user.setId(dto.userId());
        article.setUser(user);
        return article;
    }

    public ArticleResponseDto toArticleResponseDto(Article article) {
        return new ArticleResponseDto(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.isSaved(),
                article.getBlog().getTitle(),
                article.getBlog().getId(),
                article.getUser().getId(),
                article.getUser().getEmail()
        );
    }
}
