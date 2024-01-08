package com.example.demo.category;

import com.example.demo.blog.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
