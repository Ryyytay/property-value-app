package com.propertyapp.backend;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropertyService {

    public PropertyResponse getProperty(String address) {
        List<NearbySale> nearbySales = List.of(
            new NearbySale("125 Example St",  1180000, "2025-11-20", 3, 0.1, -33.8695, 151.2100),
            new NearbySale("89 Sample Rd",    1350000, "2025-09-05", 4, 0.3, -33.8710, 151.2080),
            new NearbySale("42 Test Ave",     1100000, "2025-07-18", 2, 0.4, -33.8670, 151.2110),
            new NearbySale("7 Mock Cres",     1420000, "2025-05-02", 4, 0.6, -33.8650, 151.2060),
            new NearbySale("300 Fake Blvd",   995000,  "2025-02-14", 2, 0.8, -33.8720, 151.2140)
        );

        long estimatedValue = calculateEstimate(nearbySales, 3);

        return new PropertyResponse(
            address,
            estimatedValue,
            3, 2, 1, 450,
            "House",
            980000,
            "2021-03-15",
            -33.8688,
            151.2093,
            nearbySales
        );
    }

    private long calculateEstimate(List<NearbySale> sales, int bedrooms) {
        double avgPrice = sales.stream()
            .mapToLong(NearbySale::soldPrice)
            .average()
            .orElse(0);

        double avgBeds = sales.stream()
            .mapToInt(NearbySale::bedrooms)
            .average()
            .orElse(bedrooms);

        int bedDiff = bedrooms - (int) Math.round(avgBeds);
        return Math.round(avgPrice * (1 + bedDiff * 0.05));
    }
}
