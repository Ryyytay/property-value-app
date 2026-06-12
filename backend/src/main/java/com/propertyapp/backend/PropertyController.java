package com.propertyapp.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/property")
    public ResponseEntity<?> getProperty(@RequestParam String address) {
        if (address == null || address.isBlank()) {
            return ResponseEntity.badRequest().body("Address must not be empty");
        }
        return ResponseEntity.ok(propertyService.getProperty(address));
    }
}
