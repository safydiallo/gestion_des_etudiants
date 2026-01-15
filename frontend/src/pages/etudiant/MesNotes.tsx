import { useEffect, useState } from "react";
import { noteService, Note } from "../../services/note/noteService";
import { etudiantService } from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";
import { useMatieresMap } from "../../hooks/useMatieresMap";

export default function MesNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const { matieresMap, loading: loadingMatieres } = useMatieresMap();

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then((e) => noteService.getNotesByEtudiant(e.id))
        .then((res) => setNotes(res))
        .finally(() => setLoadingNotes(false));
    }
  }, [user]);

  if (loadingNotes || loadingMatieres) return <p>Chargement des notes…</p>;
  if (notes.length === 0) return <p>Aucune note disponible.</p>;

  return (
    <div>
      <h2>Mes notes</h2>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Matière</th>
            <th>Type</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n) => (
            <tr key={n.idNote}>
              <td>{matieresMap[n.matiereId]?.nom ?? `#${n.matiereId}`}</td>
              <td><span style={{ padding: "2px 6px", border: "1px solid #ccc" }}>{n.typeNote}</span></td>
              <td><strong>{n.valeurNote}</strong></td>
              <td>{new Date(n.dateSaisie).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
