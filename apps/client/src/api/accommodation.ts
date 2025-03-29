export type Accommodation = {
  id?: number;
  hotel: string;
  location: string;
  checkIn: string;
  checkOut: string;
  notes?: string;
};

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/accommodation`;

export async function createAccommodation(
  data: Accommodation
): Promise<Accommodation> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAllAccommodations(): Promise<Accommodation[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getOneAccommodation(id: number): Promise<Accommodation> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function deleteAccommodation(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function updateAccommodation(
  id: number,
  data: Partial<Accommodation>
): Promise<Accommodation> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
