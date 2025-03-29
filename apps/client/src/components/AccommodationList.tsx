import { useEffect, useState } from "react";
import {
  Accommodation,
  deleteAccommodation,
  getAllAccommodations,
} from "../api/accommodation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import AccommodationActions from "./AccommodationActions";

export default function AccommodationList() {
  const [rows, setRows] = useState<Accommodation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAccommodations();
      setRows(data);
    }
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    console.log("Edit ID:", id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this accommodation?")) return;
    await deleteAccommodation(id);
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const renderActionCell = (params: any) => {
    const id = params.row.id;
    return (
      <AccommodationActions
        id={id}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  };

  const columns: GridColDef[] = [
    { field: "hotel", headerName: "Hotel", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "checkIn", headerName: "Check-in Date", type: "date", flex: 1 },
    { field: "checkOut", headerName: "Check-out Date", type: "date", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: renderActionCell,
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        height: 420,
        width: "100%",
        maxWidth: 900,
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
        columns={columns}
        getRowId={(row) => row.id!}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
      />
    </Paper>
  );
}
