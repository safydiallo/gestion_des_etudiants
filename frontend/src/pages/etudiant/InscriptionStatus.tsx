import { useEffect, useState } from "react";
import {
  etudiantService,
  InscriptionStatus,
} from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";
import {
  FiCheckCircle,
  FiXCircle,
  FiHome,
  FiArrowRight,
  FiBook,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";

export default function InscriptionStatusPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<InscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then((e) => etudiantService.getInscriptionStatus(e.id))
        .then(setStatus)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiCalendar size={48} className="text-indigo-600" />
          </div>
          <p className="text-gray-600 font-semibold">Chargement du statut...</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
            <FiHome size={16} />
            <span>Étudiant</span>
            <FiArrowRight size={16} />
            <span className="text-indigo-600 font-semibold">
              Statut d'Inscription
            </span>
          </div>

          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center">
              <FiAlertCircle size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                Aucune inscription trouvée
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Vous n'êtes actuellement inscrit à aucune classe
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isActive =
    status.statut === "ACTIF" ||
    status.statut === "actif" ||
    status.statut?.toUpperCase() === "ACTIVE";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Étudiant</span>
          <FiArrowRight size={16} />
          <span className="text-indigo-600 font-semibold">
            Statut d'Inscription
          </span>
        </div>

        {/* Hero Card */}
        <div
          className={`bg-gradient-to-r ${
            isActive
              ? "from-green-500 to-emerald-600"
              : "from-red-500 to-orange-600"
          } rounded-3xl shadow-2xl overflow-hidden mb-8`}
        >
          <div className="p-8 sm:p-12 text-white text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex-1">
                <div className="flex justify-center mb-4">
                  {isActive ? (
                    <FiCheckCircle size={64} className="text-white" />
                  ) : (
                    <FiXCircle size={64} className="text-white" />
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                  {isActive ? "Inscription Active" : "Inscription Inactive"}
                </h1>
                <p className="text-lg opacity-90">
                  {isActive
                    ? "Vous êtes actuellement inscrit et en règle"
                    : "Votre inscription n'est pas active pour le moment"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classe Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <FiBook size={24} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Classe assignée
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Code de Classe
                </label>
                <p className="text-2xl font-bold text-indigo-600 mt-1">
                  {status.classeNom || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isActive ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {isActive ? (
                  <FiCheckCircle size={24} className="text-green-600" />
                ) : (
                  <FiXCircle size={24} className="text-red-600" />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                État du Statut
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Statut Actuel
                </label>
                <div className="mt-1">
                  <span
                    className={`inline-block px-4 py-2 rounded-full font-bold text-sm ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.statut}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <FiAlertCircle
              size={24}
              className="text-blue-600 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Information</h3>
              <p className="text-blue-800 text-sm">
                {isActive
                  ? "Vous êtes inscrit et avez accès à tous les services de l'établissement. Vous pouvez consulter vos notes, votre bulletin, et participer aux activités académiques."
                  : "Votre inscription n'est pas active. Veuillez contacter l'administration pour plus d'informations ou pour réactiver votre inscription."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
