package com.foodordering.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodordering.config.JwtProvider;
import com.foodordering.model.User; // Correctly importing your custom User entity
import com.foodordering.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailfromJwtToken(jwt); // Extract email from the JWT
        User user=findUserByEmail(email);
        return user; // Use the email to fetch user
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email); // Query the repository for the user
        if (user == null) {
            throw new Exception("User not found with email: " + email);
        }
        return user;
    }
}
