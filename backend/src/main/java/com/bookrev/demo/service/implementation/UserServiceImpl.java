package com.bookrev.demo.service.implementation;

import com.bookrev.demo.dto.UserDto;
import com.bookrev.demo.model.Role;
import com.bookrev.demo.model.RoleName;
import com.bookrev.demo.model.User;
import com.bookrev.demo.repository.RoleRepository;
import com.bookrev.demo.repository.UserRepository;
import com.bookrev.demo.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void updateUserRole(Long userId, String roleName) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        RoleName role = RoleName.valueOf(roleName);

        user.setRole(roleRepository.findByRoleName(role).orElseThrow(() -> new RuntimeException("Role not found with name: " + roleName)));
        userRepository.save(user);
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUserName(username).orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }
}
