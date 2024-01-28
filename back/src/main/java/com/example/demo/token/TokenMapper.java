package com.example.demo.token;

import org.springframework.stereotype.Service;

@Service
public class TokenMapper {
    public Token toToken(TokenDto dto) {
        var token = new Token();
        token.setId(dto.id());
        token.setToken(dto.token());
        return token;
    }

    public TokenResponseDto toTokenResponseDto(Token token) {
        return new TokenResponseDto(
                token.getId(),
                token.getToken(),
                token.getUser().getId()
        );
    }
}
