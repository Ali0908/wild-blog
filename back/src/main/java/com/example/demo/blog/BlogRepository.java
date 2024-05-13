package com.example.demo.blog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.nio.channels.FileChannel;
import java.util.List;
import java.util.Optional;

public interface BlogRepository  extends JpaRepository<Blog, Integer> {


    @Query(value = """
            select b from Blog b
            where b.user.id = :userId
            """)
    List<Blog> findBlogByUserId(@Param("userId") Integer userId);
    /**
     * Retrieve a blog by its ID and the ID of its associated user.
     *
     * @param blogId The ID of the blog to retrieve.
     * @param userId The ID of the user to which the blog belongs.
     * @return An optional containing the blog if found, or an empty optional otherwise.
     */
    Optional<Blog> findBlogByIdAndUserId(Integer blogId, Integer userId);

}
