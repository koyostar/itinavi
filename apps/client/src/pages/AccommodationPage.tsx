import { Button, Container, Divider, Typography } from "@mui/material";
import AccommodationList from "../features/Accommodation/AccommodationList";
import AccommodationForm from "../features/Accommodation/AccommodationForm";
import { useState } from "react";
import GoogleMapsProvider from "../components/GoogleMapsProvider";
import ModalWrapper from "../components/ModalWrapper";

export default function AccommodationPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Manage Your Accommodations
      </Typography>
      <GoogleMapsProvider>
        <Button variant="contained" onClick={handleOpen}>
          + Add New Accommodation
        </Button>
        <ModalWrapper open={open} onClose={handleClose}>
          <AccommodationForm onSubmitComplete={handleClose} />
        </ModalWrapper>
        <Divider sx={{ my: 4 }} />
        <AccommodationList />{" "}
      </GoogleMapsProvider>
    </Container>
  );
}
