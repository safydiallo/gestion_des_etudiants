import { useEffect, useState } from "react";
import { etudiantService, Etudiant } from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilEtudiant() {
  const { user } = useAuth();
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then(setEtudiant);
    }
  }, [user]);

  if (!etudiant) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mon Profil</h2>
      <p>Nom : {etudiant.nom}</p>
      <p>Prénom : {etudiant.prenom}</p>
      <p>Email : {etudiant.email}</p>
      <p>Matricule : {etudiant.matricule}</p>
    </div>
  );
}
    