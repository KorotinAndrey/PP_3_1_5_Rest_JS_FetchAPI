package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;

@Controller
public class ViewController {

    @GetMapping("/")
    public String login() {
        return "redirect:/login";
    }

    @GetMapping("/user")
    public String userView(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);
        return "user";
    }

    @GetMapping("/admin")
    public String adminView(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User admin = (User) authentication.getPrincipal();
        model.addAttribute("admin", admin);
        return "admin";
    }
}
