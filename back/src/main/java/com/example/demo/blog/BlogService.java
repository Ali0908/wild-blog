package com.example.demo.blog;

import com.example.demo.category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;
    private final BlogMapper blogMapper;

    @Autowired
    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository, CategoryRepository categoryRepository1, BlogMapper blogMapper) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository1;
        this.blogMapper = blogMapper;
    }

    public List<BlogResponseDto> getAllBlogs() {
        return blogRepository.findAll()
                .stream()
                .map(blogMapper::toBlogResponseDto)
                .collect(Collectors.toList());
    }

    public BlogResponseDto getBlogById(Integer id) {
        return blogRepository.findById(id)
                .map(blogMapper::toBlogResponseDto)
                .orElseThrow();
    }

    public List<BlogResponseDto> getBlogByUserId(Integer userId) {
        return blogRepository.findBlogByUserId(userId)
                .stream()
                .map(blogMapper::toBlogResponseDto)
                .collect(Collectors.toList());
    }

    public Blog updateBlog(Integer id, Blog updatedBlog) {
        var existingBlog = blogRepository.findById(id).orElseThrow();
        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setCategory(categoryRepository.findById(updatedBlog.getCategoryId()).orElseThrow());
        return blogRepository.save(existingBlog);
    }

    public void deleteUser(Integer id) {
        blogRepository.deleteById(id);
    }

    public BlogResponseDto create(BlogDto blogDto) {
        var blog = blogMapper.toBlog(blogDto);
        blogRepository.save(blog);
        return blogMapper.toBlogResponseDto(blog);
    }
}

//        var existingBlog = blogRepository.findById(id).orElseThrow();
//        existingBlog.setTitle(updatedBlog.getTitle());
//        existingBlog.setCategory(categoryRepository.findById(updatedBlog.getCategoryId()).orElseThrow());
//        return blogRepository.save(existingBlog);