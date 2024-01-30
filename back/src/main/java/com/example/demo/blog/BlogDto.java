package com.example.demo.blog;

import lombok.Getter;

public record BlogDto(
    @Getter Integer id,
    @Getter String title,
    @Getter Integer categoryId,
    @Getter Integer userId
) {
}
