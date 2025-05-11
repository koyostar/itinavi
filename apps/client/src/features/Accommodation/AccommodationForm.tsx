import React, { useState } from "react";
import {
  Accommodation,
  useCreateAccommodationMutation,
} from "../../api/accommodation";
import { Button, Stack, TextField, Typography } from "@mui/material";
import PlacesAutocomplete from "../../components/PlacesAutocomplete";
import DatePickerField from "../../components/DatePickerField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrorMessage from "../../components/ErrorMessage";

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
  const [createAccommodation] = useCreateAccommodationMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isDateRangeInvalid =
    formData.checkIn &&
    formData.checkOut &&
    formData.checkIn >= formData.checkOut;

  const isFormValid =
    formData.hotel.trim() &&
    formData.location.trim() &&
    formData.checkIn &&
    formData.checkOut &&
    !isDateRangeInvalid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !formData.checkIn || !formData.checkOut) return;

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
            onSelect={({ name, address }) => {
              setFormData((prev) => ({
                ...prev,
                hotel: name,
                location: address,
              }));
            }}
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
          {isDateRangeInvalid && (
            <ErrorMessage message="Check-out date must be later than check-in date." />
          )}
          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={2}
          />

          {!isFormValid && (
            <Typography variant="caption" color="text.secondary" align="center">
              Please fill in all required fields.
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isFormValid}
          >
            Add
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
