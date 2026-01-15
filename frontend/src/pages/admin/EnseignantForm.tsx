import { useState } from "react";
import { enseignantService } from "../../services/enseignant/enseignantService";

export default function EnseignantForm() {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();
    await enseignantService.create(form);
    alert("Enseignant créé");
  };

  return (
    <form onSubmit={submit}>
      <h2>Créer enseignant</h2>

      <input name="matriculeEns" placeholder="Matricule" onChange={handleChange} />
      <input name="nom" placeholder="Nom" onChange={handleChange} />
      <input name="prenom" placeholder="Prénom" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="specialite" placeholder="Spécialité" onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />

      <button type="submit">Créer</button>
    </form>
  );
}
