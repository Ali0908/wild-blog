package com.example.demo.comment;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;


    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
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

    public List<CommentResponseDto> getCommentsByArticleId(Integer articleId) {
        return commentRepository.findCommentsByArticleId(articleId)
                .stream()
                .map(commentMapper:: toCommentResponseDto)
                .collect(Collectors.toList());
    }
    public List<CommentResponseDto> getArticlesByUserId(Integer userId) {
return commentRepository.findCommentByUserId(userId)
                .stream()
                .map(commentMapper:: toCommentResponseDto)
                .collect(Collectors.toList());
    }

    public CommentResponseDto updateCommentByUserId(Integer id, Integer userId, CommentDto updateCommentDto) {
        var existingComment = commentRepository.findCommentByIdAndUserId(id, userId).orElseThrow();
        existingComment.setContent(updateCommentDto.getContent());
        commentRepository.save(existingComment);
        return commentMapper.toCommentResponseDto(existingComment);
    }

    public void deleteCommentByUserId(Integer commentId, Integer userId) {
        var existingComment = commentRepository.findCommentByIdAndUserId(commentId, userId).orElseThrow();
        commentRepository.delete(existingComment);
    }

    public void deleteAllCommentsByUserId(Integer userId) {
        var AllExistingComments = commentRepository.findCommentByUserId(userId);
        commentRepository.deleteAll(AllExistingComments);
    }


}
