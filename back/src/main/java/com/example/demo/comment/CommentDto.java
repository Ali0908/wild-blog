package com.example.demo.comment;

import lombok.Getter;

public record CommentDto(
    @Getter Integer id,
    @Getter String content,
    @Getter Integer articleId,
    @Getter Integer userId
) {
}
