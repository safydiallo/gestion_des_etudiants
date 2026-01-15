import { useEffect, useState } from "react";
import { classeService, Matiere } from "../../services/classe/classeService";
import {
  FiBook,
  FiSearch,
  FiHome,
  FiArrowRight,
  FiSliders,
  FiTrendingUp,
} from "react-icons/fi";

export default function MatieresList() {
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const data = await classeService.getAllMatieres();
        setMatieres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatieres();
  }, []);

  const filteredMatieres = matieres.filter((m) =>
    m.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCoefficient = filteredMatieres.reduce(
    (sum, m) => sum + (m.coefficient || 0),
    0
  );
  const averageCoefficient =
    filteredMatieres.length > 0
      ? (totalCoefficient / filteredMatieres.length).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiBook size={48} className="text-orange-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement des matières...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-orange-600 font-semibold">Matières</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiBook size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Liste des Matières
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredMatieres.length} matière
                {filteredMatieres.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <FiSearch
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher une matière..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition duration-300"
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filteredMatieres.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FiBook size={24} className="text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Coefficient Total
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {totalCoefficient.toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FiSliders size={24} className="text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Moyenne Coeff
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {averageCoefficient}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiTrendingUp size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Matières Grid */}
        {filteredMatieres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatieres.map((matiere) => (
              <div
                key={matiere.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
              >
                {/* Card Header */}
                <div className="h-20 bg-gradient-to-r from-orange-500 to-amber-600 relative overflow-hidden flex items-center px-6">
                  <FiBook
                    size={32}
                    className="text-white group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2">
                    {matiere.nom}
                  </h3>

                  {/* Coefficient Section */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">
                          Coefficient
                        </p>
                        <p className="text-2xl font-bold text-orange-600 mt-1">
                          {(matiere.coefficient || 0).toFixed(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 rounded-full bg-white border-4 border-orange-500 flex items-center justify-center">
                          <span className="text-xl font-bold text-orange-600">
                            {(((matiere.coefficient || 0) / 10) * 100).toFixed(
                              0
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-600"
                          style={{
                            width: `${
                              ((matiere.coefficient || 0) / 10) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="flex gap-2 items-center">
                    {(matiere.coefficient || 0) < 2 && (
                      <span className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-bold text-center">
                        Facile
                      </span>
                    )}
                    {(matiere.coefficient || 0) >= 2 &&
                      (matiere.coefficient || 0) < 5 && (
                        <span className="flex-1 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-xs font-bold text-center">
                          Moyen
                        </span>
                      )}
                    {(matiere.coefficient || 0) >= 5 && (
                      <span className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs font-bold text-center">
                        Difficile
                      </span>
                    )}

                    <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 text-xs">
                      Éditer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center">
              <FiBook size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                Aucune matière trouvée
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Essayez avec d'autres critères de recherche
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
