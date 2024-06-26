package com.example.demo.comment;

import com.example.demo.article.Article;
import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue
    private Integer id;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable=false)
    @JsonBackReference
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable=false)
    @JsonBackReference
    private User user;
}
