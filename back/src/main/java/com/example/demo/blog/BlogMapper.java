package com.example.demo.blog;

import com.example.demo.category.Category;
import org.springframework.stereotype.Service;

@Service
public class BlogMapper {
    public Blog toBlog(BlogDto dto) {
        var blog = new Blog();
        blog.setId(dto.id());
        blog.setTitle(dto.title());
        var category = new Category();
        category.setId(dto.categoryId());
        blog.setCategory(category);
        return blog;
    }

    public BlogResponseDto toBlogResponseDto(Blog blog) {
        return new BlogResponseDto(
                blog.getId(),
                blog.getTitle(),
                blog.getCategory().getName()
        );
    }
}
