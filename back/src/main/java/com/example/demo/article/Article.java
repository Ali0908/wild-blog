package com.example.demo.article;

import com.example.demo.blog.Blog;
import com.example.demo.comment.Comment;
import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Article {
    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String content;
    private boolean isSaved = false;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id", nullable=false)
    @JsonBackReference
    private Blog blog;

    @OneToMany(mappedBy = "article")
    @JsonManagedReference
    private List<Comment> comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable=false)
    @JsonBackReference
    private User user;
}
