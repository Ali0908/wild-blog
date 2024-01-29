package com.example.demo.article;

public record ArticleDto(
    Integer id,
    String title,
    String content,
    Boolean isSaved,
    Integer blogId,
    Integer userId
) {
}
