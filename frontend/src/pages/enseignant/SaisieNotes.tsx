import { useEffect, useState } from "react";
import { noteService } from "../../services/note/noteService";
import { classeService, EtudiantClasseDTO, Matiere } from "../../services/classe/classeService";

interface Props {
  classeId: number;
}

export default function SaisieNotes({ classeId }: Props) {
  const [etudiants, setEtudiants] = useState<EtudiantClasseDTO[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [matiereId, setMatiereId] = useState<number | null>(null);
  const [typeNote, setTypeNote] = useState("EXAM");
  const [notes, setNotes] = useState<Record<number, number>>({});

  useEffect(() => {
    classeService.getEtudiantsByClasseId(classeId).then(setEtudiants);
    classeService.getAllMatieres().then(setMatieres);
  }, [classeId]);

  if (etudiants.length === 0) return <p>Aucun étudiant dans cette classe.</p>;
  if (matieres.length === 0) return <p>Aucune matière disponible.</p>;

  const submit = async () => {
    if (!matiereId) {
      alert("Veuillez choisir une matière");
      return;
    }

    for (const etu of etudiants) {
      const valeur = notes[etu.id];
      if (valeur !== undefined) {
        await noteService.createNote({
          etudiantId: etu.id,
          matiereId,
          typeNote,
          valeurNote: valeur,
        });
      }
    }

    alert("Notes enregistrées avec succès");
  };

  return (
    <div>
      <h2>Saisie des notes</h2>

      <select onChange={(e) => setMatiereId(Number(e.target.value))}>
        <option value="">-- Sélectionner une matière --</option>
        {matieres.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nom}
          </option>
        ))}
      </select>

      <select onChange={(e) => setTypeNote(e.target.value)}>
        <option value="EXAM">Examen</option>
        <option value="DS">DS</option>
        <option value="TP">TP</option>
      </select>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((e) => (
            <tr key={e.id}>
              <td>
                {e.nom} {e.prenom}
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={20}
                  onChange={(ev) =>
                    setNotes({
                      ...notes,
                      [e.id]: Number(ev.target.value),
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={submit}>Valider</button>
    </div>
  );
}
