package com.example.demo.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value = """
            select c from Comment c
            where c.article.id = :articleId
            """)
    List<Comment> findCommentsByArticleId(@Param("articleId") Integer articleId);
}
