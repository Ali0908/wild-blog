package com.example.demo.article;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ArticleRequest {
    private Integer id;
    private String title;
    private String content;
    Integer blogId;

}
