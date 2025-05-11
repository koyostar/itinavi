import { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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

export default function PlacesAutocomplete({
  label,
  onSelect,
}: PlacesAutocompleteProps) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [sessionToken, setSessionToken] = useState<any | null>(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (!input) {
      setOptions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const { AutocompleteSuggestion, AutocompleteSessionToken } =
          (await google.maps.importLibrary(
            "places"
          )) as google.maps.PlacesLibrary;

        // Create a session token if not already created
        const token = sessionToken ?? new AutocompleteSessionToken();
        setSessionToken(token);

        const result =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken: token,
            language,
          });

        setOptions(result.suggestions || []);
      } catch (err) {
        console.error("Failed to fetch autocomplete suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [input]);

  const handleSelect = async (_: any, selected: any | null) => {
    if (!selected) return;

    const place = selected.placePrediction.toPlace();

    await place.fetchFields({
      fields: ["displayName", "formattedAddress"],
    });

    const name = place.displayName ?? "";
    const address = place.formattedAddress ?? "";

    onSelect({ name, address });
    setInput(name);
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
    <Stack direction="row" spacing={2} alignItems="center">
      <Box flex={1}>
        <Autocomplete
          freeSolo
          options={options}
          getOptionLabel={(option) => option.placePrediction.text?.text || ""}
          isOptionEqualToValue={(a, b) =>
            a.placePrediction.placeId === b.placePrediction.placeId
          }
          onChange={handleSelect}
          inputValue={input}
          onInputChange={(_, newInput) => setInput(newInput)}
          renderInput={renderInputField}
        />
      </Box>

      <FormControl size="small" sx={{ width: 100 }}>
        <InputLabel>Language</InputLabel>
        <Select
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="en">Eng</MenuItem>
          <MenuItem value="zh">中</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
