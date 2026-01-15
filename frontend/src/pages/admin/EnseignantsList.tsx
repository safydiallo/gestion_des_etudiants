import { useEffect, useState } from "react";
import { enseignantService, Enseignant } from "../../services/enseignant/enseignantService";

export default function EnseignantsList() {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);

  useEffect(() => {
    enseignantService.getAll().then(setEnseignants);
  }, []);

  return (
    <div>
      <h2>Liste des enseignants</h2>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Spécialité</th>
          </tr>
        </thead>
        <tbody>
          {enseignants.map(e => (
            <tr key={e.idEnseignant}>
              <td>{e.idEnseignant}</td>
              <td>{e.matriculeEns}</td>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>{e.specialite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
