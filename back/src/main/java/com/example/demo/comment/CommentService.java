package com.example.demo.comment;

import com.example.demo.article.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }
    public List<Comment> getAllArticles() {
        return commentRepository.findAll();
    }
    public void create(CommentRequest request) {
        var comment = Comment.builder()
                .id(request.getId())
                .content(request.getContent())
                .article(articleRepository.findById(request.getArticleId()).orElseThrow())
                .build();
        commentRepository.save(comment);
    }
}
