import { useState, useEffect } from "react";

const GEOJSON_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGeoJSON(): { geojson: any; loading: boolean; error: string | null } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geojson, setGeojson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setGeojson(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { geojson, loading, error };
}
