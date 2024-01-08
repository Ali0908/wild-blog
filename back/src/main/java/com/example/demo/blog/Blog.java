package com.example.demo.blog;

import com.example.demo.category.Category;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Blog {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Integer getCategoryId() {
        return category.getId();
    }
}
