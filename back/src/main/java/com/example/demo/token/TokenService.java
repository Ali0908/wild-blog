package com.example.demo.token;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;
    private final TokenMapper tokenMapper;

    @Autowired
    public TokenService(TokenRepository tokenRepository, TokenMapper tokenMapper) {
        this.tokenRepository = tokenRepository;
        this.tokenMapper = tokenMapper;
    }

    public List<TokenResponseDto> getAllTokens() {
        return tokenRepository.findAll()
                .stream()
                .map(tokenMapper::toTokenResponseDto)
                .collect(Collectors.toList());
    }
}
