import { Outlet } from "react-router-dom";

export default function EtudiantLayout() {
  return (
    <div>
      <h1>Étudiant Dashboard</h1>
      <Outlet />
    </div>
  );
}
