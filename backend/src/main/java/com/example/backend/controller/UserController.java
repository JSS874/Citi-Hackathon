package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow frontend access
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register new user
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            return "Error: Email already in use.";
        }

        // NOTE: For production, you MUST hash the password!
        // You can use BCryptPasswordEncoder (see below if needed)
        userRepository.save(user);
        return "User registered successfully.";
    }

    // Login user
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        Optional<User> found = userRepository.findByEmail(user.getEmail());
        if (found.isPresent() && found.get().getPassword().equals(user.getPassword())) {
            return "Login successful.";
        }
        return "Invalid email or password.";
    }
}
