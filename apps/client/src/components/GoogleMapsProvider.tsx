import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

type GoogleMapsProviderProps = {
  children: React.ReactNode;
};

export default function GoogleMapsProvider({
  children,
}: GoogleMapsProviderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existing) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);
  if (!loaded) return <CircularProgress />;
  return <>{children}</>;
}
