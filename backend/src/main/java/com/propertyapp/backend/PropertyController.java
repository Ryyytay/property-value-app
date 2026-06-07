package com.propertyapp.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    @GetMapping("/property")
    public PropertyResponse getProperty(@RequestParam String address) {
        return new PropertyResponse(
            address,
            1250000,
            3,
            2,
            1,
            450,
            "House",
            980000,
            "2021-03-15"
        );
    }

    record PropertyResponse(
        String address,
        long estimatedValue,
        int bedrooms,
        int bathrooms,
        int carSpaces,
        int landSize,
        String propertyType,
        long lastSoldPrice,
        String lastSoldDate
    ) {}
}
