package com.example.demo.article;

public record ArticleResponseDto(

        Integer id,
        String title,
        String content,
        Boolean isSaved,
        String blogTitle,
        Integer blogId,
        Integer userId,
        String username
) {
}
