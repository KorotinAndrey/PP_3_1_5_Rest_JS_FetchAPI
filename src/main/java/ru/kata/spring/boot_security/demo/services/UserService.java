package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    User findUserById(long id);

    List<User> allUsers();

    void addUser(User user);

    void updateUser(User user);

    void deleteUser(Long id);

    User getUserByUsername(String username);
}
