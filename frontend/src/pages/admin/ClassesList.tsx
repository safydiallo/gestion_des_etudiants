import { useEffect, useState } from "react";
import { classeService, Classe } from "../../services/classe/classeService";

export default function ClassesList() {
  const [classes, setClasses] = useState<Classe[]>([]);

  useEffect(() => {
    classeService.getAllClasses().then(setClasses);
  }, []);

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {classes.map(c => (
          <li key={c.id}>
            {c.nom} – {c.niveau} – {c.annee}
          </li>
        ))}
      </ul>
    </div>
  );
}
