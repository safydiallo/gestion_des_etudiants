import { useState } from "react";
import { classeService } from "../../services/classe/classeService";

export default function ClasseForm() {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();
    await classeService.createClasse(form);
    alert("Classe créée");
  };

  return (
    <form onSubmit={submit}>
      <h2>Créer une classe</h2>

      <input name="nom" placeholder="Nom" onChange={handleChange} />
      <input name="niveau" placeholder="Niveau" onChange={handleChange} />
      <input name="annee" placeholder="Année" onChange={handleChange} />

      <button type="submit">Créer</button>
    </form>
  );
}
