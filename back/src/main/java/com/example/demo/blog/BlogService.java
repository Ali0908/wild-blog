package com.example.demo.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BlogService {

    private final BlogRepository blogRepository;
    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }
    public Blog create(Blog blog) {
        return blogRepository.save(blog);
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
}
