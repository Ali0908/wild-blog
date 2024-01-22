package com.example.demo.blog;
import com.example.demo.category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final BlogMapper blogMapper;
    @Autowired
    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository, BlogMapper blogMapper) {
        this.blogRepository = blogRepository;
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

    public Blog updateBlog(Integer id, Blog updatedBlog) {
        return null;
    }

    public void deleteUser(Integer id) {
        blogRepository.deleteById(id);
    }

        public BlogResponseDto create(BlogDto blogDto) {
        var blog = blogMapper.toBlog(blogDto);
        blogRepository.save(blog);
        return blogMapper.toBlogResponseDto(blog);
    }

/*    public void create(BlogRequest request) {
        var blog = Blog.builder()
                .id(request.getId())
                .title(request.getTitle())
                .category(categoryRepository.findById(request.getCategoryId()).orElseThrow())
                .build();
        blogRepository.save(blog);
    }*/


}
