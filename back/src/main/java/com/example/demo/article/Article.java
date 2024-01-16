package com.example.demo.article;

import com.example.demo.blog.Blog;
import com.example.demo.comment.Comment;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id", nullable=false)
    private Blog blog;

    @OneToMany(mappedBy = "article")
    private List<Comment> comments;
}
