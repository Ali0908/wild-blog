package com.example.demo.article;

public record ArticleDto(
    Integer id,
    String title,
    String content,
    Integer blogId
) {
}
