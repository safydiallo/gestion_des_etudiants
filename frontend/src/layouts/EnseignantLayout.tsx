import { Link, Outlet } from "react-router-dom";

export default function EnseignantLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 250 }}>
        <h3>Enseignant</h3>
        <ul>
          <li><Link to="/enseignant/profil">Mon profil</Link></li>
          <li><Link to="/enseignant/matieres">Mes matières</Link></li>
          <li><Link to="/enseignant/saisie-notes">Saisie des notes</Link></li>
        </ul>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
