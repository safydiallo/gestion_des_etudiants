import { useEffect, useState } from "react";
import {
  etudiantService,
  Etudiant,
} from "../../services/etudiant/etudiantService";
import {
  FiUser,
  FiSearch,
  FiFilter,
  FiMail,
  FiHome,
  FiArrowRight,
  FiMoreVertical,
} from "react-icons/fi";

export default function EtudiantsList() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const data = await etudiantService.getAllEtudiants();
        setEtudiants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, []);

  const filteredEtudiants = etudiants.filter(
    (e) =>
      (e.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterBy === "all" || true)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiUser size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement des étudiants...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-blue-600 font-semibold">Étudiants</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiUser size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Liste des Étudiants
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredEtudiants.length} étudiant
                {filteredEtudiants.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <FiSearch
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher par nom, matricule ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
              />
            </div>
            <div className="relative">
              <FiFilter
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300 appearance-none cursor-pointer"
              >
                <option value="all">Tous les étudiants</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Matricule
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Prénom
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEtudiants.length > 0 ? (
                  filteredEtudiants.map((e, idx) => (
                    <tr
                      key={e.id}
                      className={`border-t border-gray-200 hover:bg-blue-50 transition duration-300 ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-sm font-bold text-gray-900">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {e.matricule}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">
                        {e.nom}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{e.prenom}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FiMail size={16} className="text-indigo-500" />
                          <span className="text-sm">{e.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                          <FiMoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      <div className="flex flex-col items-center">
                        <FiUser size={48} className="text-gray-300 mb-4" />
                        <p className="text-lg font-semibold">
                          Aucun étudiant trouvé
                        </p>
                        <p className="text-sm mt-1">
                          Essayez avec d'autres critères de recherche
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
