import { useEffect, useState } from "react";
import { classeService, Matiere } from "../../services/classe/classeService";

export default function MatieresList() {
  const [matieres, setMatieres] = useState<Matiere[]>([]);

  useEffect(() => {
    classeService.getAllMatieres().then(setMatieres);
  }, []);

  return (
    <div>
      <h2>Matières</h2>
      <ul>
        {matieres.map(m => (
          <li key={m.id}>
            {m.nom} (Coef: {m.coefficient})
          </li>
        ))}
      </ul>
    </div>
  );
}
