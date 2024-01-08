package com.example.demo.blog;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BlogRequest {
    private Integer id;
    private String name;
    private Integer categoryId;
}
