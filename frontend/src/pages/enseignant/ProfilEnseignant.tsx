import { useEffect, useState } from "react";
import {
  enseignantService,
  EnseignantDetails,
} from "../../services/enseignant/enseignantService";
import { useAuth } from "../../hooks/useAuth";
import {
  FiUser,
  FiMail,
  FiAward,
  FiHome,
  FiArrowRight,
  FiBook,
  FiLoader,
} from "react-icons/fi";

export default function ProfilEnseignant() {
  const { user } = useAuth();
  const [profil, setProfil] = useState<EnseignantDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        if (user?.username) {
          const list = await enseignantService.getAll();
          const enseignant = list.find((e) => e.matriculeEns === user.username);
          if (enseignant) {
            const details = await enseignantService.getDetails(
              enseignant.idEnseignant
            );
            setProfil(details);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiUser size={48} className="text-purple-600" />
          </div>
          <p className="text-gray-600 font-semibold">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <FiUser size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-600">
            Profil non trouvé
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Veuillez vérifier votre connexion
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Enseignant</span>
          <FiArrowRight size={16} />
          <span className="text-purple-600 font-semibold">Mon Profil</span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white">
                <FiUser size={48} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  {profil.prenom} {profil.nom}
                </h1>
                <p className="text-white text-opacity-90 mt-2">
                  Enseignant • {profil.specialite}
                </p>
                <p className="text-white text-opacity-75 text-sm mt-1">
                  Matricule: {profil.matriculeEns}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card: Informations Personnelles */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiUser size={24} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Informations Personnelles
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-600 font-semibold uppercase">
                  Nom complet
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {profil.prenom} {profil.nom}
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-600 font-semibold uppercase">
                  Matricule
                </p>
                <p className="text-lg font-mono font-bold text-purple-600 mt-1">
                  {profil.matriculeEns}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase">
                  Spécialité
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                    {profil.specialite}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Statistiques */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <FiAward size={24} className="text-pink-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Statistiques</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      Matières enseignées
                    </p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">
                      {profil.matieres?.length || 0}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-purple-500">
                    <FiBook size={32} className="text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-lg p-4 border border-pink-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      Coefficient total
                    </p>
                    <p className="text-3xl font-bold text-pink-600 mt-1">
                      {(
                        profil.matieres?.reduce(
                          (sum, m) => sum + (m.coefficient || 0),
                          0
                        ) || 0
                      ).toFixed(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">/ 10.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matières Section */}
        {profil.matieres && profil.matieres.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiBook size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Matières Assignées
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profil.matieres.map((matiere) => (
                <div
                  key={matiere.id}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500 hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800">{matiere.nom}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Coeff: {(matiere.coefficient || 0).toFixed(1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                        {(((matiere.coefficient || 0) / 10) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
