import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type Props = {
  id: number;
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function AccommodationActions({
  id,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Stack direction="row">
      <IconButton
        aria-label="edit"
        size="small"
        color="primary"
        loading={loading}
        onClick={() => onEdit(id)}
      >
        <Edit />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        color="error"
        loading={loading}
        onClick={() => onDelete(id)}
      >
        <Delete />
      </IconButton>
    </Stack>
  );
}
