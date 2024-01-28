package com.example.demo.user;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    private User toUser(UserDto dto){
        var user = new User();
        user.setId(dto.id());
        return user;
    }

    public UserResponseDto toUserResponseDto (User user){
        return new UserResponseDto(
                user.getId());
    }
}
