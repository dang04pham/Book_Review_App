package com.bookrev.demo.service;

import com.bookrev.demo.dto.UserDto;
import com.bookrev.demo.model.User;

import java.util.List;

public interface UserService {
    void updateUserRole(Long userId, String roleName);
    UserDto getUserById(Long id);
    List<User> getAllUsers();
    User findByUsername(String username);
}
