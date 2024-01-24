package com.example.demo.comment;

import com.example.demo.article.Article;
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
        return comment;
    }

    public CommentResponseDto toCommentResponseDto(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getContent(),
                comment.getArticle().getId());
    }
}
