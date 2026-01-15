import { Routes, Route, Navigate } from "react-router-dom";
import RoleRoute from "./RoleRoute";
import { PublicRoute } from "./PublicRoute";
import { useAuth } from "../hooks/useAuth";

/* Auth pages */
import Login from "../pages/auth/Login";

/* Layouts */
import AdminLayout from "../layouts/AdminLayout";
import EnseignantLayout from "../layouts/EnseignantLayout";
import EtudiantLayout from "../layouts/EtudiantLayout";

/* Admin pages */
import EtudiantsList from "../pages/admin/EtudiantsList";
import EnseignantsList from "../pages/admin/EnseignantsList";
import ClassesList from "../pages/admin/ClassesList";
import MatieresList from "../pages/admin/MatieresList";
import EnseignantForm from "../pages/admin/EnseignantForm";

/* Enseignant pages */
import ProfilEnseignant from "../pages/enseignant/ProfilEnseignant";
import MesMatieres from "../pages/enseignant/MesMatieres";
import SaisieNotes from "../pages/enseignant/SaisieNotes";

/* Étudiant pages */
import ProfilEtudiant from "../pages/etudiant/ProfilEtudiant";
import MesNotes from "../pages/etudiant/MesNotes";
import Bulletin from "../pages/etudiant/Bulletin";

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    if (!isAuthenticated || !user) return "/login";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "ENSEIGNANT") return "/enseignant";
    if (user.role === "ETUDIANT") return "/etudiant";
    return "/login";
  };

  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="etudiants" replace />} />
          <Route path="etudiants" element={<EtudiantsList />} />
          <Route path="enseignants" element={<EnseignantsList />} />
          <Route path="classes" element={<ClassesList />} />
          <Route path="matieres" element={<MatieresList />} />
          <Route path="enseignant/new" element={<EnseignantForm />} />
        </Route>
      </Route>

      {/* ===== ENSEIGNANT ===== */}
      <Route element={<RoleRoute allowedRoles={["ENSEIGNANT"]} />}>
        <Route path="/enseignant" element={<EnseignantLayout />}>
          <Route index element={<Navigate to="profil" replace />} />
          <Route path="profil" element={<ProfilEnseignant />} />
          <Route path="matieres" element={<MesMatieres />} />
          <Route path="saisie-notes" element={<SaisieNotes classeId={1} />} />
        </Route>
      </Route>

      {/* ===== ETUDIANT ===== */}
      <Route element={<RoleRoute allowedRoles={["ETUDIANT"]} />}>
        <Route path="/etudiant" element={<EtudiantLayout />}>
          <Route index element={<Navigate to="profil" replace />} />
          <Route path="profil" element={<ProfilEtudiant />} />
          <Route path="notes" element={<MesNotes />} />
          <Route path="bulletin" element={<Bulletin />} />
        </Route>
      </Route>

      {/* Root path redirection */}
      <Route path="/" element={<Navigate to={getDashboardPath()} replace />} />

      {/* Fallback & Error routes */}
      <Route path="/unauthorized" element={<p className="p-4 text-red-600">Accès non autorisé</p>} />
      <Route path="*" element={<p>Page introuvable</p>} />

    </Routes>
  );
}
