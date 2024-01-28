package com.example.demo.token;

public record TokenDto(
    Integer id,
    String token,
    Integer userId
) {
}
