package com.example.demo.blog;

import com.example.demo.article.Article;
import com.example.demo.category.Category;
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
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable=false)
    @JsonBackReference
    private Category category;

    @OneToMany(mappedBy = "blog")
    @JsonManagedReference
    private List<Article> articles;

    public Integer getCategoryId() {
        return category.getId();
    }
}
