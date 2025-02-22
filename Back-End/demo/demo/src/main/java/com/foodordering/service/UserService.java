package com.foodordering.service;

import com.foodordering.model.User; // Correctly importing your custom User entity

public interface UserService {

   
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
