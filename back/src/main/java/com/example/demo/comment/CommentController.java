package com.example.demo.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllArticles();
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(
            @RequestBody CommentRequest comment) {
        commentService.create(comment);
        return ResponseEntity.ok().build();
    }
}
