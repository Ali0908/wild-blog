package com.example.demo.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = """
            select c from Category c
            where c.name = :name
            """)
    List<Category> findCategoryByName(@Param("name") String name);



}
