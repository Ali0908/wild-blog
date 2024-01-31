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
    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository, BlogMapper blogMapper) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
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

    public void deleteUser(Integer id) {
        blogRepository.deleteById(id);
    }

    public BlogResponseDto create(BlogDto blogDto) {
        var blog = blogMapper.toBlog(blogDto);
        blogRepository.save(blog);
        return blogMapper.toBlogResponseDto(blog);
    }

    public BlogResponseDto updateAllBlog(Integer id, BlogDto updateAllBlogDto) {
        var existingBlog = blogRepository.findById(id).orElseThrow();
        existingBlog.setTitle(updateAllBlogDto.getTitle());
        existingBlog.setCategory(categoryRepository.findById(updateAllBlogDto.getCategoryId()).orElseThrow());
        blogRepository.save(existingBlog);
        return blogMapper.toBlogResponseDto(existingBlog);
    }

    public BlogResponseDto updateBlogByUserId(Integer id, Integer userId, BlogDto updateBlogDto) {
        var existingBlog = blogRepository.findBlogByIdAndUserId(id, userId).orElseThrow();
        existingBlog.setTitle(updateBlogDto.getTitle());
        existingBlog.setCategory(categoryRepository.findById(updateBlogDto.getCategoryId()).orElseThrow());
        blogRepository.save(existingBlog);
        return blogMapper.toBlogResponseDto(existingBlog);
    }

    public void deleteAllBlogsByUserId(Integer userId) {
        var AllExistingBlogs = blogRepository.findBlogByUserId(userId);
         blogRepository.deleteAll(AllExistingBlogs);
    }

    public void deleteBlogByUserId(Integer blogId, Integer userId) {
        var existingBlog = blogRepository.findBlogByIdAndUserId(blogId, userId).orElseThrow();
        blogRepository.delete(existingBlog);
    }
}