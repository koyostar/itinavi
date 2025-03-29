import { Container, Divider, Typography } from "@mui/material";
import AccommodationList from "../components/AccommodationList";

export default function AccommodationPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Manage Your Accommodations
      </Typography>
      <Divider sx={{ my: 4 }} />

      <AccommodationList />
    </Container>
  );
}
