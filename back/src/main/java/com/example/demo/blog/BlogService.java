package com.example.demo.blog;

import com.example.demo.category.Category;
import com.example.demo.category.CategoryRepository;
import com.example.demo.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private CategoryRepository categoryRepository;
    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
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
                .name(request.getName())
                .build();
        blogRepository.save(blog);
    }


}
