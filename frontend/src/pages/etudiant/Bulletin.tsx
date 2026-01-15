import { useEffect, useState } from "react";
import { noteService, Bulletin } from "../../services/note/noteService";
import { etudiantService } from "../../services/etudiant/etudiantService";
import { useAuth } from "../../hooks/useAuth";
import { useMatieresMap } from "../../hooks/useMatieresMap";
import {
  FiAward,
  FiHome,
  FiArrowRight,
  FiTrendingUp,
  FiBarChart3,
  FiBook,
  FiPieChart,
} from "react-icons/fi";

export default function BulletinPage() {
  const { user } = useAuth();
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const { matieresMap, loading } = useMatieresMap();
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    if (user?.username) {
      etudiantService
        .getEtudiantByMatricule(user.username)
        .then((e) => noteService.getBulletin(e.id))
        .then(setBulletin)
        .finally(() => setLoading2(false));
    }
  }, [user]);

  if (!bulletin || loading || loading2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiAward size={48} className="text-purple-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement de votre bulletin...
          </p>
        </div>
      </div>
    );
  }

  const sortedNotes = [...bulletin.notes].sort(
    (a, b) => b.valeurNote - a.valeurNote
  );
  const maxNote = Math.max(...bulletin.notes.map((n) => n.valeurNote));
  const minNote = Math.min(...bulletin.notes.map((n) => n.valeurNote));
  const notesByType = Object.groupBy(bulletin.notes, (n) => n.typeNote);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Étudiant</span>
          <FiArrowRight size={16} />
          <span className="text-purple-600 font-semibold">Bulletin</span>
        </div>

        {/* Hero Card - Average */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 sm:p-12 text-white text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              Votre Bulletin Scolaire
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex-1">
                <p className="text-purple-100 text-sm font-semibold uppercase mb-2">
                  Moyenne Générale
                </p>
                <p className="text-6xl sm:text-7xl font-bold">
                  {Number(bulletin.moyenne).toFixed(2)}
                </p>
                <p className="text-purple-100 mt-2">/20</p>
              </div>
              <div className="hidden sm:flex w-24 h-24 border-4 border-white rounded-full items-center justify-center">
                <FiAward size={48} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Meilleure Note
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {maxNote}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiTrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Plus Basse Note
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {minNote}
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <FiBarChart3 size={24} className="text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Total Notes
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {bulletin.notes.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiBook size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Matières</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {new Set(bulletin.notes.map((n) => n.matiereId)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiPieChart size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Notes by Type */}
        {Object.entries(notesByType).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(notesByType).map(([type, notes]) => {
              const avg = (
                notes!.reduce((sum, n) => sum + n.valeurNote, 0) / notes!.length
              ).toFixed(2);
              return (
                <div
                  key={type}
                  className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500"
                >
                  <p className="text-gray-600 text-sm font-semibold uppercase mb-2">
                    {type}
                  </p>
                  <p className="text-2xl font-bold text-purple-600 mb-2">
                    {avg}/20
                  </p>
                  <p className="text-xs text-gray-500">
                    {notes!.length} note{notes!.length > 1 ? "s" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Notes Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiBook size={28} />
              Détail des Notes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">
                    Matière
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">
                    Type
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">
                    Note
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">
                    Appréciation
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedNotes.map((note, index) => {
                  const noteValue = note.valeurNote;
                  let appreciation = "À revoir";
                  let appreciation_bg = "bg-red-100 text-red-700";

                  if (noteValue >= 18) {
                    appreciation = "Excellent";
                    appreciation_bg = "bg-green-100 text-green-700";
                  } else if (noteValue >= 15) {
                    appreciation = "Très bien";
                    appreciation_bg = "bg-blue-100 text-blue-700";
                  } else if (noteValue >= 12) {
                    appreciation = "Bien";
                    appreciation_bg = "bg-cyan-100 text-cyan-700";
                  } else if (noteValue >= 10) {
                    appreciation = "Satisfaisant";
                    appreciation_bg = "bg-yellow-100 text-yellow-700";
                  }

                  return (
                    <tr
                      key={index}
                      className={`border-t border-gray-200 hover:bg-purple-50 transition duration-200 ${
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
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-bold text-lg w-16 text-center">
                          {note.valeurNote}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${appreciation_bg}`}
                        >
                          {appreciation}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-semibold">
              Total: {bulletin.notes.length} note
              {bulletin.notes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
