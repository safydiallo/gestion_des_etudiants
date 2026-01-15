import { useEffect, useState } from "react";
import { classeService, Classe } from "../../services/classe/classeService";
import {
  FiBook,
  FiTrendingUp,
  FiCalendar,
  FiSearch,
  FiHome,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";

export default function ClassesList() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await classeService.getAllClasses();
        setClasses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(
    (c) =>
      c.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.niveau?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiBook size={48} className="text-teal-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement des classes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-teal-600 font-semibold">Classes</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiBook size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Liste des Classes
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredClasses.length} classe
                {filteredClasses.length !== 1 ? "s" : ""} disponible
                {filteredClasses.length !== 1 ? "s" : ""}
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
              placeholder="Rechercher une classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-300"
            />
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classe) => (
              <div
                key={classe.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
              >
                {/* Card Header */}
                <div className="h-24 bg-gradient-to-r from-teal-500 to-cyan-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 animate-pulse"></div>
                  <div className="h-full flex items-center justify-center">
                    <FiBook
                      size={40}
                      className="text-white group-hover:scale-110 transition duration-300"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {classe.nom}
                  </h3>

                  {/* Classe Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <FiTrendingUp size={18} className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">
                          Niveau
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {classe.niveau}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <FiCalendar size={18} className="text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">
                          Année
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {classe.annee}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiUsers size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">
                          Capacité
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          À définir
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95">
                    Voir Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center">
              <FiBook size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                Aucune classe trouvée
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
