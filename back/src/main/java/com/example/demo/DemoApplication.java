package com.example.demo;

import com.example.demo.auth.AuthenticationService;
import com.example.demo.auth.RegisterRequest;
import com.example.demo.blog.BlogRequest;
import com.example.demo.blog.BlogService;
import com.example.demo.category.CategoryRequest;
import com.example.demo.category.CategoryService;
import com.example.demo.user.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
			CategoryService categoryService,
			BlogService blogService
	) {
		return args -> {
			var admin = RegisterRequest.builder()
					.email("admin@mail.com")
					.password("password")
					.role(Role.ADMIN)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			var user = RegisterRequest.builder()
					.email("user@mail.com")
					.password("password")
					.role(Role.USER)
					.build();
			System.out.println("User token: " + service.register(user).getAccessToken());

			var category = CategoryRequest.builder()
					.name("Food")
					.build();
			categoryService.create(category);


			var blog = BlogRequest.builder()
					.name("Pasta")
					.categoryId(1)
					.build();
			blogService.create(blog);
		};
	}

}
