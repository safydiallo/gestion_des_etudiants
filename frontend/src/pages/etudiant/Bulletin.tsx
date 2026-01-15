import { useEffect, useState } from "react";
import { noteService, Bulletin } from "../../services/note/noteService";
import { etudiantService } from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";
import { useMatieresMap } from "../../hooks/useMatieresMap";

export default function BulletinPage() {
  const { user } = useAuth();
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const { matieresMap, loading } = useMatieresMap();

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then((e) => noteService.getBulletin(e.id))
        .then(setBulletin);
    }
  }, [user]);

  if (!bulletin || loading) return <p>Chargement du bulletin…</p>;

  return (
    <div>
      <h2>Mon bulletin</h2>
      <div style={{ marginBottom: 10 }}>
        <strong>Moyenne générale :</strong>{" "}
        <span style={{ fontSize: 20 }}>{bulletin.moyenne}</span>
      </div>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Matière</th>
            <th>Type</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {bulletin.notes.map((n, i) => (
            <tr key={i}>
              <td>{matieresMap[n.matiereId]?.nom ?? `#${n.matiereId}`}</td>
              <td>{n.typeNote}</td>
              <td>{n.valeurNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
