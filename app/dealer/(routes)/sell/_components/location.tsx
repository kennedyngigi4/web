"use client"

import React, { useState } from 'react';
import { Controller, useFormContext} from "react-hook-form";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';


type Props = {
    onSelect: (address: string) => void;
};

const LocationField = ({ onSelect }: Props) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "ke" }, // restrict to Kenya
        },
        debounce: 300,
    });

    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (suggestion: any) => {
        const placesService = new google.maps.places.PlacesService(
            document.createElement("div")
        );

        placesService.getDetails(
            {
                placeId: suggestion.place_id,
                fields: ["geometry", "address_components", "formatted_address"],
            },
            (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    const lat = place.geometry?.location?.lat() ?? 0;
                    const lng = place.geometry?.location?.lng() ?? 0;

                    let baseAddress = place.formatted_address || "";

                    // Extract county
                    let county = "";
                    if (place.address_components) {
                        const countyComp =
                            place.address_components.find((comp) =>
                                comp.types.includes("administrative_area_level_2")
                            ) ||
                            place.address_components.find((comp) =>
                                comp.types.includes("administrative_area_level_1")
                            );

                        county = countyComp ? countyComp.long_name : "";
                    }

                    // Always ensure it ends with "Kenya"
                    if (!baseAddress.includes("Kenya")) {
                        baseAddress = `${baseAddress}, Kenya`;
                    }

                    // Clean duplicate Kenya
                    baseAddress = baseAddress.replace(/,?\s*Kenya\s*$/, "");

                    // Clean duplicate county if already inside baseAddress
                    if (county && !baseAddress.includes(county)) {
                        baseAddress = `${baseAddress}, ${county}`;
                    }

                    // Add Kenya at the end
                    const fullAddress = `${baseAddress}, Kenya`;

                    setValue(fullAddress, false);
                    clearSuggestions();

                    onSelect(fullAddress);
                }
            }
        );
    };

    
    return (
        <div className="relative">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Enter location in Kenya"
                className="w-full bg-white"
            />
            {status === "OK" && (
                <ul className="absolute bg-white border w-full rounded shadow mt-1 z-10">
                    {data.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LocationField