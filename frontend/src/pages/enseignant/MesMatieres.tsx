import { useEffect, useState } from "react";
import { enseignantService, MatiereDto } from "../../services/enseignant/enseignantService";
import { useAuth } from "../../hooks/useAuth";

export default function MesMatieres() {
  const { user } = useAuth();
  const [matieres, setMatieres] = useState<MatiereDto[]>([]);

  useEffect(() => {
    if (user?.username) {
      enseignantService.getAll()
        .then(list => list.find(e => e.matriculeEns === user.username))
        .then(e => e && enseignantService.getDetails(e.idEnseignant))
        .then(details => details && setMatieres(details.matieres));
    }
  }, [user]);

  return (
    <div>
      <h2>Mes matières</h2>
      <ul>
        {matieres.map(m => (
          <li key={m.id}>
            {m.nom} (Coef {m.coefficient})
          </li>
        ))}
      </ul>
    </div>
  );
}
