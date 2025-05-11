import { Alert } from "@mui/material";

type ErrorMessageProps = {
  message?: string | null;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Alert severity="error" sx={{ mt: 1 }}>
      {message}
    </Alert>
  );
}
