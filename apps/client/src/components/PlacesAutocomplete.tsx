import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";

type PlaceDetails = {
  name: string;
  address: string;
};

type PlacesAutocompleteProps = {
  label: string;
  onSelect: (details: PlaceDetails) => void;
};

type Prediction = google.maps.places.AutocompletePrediction;

export default function PlacesAutocomplete({
  label,
  onSelect,
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState<Prediction[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (
      !inputRef.current ||
      !window.google?.maps?.places?.AutocompleteService
    ) {
      console.warn("Google Maps AutocompleteService API not ready");

      return;
    }
    const service = new google.maps.places.AutocompleteService();

    if (!input) {
      setOptions([]);
      return;
    }

    service.getPlacePredictions({ input }, (predictions) => {
      if (predictions) setOptions(predictions);
    });
  }, [input]);

  const handleSelect = (
    _: SyntheticEvent,
    value: string | Prediction | null
  ) => {
    if (!value || typeof value === "string") return;

    const placeService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    placeService.getDetails(
      { placeId: value.place_id, fields: ["name", "formatted_address"] },
      (place) => {
        if (place && place.name && place.formatted_address) {
          onSelect({ name: place.name, address: place.formatted_address });
          setInput(place.name);
        }
      }
    );
  };

  const renderInputField = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label={label}
      required
      fullWidth
      slotProps={{
        inputLabel: { shrink: true },
      }}
    />
  );

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      isOptionEqualToValue={(option, value) =>
        typeof option !== "string" &&
        typeof value !== "string" &&
        option.place_id === value.place_id
      }
      onChange={handleSelect}
      inputValue={input}
      onInputChange={(_, newVal) => setInput(newVal)}
      renderInput={renderInputField}
    />
  );
}
