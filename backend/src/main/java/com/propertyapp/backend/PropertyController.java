package com.propertyapp.backend;

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
    public PropertyResponse getProperty(@RequestParam String address) {
        return propertyService.getProperty(address);
    }
}
