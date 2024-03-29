package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Collection;

@Service
public interface RoleService {
    Collection<Role> allRoles();
}