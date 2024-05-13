package com.example.demo.token;

public record TokenResponseDto(
        Integer id,
        String token,
        Integer userId
) {
}
