import { useEffect, useState } from "react";
import {
  enseignantService,
  Enseignant,
} from "../../services/enseignant/enseignantService";
import {
  FiUser,
  FiSearch,
  FiFilter,
  FiChevronRight,
  FiHome,
  FiArrowRight,
  FiBook,
} from "react-icons/fi";

export default function EnseignantsList() {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const data = await enseignantService.getAll();
        setEnseignants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnseignants();
  }, []);

  const filteredEnseignants = enseignants.filter(
    (e) =>
      (e.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.matriculeEns?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterBy === "all" || e.specialite === filterBy)
  );

  const specialites = Array.from(
    new Set(enseignants.map((e) => e.specialite).filter(Boolean))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiUser size={48} className="text-purple-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement des enseignants...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-purple-600 font-semibold">Enseignants</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiUser size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Liste des Enseignants
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredEnseignants.length} enseignant
                {filteredEnseignants.length !== 1 ? "s" : ""} trouvé
                {filteredEnseignants.length !== 1 ? "s" : ""}
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
                placeholder="Rechercher par nom, prénom ou matricule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
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
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300 appearance-none cursor-pointer"
              >
                <option value="all">Tous les spécialités</option>
                {specialites.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Matricule
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Prénom
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Spécialité
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEnseignants.length > 0 ? (
                  filteredEnseignants.map((e, idx) => (
                    <tr
                      key={e.idEnseignant}
                      className={`border-t border-gray-200 hover:bg-purple-50 transition duration-300 ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-sm font-bold text-gray-900">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                          {e.matriculeEns}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">
                        {e.nom}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{e.prenom}</td>
                      <td className="px-6 py-4">
                        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {e.specialite}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                          <FiBook size={16} />
                          Voir Matières
                          <FiChevronRight size={16} />
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
                          Aucun enseignant trouvé
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
