package com.example.demo.blog;
import com.example.demo.category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;
    @Autowired
    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog updateBlog(Integer id, Blog updatedBlog) {
        return null;
    }

    public void deleteUser(Integer id) {
        blogRepository.deleteById(id);
    }

    public void create(BlogRequest request) {
        var blog = Blog.builder()
                .id(request.getId())
                .title(request.getTitle())
                .category(categoryRepository.findById(request.getCategoryId()).orElseThrow())
                .build();
        blogRepository.save(blog);
    }


}
