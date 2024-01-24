package com.example.demo.article;

public record ArticleResponseDto(

        Integer id,
        String title,

        String content,

        String blogTitle,

        Integer blogId
) {
}
