import { useEffect, useState } from "react";
import { enseignantService, EnseignantDetails } from "../../services/enseignant/enseignantService";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilEnseignant() {
  const { user } = useAuth();
  const [profil, setProfil] = useState<EnseignantDetails | null>(null);

  useEffect(() => {
    if (user?.username) {
      // Hypothèse : username = matriculeEns
      enseignantService.getAll()
        .then(list => list.find(e => e.matriculeEns === user.username))
        .then(e => e && enseignantService.getDetails(e.idEnseignant))
        .then(setProfil);
    }
  }, [user]);

  if (!profil) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mon Profil</h2>
      <p>Nom : {profil.nom}</p>
      <p>Prénom : {profil.prenom}</p>
      <p>Spécialité : {profil.specialite}</p>
    </div>
  );
}
