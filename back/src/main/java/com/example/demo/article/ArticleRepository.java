package com.example.demo.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query(value = """
            select a from Article a
            where a.blog.id = :blogId
            """)
    List<Article> findArticlesByBlogId(@Param("blogId") Integer blogId);
    @Query(value = """
            select a from Article a
            where a.user.id = :userId
            and a.isSaved = true
            """)
    List<Article> findArticlesSavedByUserId(@Param("userId") Integer userId);
}
