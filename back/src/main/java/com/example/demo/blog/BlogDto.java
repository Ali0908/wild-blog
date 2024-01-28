package com.example.demo.blog;

public record BlogDto(
    Integer id,
    String title,
    Integer categoryId,
    Integer userId
) {
}
