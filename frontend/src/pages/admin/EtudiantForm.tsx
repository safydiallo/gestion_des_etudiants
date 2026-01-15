import { useState } from "react";
import { etudiantService } from "../../services/etudiant/etudiantService";

export default function EtudiantForm() {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();
    await etudiantService.creerEtudiant(form);
    alert("Étudiant créé");
  };

  return (
    <form onSubmit={submit}>
      <h2>Créer étudiant</h2>

      <input name="matricule" placeholder="Matricule" onChange={handleChange} />
      <input name="nom" placeholder="Nom" onChange={handleChange} />
      <input name="prenom" placeholder="Prénom" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Mot de passe" type="password" onChange={handleChange} />

      <button type="submit">Créer</button>
    </form>
  );
}
