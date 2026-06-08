package com.propertyapp.backend;

public record NearbySale(
    String address,
    long soldPrice,
    String soldDate,
    int bedrooms,
    double distanceKm,
    double lat,
    double lng
) {}
