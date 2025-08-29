
package com.example.stage2025.mapper;

import com.example.stage2025.dto.AddressDto;
import com.example.stage2025.entity.Address;

public class AddressMapper {

    public static AddressDto toDto(Address address) {
        return AddressDto.builder()
                .id(address.getId())
                .firstName(address.getFirstName())
                .lastName(address.getLastName())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .zipCode(address.getZipCode())
                .country(address.getCountry())
                .phone(address.getPhone())
                .label(address.getLabel())
                .defaultAddress(address.isDefaultAddress())
                .build();
    }

    public static Address toEntity(AddressDto dto) {
        return Address.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .street(dto.getStreet())
                .city(dto.getCity())
                .state(dto.getState())
                .zipCode(dto.getZipCode())
                .country(dto.getCountry())
                .phone(dto.getPhone())
                .label(dto.getLabel())
                .defaultAddress(dto.isDefaultAddress())
                .build();
    }
}
