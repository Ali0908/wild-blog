package com.example.demo.comment;

public record CommentResponseDto(
        Integer id,
        String content,
        Integer articleId,
        Integer userId,
        String articleTitle

) {
}
