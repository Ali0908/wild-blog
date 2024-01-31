package com.example.demo.comment;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value = """
            select c from Comment c
            where c.article.id = :articleId
            """)
    List<Comment> findCommentsByArticleId(@Param("articleId") Integer articleId);
    @Query(value = """
            select c from Comment c
            where c.user.id = :userId
            """)
    List<Comment> findCommentByUserId(@Param("userId") Integer userId);
    /**
     * Retrieve a blog by its ID and the ID of its associated user.
     *
     * @param id The ID of the blog to retrieve.
     * @param userId The ID of the user to which the blog belongs.
     * @return An optional containing the blog if found, or an empty optional otherwise.
     */
    Optional<Comment> findCommentByIdAndUserId(Integer id, Integer userId);
}
