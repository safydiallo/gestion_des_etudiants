import { useEffect, useState } from "react";
import { classeService, Matiere } from "../services/classe/classeService";

export function useMatieresMap() {
  const [map, setMap] = useState<Record<number, Matiere>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    classeService.getAllMatieres().then((list) => {
      const m: Record<number, Matiere> = {};
      list.forEach((x) => (m[x.id!] = x));
      setMap(m);
      setLoading(false);
    });
  }, []);

  return { matieresMap: map, loading };
}
