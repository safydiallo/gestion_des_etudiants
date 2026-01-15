import { useEffect, useState } from "react";
import { classeService, EtudiantClasseDTO } from "../../services/classe/classeService";

export default function ClasseEtudiants({ classeId }: { classeId: number }) {
  const [etudiants, setEtudiants] = useState<EtudiantClasseDTO[]>([]);

  useEffect(() => {
    classeService.getEtudiantsByClasseId(classeId).then(setEtudiants);
  }, [classeId]);

  return (
    <div>
      <h3>Étudiants de la classe</h3>
      <ul>
        {etudiants.map(e => (
          <li key={e.id}>
            {e.nom} {e.prenom} ({e.matricule})
          </li>
        ))}
      </ul>
    </div>
  );
}
