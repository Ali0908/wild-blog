package com.example.demo.comment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentRequest {
    private Integer id;
    private String content;
    Integer articleId;

}
