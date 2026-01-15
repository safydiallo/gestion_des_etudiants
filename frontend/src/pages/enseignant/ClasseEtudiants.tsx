import { useEffect, useState } from "react";
import {
  classeService,
  EtudiantClasseDTO,
} from "../../services/classe/classeService";
import {
  FiUsers,
  FiSearch,
  FiHome,
  FiArrowRight,
  FiMail,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

export default function ClasseEtudiants({ classeId }: { classeId: number }) {
  const [etudiants, setEtudiants] = useState<EtudiantClasseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await classeService.getEtudiantsByClasseId(classeId);
        setEtudiants(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classeId]);

  const filteredStudents = etudiants.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.nom?.toLowerCase().includes(searchLower) ||
      student.prenom?.toLowerCase().includes(searchLower) ||
      student.matricule?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiUsers size={48} className="text-cyan-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement des étudiants...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Enseignant</span>
          <FiArrowRight size={16} />
          <span className="text-cyan-600 font-semibold">Classe Étudiants</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FiUsers size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Classe - Étudiants
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredStudents.length} étudiant
                  {filteredStudents.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, matricule ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-300"
            />
          </div>
        </div>

        {/* Students Table */}
        {filteredStudents.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Matricule
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Nom & Prénom
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-t border-gray-200 hover:bg-cyan-50 transition duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {student.prenom?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="font-mono font-bold text-gray-700">
                            {student.matricule}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FiUser size={16} className="text-gray-400" />
                          <span className="font-semibold text-gray-800">
                            {student.prenom} {student.nom}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FiMail size={16} className="text-gray-400" />
                          <a
                            href={`mailto:${student.email}`}
                            className="text-cyan-600 hover:text-cyan-700 text-sm underline"
                          >
                            {student.email || "N/A"}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          Actif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Stats */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-semibold">
                {filteredStudents.length} étudiant
                {filteredStudents.length !== 1 ? "s" : ""} trouvé
                {filteredStudents.length !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-gray-500">
                Affichage sur {etudiants.length} total
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center">
              <FiUsers size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                {searchTerm
                  ? "Aucun étudiant trouvé"
                  : "Aucun étudiant dans cette classe"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {searchTerm
                  ? `Essayez avec d'autres critères de recherche`
                  : "Aucun étudiant n'a été assigné à cette classe"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
