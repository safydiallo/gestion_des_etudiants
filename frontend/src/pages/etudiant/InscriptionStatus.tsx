import { useEffect, useState } from "react";
import { etudiantService, InscriptionStatus } from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";

export default function InscriptionStatusPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<InscriptionStatus | null>(null);

  useEffect(() => {
    if (user?.username) {
      // Ici on suppose username = matricule → à adapter si besoin
      etudiantService.getEtudiantByMatricule(user.username)
        .then(e => etudiantService.getInscriptionStatus(e.id))
        .then(setStatus);
    }
  }, [user]);

  if (!status) return <p>Aucune inscription</p>;

  return (
    <div>
      <h2>Statut d'inscription</h2>
      <p>Statut : {status.statut}</p>
      <p>Classe : {status.classeNom}</p>
    </div>
  );
}

