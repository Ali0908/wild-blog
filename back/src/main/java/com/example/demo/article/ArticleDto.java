package com.example.demo.article;

import lombok.Getter;

public record ArticleDto(
        @Getter Integer id,
        @Getter String title,
        @Getter String content,
        @Getter Boolean isSaved,
        @Getter Integer blogId,
        @Getter Integer userId
) {
}
