package com.example.demo.comment;

public record CommentDto(
    Integer id,
    String content,
    Integer articleId,
    Integer userId
) {
}
