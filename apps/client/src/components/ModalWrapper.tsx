import { Box, Modal } from "@mui/material";

type ModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number | string;
};

export default function ModalWrapper({
  open,
  onClose,
  children,
  maxWidth = 500,
}: ModalWrapperProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth,
          mx: "auto",
          mt: "10vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
