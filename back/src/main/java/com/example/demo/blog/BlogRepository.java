package com.example.demo.blog;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogRepository  extends JpaRepository<Blog, Integer> {
    Optional<Object> findByTitle(String title);
}
