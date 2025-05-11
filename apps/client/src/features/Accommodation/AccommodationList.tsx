import {
  useDeleteAccommodationMutation,
  useGetAccommodationsQuery,
} from "../../api/accommodation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import AccommodationActions from "./AccommodationActions";
import { formatDateCell } from "../../utils/dateUtils";

export default function AccommodationList() {
  const { data: accommodations, isLoading } = useGetAccommodationsQuery();
  const [deleteAccommodation] = useDeleteAccommodationMutation();

  const handleEdit = (id: number) => {
    console.log("Edit ID:", id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this accommodation?")) return;
    await deleteAccommodation(id);
  };

  const renderActionCell = (params: any) => {
    const id = params.row.id;
    return (
      <AccommodationActions
        id={id}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  };

  const rows = accommodations ?? [];

  const columns: GridColDef[] = [
    {
      field: "hotel",
      headerName: "Hotel",
      cellClassName: "cellStyle",
      flex: 2,
    },
    {
      field: "location",
      headerName: "Location",
      cellClassName: "cellStyle",
      flex: 2,
    },
    {
      field: "checkIn",
      headerName: "Check-in",
      cellClassName: "cellStyle",
      flex: 1,
      renderCell: formatDateCell,
    },
    {
      field: "checkOut",
      headerName: "Check-out",
      cellClassName: "cellStyle",
      flex: 1,
      renderCell: formatDateCell,
    },
    {
      field: "notes",
      headerName: "Notes",
      cellClassName: "cellStyle",
      flex: 1.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      cellClassName: "cellStyle",
      width: 80,
      sortable: false,
      renderCell: renderActionCell,
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        mx: "auto",
        mt: 4,
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Saved Accommodations
      </Typography>
      <DataGrid
        rows={rows}
        loading={isLoading}
        columns={columns}
        getRowId={(row) => row.id!}
        getRowHeight={() => "auto"}
        sx={{
          "& .cellStyle": {
            paddingY: 1,
          },
        }}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
      />
    </Paper>
  );
}
