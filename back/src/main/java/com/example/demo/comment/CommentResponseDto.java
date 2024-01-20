package com.example.demo.comment;

public record CommentResponseDto(
        Integer id,
        String content,
        String blogName
) {
}
