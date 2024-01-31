package com.example.demo.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public List<CommentResponseDto> getAllComments() {
        return commentService.getAllArticles();
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public CommentResponseDto create(
            @RequestBody CommentDto comment) {
        return commentService.create(comment);
    }

    @GetMapping("/article/{article-id}")
    public List<CommentResponseDto> getCommentsByArticleId(@PathVariable("article-id") Integer articleId) {
        return commentService.getCommentsByArticleId(articleId);
    }

    @PutMapping("/user/{comment-id}/{user-id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<CommentResponseDto> updateCommentByUserId(@PathVariable("comment-id") Integer id,
                                                                    @PathVariable("user-id") Integer userId,
                                                                    @RequestBody CommentDto updateCommentDto) {
        return ResponseEntity.ok(commentService.updateCommentByUserId(id, userId, updateCommentDto));
    }
}
