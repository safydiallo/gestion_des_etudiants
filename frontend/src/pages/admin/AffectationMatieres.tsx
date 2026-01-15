import { useEffect, useState } from "react";
import { enseignantService } from "../../services/enseignant/enseignantService";
import { classeService, Matiere } from "../../services/classe/classeService";

export default function AffectationMatieres({ enseignantId }: { enseignantId: number }) {
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    classeService.getAllMatieres().then(setMatieres);
  }, []);

  const toggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const submit = async () => {
    await enseignantService.affectMatieres(enseignantId, { matiereIds: selected });
    alert("Matières affectées");
  };

  return (
    <div>
      <h3>Affecter matières</h3>

      {matieres.map(m => (
        <div key={m.id}>
          <input
            type="checkbox"
            onChange={() => toggle(m.id!)}
          />
          {m.nom}
        </div>
      ))}

      <button onClick={submit}>Valider</button>
    </div>
  );
}
