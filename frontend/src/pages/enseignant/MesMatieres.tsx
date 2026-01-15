import { useEffect, useState } from "react";
import {
  enseignantService,
  MatiereDto,
} from "../../services/enseignant/enseignantService";
import { useAuth } from "../../hooks/useAuth";
import {
  FiBook,
  FiSliders,
  FiHome,
  FiArrowRight,
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";

export default function MesMatieres() {
  const { user } = useAuth();
  const [matieres, setMatieres] = useState<MatiereDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        if (user?.username) {
          const list = await enseignantService.getAll();
          const enseignant = list.find((e) => e.matriculeEns === user.username);
          if (enseignant) {
            const details = await enseignantService.getDetails(
              enseignant.idEnseignant
            );
            if (details && details.matieres) {
              setMatieres(details.matieres);
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatieres();
  }, [user]);

  const totalCoefficient = matieres.reduce(
    (sum, m) => sum + (m.coefficient || 0),
    0
  );
  const averageCoefficient =
    matieres.length > 0 ? (totalCoefficient / matieres.length).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiBook size={48} className="text-indigo-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement de vos matières...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Enseignant</span>
          <FiArrowRight size={16} />
          <span className="text-indigo-600 font-semibold">Mes Matières</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiBook size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mes Matières</h1>
              <p className="text-gray-600 mt-1">
                {matieres.length} matière{matieres.length !== 1 ? "s" : ""}{" "}
                assignée{matieres.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Total de matières
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {matieres.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <FiBook size={24} className="text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Coefficient total
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totalCoefficient.toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiSliders size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Moyenne coefficient
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {averageCoefficient}
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <FiTrendingUp size={24} className="text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Matières List */}
        {matieres.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matieres.map((matiere) => (
              <div
                key={matiere.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="h-24 bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center px-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:animate-pulse"></div>
                  <FiBook
                    size={40}
                    className="text-white group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {matiere.nom}
                  </h3>

                  {/* Coefficient Section */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">
                          Coefficient
                        </p>
                        <p className="text-3xl font-bold text-indigo-600 mt-1">
                          {(matiere.coefficient || 0).toFixed(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-500 flex items-center justify-center">
                          <span className="text-xl font-bold text-indigo-600">
                            {(((matiere.coefficient || 0) / 10) * 100).toFixed(
                              0
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-600"
                        style={{
                          width: `${((matiere.coefficient || 0) / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Difficulty Level */}
                  <div className="flex gap-2">
                    {(matiere.coefficient || 0) < 2 && (
                      <span className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-bold text-center">
                        ✓ Facile
                      </span>
                    )}
                    {(matiere.coefficient || 0) >= 2 &&
                      (matiere.coefficient || 0) < 5 && (
                        <span className="flex-1 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-xs font-bold text-center">
                          ⚡ Moyen
                        </span>
                      )}
                    {(matiere.coefficient || 0) >= 5 && (
                      <span className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs font-bold text-center">
                        ★ Difficile
                      </span>
                    )}

                    <button className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 text-xs">
                      Voir Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center">
              <FiBook size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                Aucune matière assignée
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Vous n'avez pas encore de matières assignées
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
