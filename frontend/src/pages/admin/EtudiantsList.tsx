import { useEffect, useState } from "react";
import { etudiantService, Etudiant } from "../../services/etudiant/etudiantService";

export default function EtudiantsList() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);

  useEffect(() => {
    etudiantService.getAllEtudiants().then(setEtudiants);
  }, []);

  return (
    <div>
      <h2>Liste des étudiants</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.matricule}</td>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
