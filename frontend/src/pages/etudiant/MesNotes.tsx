import { useEffect, useState } from "react";
import { noteService, Note } from "../../services/note/noteService";
import { etudiantService } from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";
import { useMatieresMap } from "../../hooks/useMatieresMap";
import {
  FiBook,
  FiHome,
  FiArrowRight,
  FiSearch,
  FiTrendingUp,
  FiBarChart2,
  FiAward,
} from "react-icons/fi";

export default function MesNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const { matieresMap, loading: loadingMatieres } = useMatieresMap();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("TOUS");

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then((e) => noteService.getNotesByEtudiant(e.id))
        .then((res) => setNotes(res))
        .finally(() => setLoadingNotes(false));
    }
  }, [user]);

  const filteredNotes = notes.filter((note) => {
    const matiereNom = matieresMap[note.matiereId]?.nom || `#${note.matiereId}`;
    const matchesSearch = matiereNom
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "TOUS" || note.typeNote === typeFilter;
    return matchesSearch && matchesType;
  });

  const averageNote =
    notes.length > 0
      ? (
          notes.reduce((sum, n) => sum + n.valeurNote, 0) / notes.length
        ).toFixed(2)
      : 0;

  const maxNote =
    notes.length > 0 ? Math.max(...notes.map((n) => n.valeurNote)) : 0;
  const minNote =
    notes.length > 0 ? Math.min(...notes.map((n) => n.valeurNote)) : 0;

  const noteTypes = ["TOUS", ...new Set(notes.map((n) => n.typeNote))];

  if (loadingNotes || loadingMatieres) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiBook size={48} className="text-emerald-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement de vos notes...
          </p>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
            <FiHome size={16} />
            <span>Étudiant</span>
            <FiArrowRight size={16} />
            <span className="text-emerald-600 font-semibold">Mes Notes</span>
          </div>

          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center">
              <FiBook size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                Aucune note disponible
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Les notes s'afficheront ici une fois saisies
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Étudiant</span>
          <FiArrowRight size={16} />
          <span className="text-emerald-600 font-semibold">Mes Notes</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiBook size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mes Notes</h1>
              <p className="text-gray-600 mt-1">
                {filteredNotes.length} note
                {filteredNotes.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Moyenne</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {averageNote}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <FiBarChart2 size={24} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Meilleure note
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {maxNote}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiTrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Plus basse note
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {minNote}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiAward size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Total notes
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {notes.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiBook size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <FiSearch
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher une matière..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-300"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-gray-700 font-semibold transition duration-300"
          >
            {noteTypes.map((type) => (
              <option key={type} value={type}>
                {type === "TOUS" ? "Tous les types" : `Type: ${type}`}
              </option>
            ))}
          </select>
        </div>

        {/* Notes Table */}
        {filteredNotes.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Matière
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold">
                      Type
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold">
                      Note
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotes.map((note, index) => {
                    const noteValue = note.valeurNote;
                    let badgeColor = "bg-red-100 text-red-700";
                    if (noteValue >= 16)
                      badgeColor = "bg-green-100 text-green-700";
                    else if (noteValue >= 12)
                      badgeColor = "bg-blue-100 text-blue-700";
                    else if (noteValue >= 10)
                      badgeColor = "bg-yellow-100 text-yellow-700";

                    return (
                      <tr
                        key={note.idNote}
                        className={`border-t border-gray-200 hover:bg-emerald-50 transition duration-200 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {matieresMap[note.matiereId]?.nom ??
                              `#${note.matiereId}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">
                            {note.typeNote}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-4 py-2 rounded-lg font-bold text-sm ${badgeColor}`}
                          >
                            {note.valeurNote}/20
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600 text-sm">
                            {new Date(note.dateSaisie).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-semibold">
                {filteredNotes.length} note
                {filteredNotes.length !== 1 ? "s" : ""} affichée
                {filteredNotes.length !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-gray-500">
                Affichage sur {notes.length} total
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <FiSearch size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600">
              Aucune note trouvée
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Essayez avec d'autres critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
