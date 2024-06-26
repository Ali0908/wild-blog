package com.example.demo.comment;

import com.example.demo.article.Article;
import com.example.demo.user.User;
import org.springframework.stereotype.Service;

@Service
public class CommentMapper {
    public Comment toComment(CommentDto dto) {
        var comment = new Comment();
        comment.setId(dto.id());
        comment.setContent(dto.content());
        var article = new Article();
        article.setId(dto.articleId());
        comment.setArticle(article);
        var user = new User();
        user.setId(dto.userId());
        comment.setUser(user);
        return comment;
    }

    public CommentResponseDto toCommentResponseDto(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getContent(),
                comment.getArticle().getId(),
                comment.getUser().getId(),
                comment.getArticle().getTitle(),
                comment.getArticle().getContent()
        );
    }
}
