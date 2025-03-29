import React, { useState } from "react";
import { Accommodation, createAccommodation } from "../api/accommodation";
import { Button, Stack, TextField, Typography } from "@mui/material";
import PlacesAutocomplete from "./PlacesAutocomplete";
import DatePickerField from "./DatePickerField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type AccommodationFormProps = {
  onSubmitComplete?: () => void;
};

const initialForm: Omit<Accommodation, "checkIn" | "checkOut"> & {
  checkIn: Date | null;
  checkOut: Date | null;
} = { hotel: "", location: "", checkIn: null, checkOut: null, notes: "" };

export default function AccommodationForm({
  onSubmitComplete,
}: AccommodationFormProps) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut) return;

    await createAccommodation({
      ...formData,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
    });
    setFormData(initialForm);
    onSubmitComplete?.();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h6" mb={2}>
        Add New Accommodation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <PlacesAutocomplete
            label="Hotel"
            onSelect={({ name, address }) =>
              setFormData((prev) => ({
                ...prev,
                hotel: name,
                location: address,
              }))
            }
          />
          <TextField label="Location" value={formData.location} disabled />

          <DatePickerField
            label="Check-In"
            value={formData.checkIn}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, checkIn: val }))
            }
          />
          <DatePickerField
            label="Check-Out"
            value={formData.checkOut}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, checkOut: val }))
            }
          />
          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={2}
          />
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
