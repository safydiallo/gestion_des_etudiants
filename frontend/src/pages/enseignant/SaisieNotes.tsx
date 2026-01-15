import { useEffect, useState } from "react";
import { noteService } from "../../services/note/noteService";
import {
  classeService,
  EtudiantClasseDTO,
  Matiere,
} from "../../services/classe/classeService";
import {
  FiFileText,
  FiHome,
  FiArrowRight,
  FiSearch,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiBook,
  FiAward,
} from "react-icons/fi";

interface Props {
  classeId: number;
}

interface GradeSubmission {
  etudiantId: number;
  grade: number | null;
  submitted: boolean;
}

export default function SaisieNotes({ classeId }: Props) {
  const [etudiants, setEtudiants] = useState<EtudiantClasseDTO[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [matiereId, setMatiereId] = useState<number | null>(null);
  const [typeNote, setTypeNote] = useState("EXAM");
  const [notes, setNotes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [etudiantsData, matieresData] = await Promise.all([
          classeService.getEtudiantsByClasseId(classeId),
          classeService.getAllMatieres(),
        ]);
        setEtudiants(etudiantsData);
        setMatieres(matieresData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Erreur lors du chargement des données");
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
      student.matricule?.toLowerCase().includes(searchLower)
    );
  });

  const submit = async () => {
    if (!matiereId) {
      setErrorMessage("Veuillez sélectionner une matière");
      return;
    }

    const hasGrades = etudiants.some((e) => notes[e.id] !== undefined);
    if (!hasGrades) {
      setErrorMessage("Veuillez saisir au moins une note");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const gradesToSubmit = etudiants
        .filter((e) => notes[e.id] !== undefined)
        .map((e) => ({
          etudiantId: e.id,
          matiereId,
          typeNote,
          valeurNote: notes[e.id],
        }));

      for (const grade of gradesToSubmit) {
        await noteService.createNote(grade);
      }

      setSuccessMessage(
        `${gradesToSubmit.length} note(s) enregistrée(s) avec succès !`
      );
      setNotes({});
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error submitting grades:", error);
      setErrorMessage("Erreur lors de l'enregistrement des notes");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <FiFileText size={48} className="text-orange-600" />
          </div>
          <p className="text-gray-600 font-semibold">
            Chargement du formulaire...
          </p>
        </div>
      </div>
    );
  }

  if (etudiants.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <FiAlertCircle size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600">
              Aucun étudiant dans cette classe
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Impossible de saisir les notes sans étudiants
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Enseignant</span>
          <FiArrowRight size={16} />
          <span className="text-orange-600 font-semibold">
            Saisie des Notes
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiFileText size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Saisie des Notes
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredStudents.length} étudiant
                {filteredStudents.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 rounded-lg flex items-center gap-3">
            <FiCheckCircle className="text-green-600" size={20} />
            <span className="text-green-700 font-semibold">
              {successMessage}
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 rounded-lg flex items-center gap-3">
            <FiAlertCircle className="text-red-600" size={20} />
            <span className="text-red-700 font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Matière Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <label className="block mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FiBook size={20} className="text-orange-600" />
                <span className="text-sm font-bold text-gray-700 uppercase">
                  Matière
                </span>
              </div>
              <select
                value={matiereId || ""}
                onChange={(e) => setMatiereId(Number(e.target.value) || null)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-700 font-semibold transition duration-300"
              >
                <option value="">-- Sélectionner une matière --</option>
                {matieres.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nom}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Type de Note Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <label className="block mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FiAward size={20} className="text-red-600" />
                <span className="text-sm font-bold text-gray-700 uppercase">
                  Type de Note
                </span>
              </div>
              <select
                value={typeNote}
                onChange={(e) => setTypeNote(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none text-gray-700 font-semibold transition duration-300"
              >
                <option value="EXAM">📋 Examen</option>
                <option value="DS">✏️ DS (Devoir Surveillé)</option>
                <option value="TP">💻 TP (Travaux Pratiques)</option>
              </select>
            </label>
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
              placeholder="Rechercher un étudiant par nom, prénom ou matricule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-300"
            />
          </div>
        </div>

        {/* Grades Table */}
        {filteredStudents.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Étudiant
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Matricule
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold">
                      Note (0-20)
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => {
                    const gradeValue = notes[student.id];
                    const hasGrade =
                      gradeValue !== undefined && gradeValue !== null;

                    return (
                      <tr
                        key={student.id}
                        className={`border-t border-gray-200 hover:bg-orange-50 transition duration-200 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800">
                            {student.prenom} {student.nom}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-600">
                            {student.matricule}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={gradeValue || ""}
                            onChange={(e) => {
                              const value = e.target.value
                                ? Number(e.target.value)
                                : undefined;
                              setNotes({
                                ...notes,
                                [student.id]: value as any,
                              });
                            }}
                            placeholder="--"
                            className="w-20 mx-auto px-3 py-2 text-center rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none font-bold text-gray-800 transition duration-300"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          {hasGrade ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                              <FiCheckCircle size={14} />
                              Saisi
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                              ○ En attente
                            </span>
                          )}
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
                {
                  Object.keys(notes).filter(
                    (k) => notes[Number(k)] !== undefined
                  ).length
                }{" "}
                note
                {Object.keys(notes).filter(
                  (k) => notes[Number(k)] !== undefined
                ).length !== 1
                  ? "s"
                  : ""}{" "}
                saisie
                {Object.keys(notes).filter(
                  (k) => notes[Number(k)] !== undefined
                ).length !== 1
                  ? "s"
                  : ""}
              </span>
              <span className="text-xs text-gray-500">
                Affichage sur {etudiants.length} étudiant
                {etudiants.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg mb-8">
            <div className="flex flex-col items-center">
              <FiSearch size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                Aucun étudiant trouvé
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Essayez avec d'autres critères de recherche
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            onClick={submit}
            disabled={submitting || !matiereId || filteredStudents.length === 0}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <FiLoader className="animate-spin" size={20} />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <FiCheckCircle size={20} />
                <span>Valider et Enregistrer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
