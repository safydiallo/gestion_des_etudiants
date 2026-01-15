import { useEffect, useState } from "react";
import {
  etudiantService,
  Etudiant,
} from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";
import {
  FiUser,
  FiMail,
  FiHash,
  FiHome,
  FiArrowRight,
  FiAward,
} from "react-icons/fi";

export default function ProfilEtudiant() {
  const { user } = useAuth();
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then(setEtudiant)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiUser size={48} className="text-emerald-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement de votre profil...
          </p>
        </div>
      </div>
    );
  }

  if (!etudiant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <FiUser size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-600">
            Profil non trouvé
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Étudiant</span>
          <FiArrowRight size={16} />
          <span className="text-emerald-600 font-semibold">Mon Profil</span>
        </div>

        {/* Hero Header Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 sm:p-12 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="w-28 h-28 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl flex-shrink-0">
                <FiUser size={56} className="text-white" />
              </div>

              {/* Header Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                  {etudiant.prenom} {etudiant.nom}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-100">
                  <FiAward size={20} />
                  <span className="text-lg font-semibold">Étudiant Actif</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <FiUser size={28} className="text-emerald-600" />
                Informations Personnelles
              </h2>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom */}
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser size={16} className="text-emerald-600" />
                    <label className="text-xs font-bold text-gray-600 uppercase">
                      Nom
                    </label>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {etudiant.nom}
                  </p>
                </div>

                {/* Prénom */}
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser size={16} className="text-emerald-600" />
                    <label className="text-xs font-bold text-gray-600 uppercase">
                      Prénom
                    </label>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {etudiant.prenom}
                  </p>
                </div>

                {/* Email */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-md transition md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMail size={16} className="text-blue-600" />
                    <label className="text-xs font-bold text-gray-600 uppercase">
                      Email
                    </label>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {etudiant.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-emerald-500 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Identifiant
            </h3>
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FiHash size={20} />
                <label className="text-xs font-bold uppercase opacity-90">
                  Matricule
                </label>
              </div>
              <p className="text-3xl font-bold font-mono">
                {etudiant.matricule}
              </p>
            </div>

            {/* Classe Info if available */}
            {etudiant.classe && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward size={16} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-600 uppercase">
                    Classe
                  </label>
                </div>
                <p className="text-lg font-bold text-indigo-600">
                  {etudiant.classe.code || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
