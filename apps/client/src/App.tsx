import AccommodationPage from "./pages/AccommodationPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to Itinavi 🧭</h1>} />
      <Route path="/accommodation" element={<AccommodationPage />} />
    </Routes>
  );
}
