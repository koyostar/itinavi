import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type Props = {
  id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function AccommodationActions({ id, onEdit, onDelete }: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton color="primary" onClick={() => onEdit(id)}>
        <Edit />
      </IconButton>
      <IconButton color="error" onClick={() => onDelete(id)}>
        <Delete />
      </IconButton>
    </Stack>
  );
}
