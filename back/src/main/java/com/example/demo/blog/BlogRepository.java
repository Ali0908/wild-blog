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

}
