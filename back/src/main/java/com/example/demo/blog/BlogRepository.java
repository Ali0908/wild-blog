package com.example.demo.blog;

import com.example.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository  extends JpaRepository<Blog, Integer> {
    Blog findByName(String name);
    Blog findByUserId(String name, User user);
    Blog findByCategory(String category);
}
