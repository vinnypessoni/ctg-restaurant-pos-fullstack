package com.restaurantpos.controller;

import com.restaurantpos.model.LoginRequest;
import com.restaurantpos.model.LoginResponse;
import com.restaurantpos.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for user: {}", loginRequest.getUsername());

        try {
            String token = authenticationService.authenticate(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            );
            logger.info("Login successful for user: {}", loginRequest.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        } catch (IllegalArgumentException e) {
            logger.error("Login failed for user: {}", loginRequest.getUsername());
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid credentials"));
        } catch (Exception e) {
            logger.error("Unexpected error during login", e);
            return ResponseEntity.internalServerError().body(new ErrorResponse("An unexpected error occurred"));
        }
    }
}

class ErrorResponse {
    private String message;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

