package com.propertyapp.backend;

import java.util.List;

public record PropertyResponse(
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
