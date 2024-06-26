package com.example.demo.article;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query(value = """
            select a from Article a
            where a.blog.id = :blogId
            """)
    List<Article> findArticlesByBlogId(@Param("blogId") Integer blogId);
    @Query(value = """
            select a from Article a
            where a.user.id = :userId
            """)
    List<Article> findArticlesByUserId(@Param("userId") Integer userId);
    /**
     * Retrieve a blog by its ID and the ID of its associated user.
     *
     * @param id The ID of the blog to retrieve.
     * @param userId The ID of the user to which the blog belongs.
     * @return An optional containing the blog if found, or an empty optional otherwise.
     */
    Optional<Article> findArticlesByIdAndUserId(Integer id, Integer userId);
}
