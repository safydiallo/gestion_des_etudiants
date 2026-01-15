import { useState } from "react";
import { classeService } from "../../services/classe/classeService";

export default function MatiereForm() {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();
    await classeService.createMatiere({
      nom: form.nom,
      coefficient: Number(form.coefficient),
    });
    alert("Matière créée");
  };

  return (
    <form onSubmit={submit}>
      <h2>Créer matière</h2>

      <input name="nom" placeholder="Nom" onChange={handleChange} />
      <input
        name="coefficient"
        type="number"
        placeholder="Coefficient"
        onChange={handleChange}
      />

      <button type="submit">Créer</button>
    </form>
  );
}
