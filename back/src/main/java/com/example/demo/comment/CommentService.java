package com.example.demo.comment;

import com.example.demo.article.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final CommentMapper commentMapper;


    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
        this.commentMapper = commentMapper;
    }
    public List<CommentResponseDto> getAllArticles() {
        return commentRepository.findAll()
                .stream()
                .map(commentMapper::toCommentResponseDto)
                .collect(Collectors.toList());
    }

    public CommentResponseDto create(CommentDto commentDto) {
        var comment = commentMapper.toComment(commentDto);
        commentRepository.save(comment);
        return commentMapper.toCommentResponseDto(comment);
    }
//    public void create(CommentRequest request) {
//        var comment = Comment.builder()
//                .id(request.getId())
//                .content(request.getContent())
//                .article(articleRepository.findById(request.getArticleId()).orElseThrow())
//                .build();
//        commentRepository.save(comment);
//    }
}
