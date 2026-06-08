package com.propertyapp.backend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    record NearbySale(
        String address,
        long soldPrice,
        String soldDate,
        int bedrooms,
        double distanceKm,
        double lat,
        double lng
    ) {}

    record PropertyResponse(
        String address,
        long estimatedValue,
        int bedrooms,
        int bathrooms,
        int carSpaces,
        int landSize,
        String propertyType,
        long lastSoldPrice,
        String lastSoldDate,
        double lat,
        double lng,
        List<NearbySale> nearbySales
    ) {}

    @GetMapping("/property")
    public PropertyResponse getProperty(@RequestParam String address) {
        return new PropertyResponse(
            address,
            1250000,
            3, 2, 1, 450,
            "House",
            980000,
            "2021-03-15",
            -33.8688,
            151.2093,
            List.of(
                new NearbySale("125 Example St",  1180000, "2025-11-20", 3, 0.1, -33.8695, 151.2100),
                new NearbySale("89 Sample Rd",    1350000, "2025-09-05", 4, 0.3, -33.8710, 151.2080),
                new NearbySale("42 Test Ave",     1100000, "2025-07-18", 2, 0.4, -33.8670, 151.2110),
                new NearbySale("7 Mock Cres",     1420000, "2025-05-02", 4, 0.6, -33.8650, 151.2060),
                new NearbySale("300 Fake Blvd",   995000,  "2025-02-14", 2, 0.8, -33.8720, 151.2140)
            )
        );
    }
}
