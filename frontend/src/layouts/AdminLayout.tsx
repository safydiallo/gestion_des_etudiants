import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 250 }}>
        <h3>Admin</h3>
        <ul>
          <li><Link to="/admin/etudiants">Étudiants</Link></li>
          <li><Link to="/admin/enseignants">Enseignants</Link></li>
          <li><Link to="/admin/classes">Classes</Link></li>
          <li><Link to="/admin/matieres">Matières</Link></li>
        </ul>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
