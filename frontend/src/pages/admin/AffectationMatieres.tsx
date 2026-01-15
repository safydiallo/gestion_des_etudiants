import { useEffect, useState } from "react";
import { enseignantService } from "../../services/enseignant/enseignantService";
import { classeService, Matiere } from "../../services/classe/classeService";
import {
  FiBook,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";

interface Props {
  enseignantId: number;
  enseignantNom?: string;
}

export default function AffectationMatieres({
  enseignantId,
  enseignantNom = "Enseignant",
}: Props) {
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const data = await classeService.getAllMatieres();
        setMatieres(data);
      } catch (error) {
        console.error(error);
        setMessage("Erreur lors du chargement des matières");
      } finally {
        setLoading(false);
      }
    };

    fetchMatieres();
  }, []);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === filteredMatieres.length) {
      setSelected([]);
    } else {
      setSelected(filteredMatieres.map((m) => m.id!));
    }
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setMessage("Sélectionnez au moins une matière");
      setSuccess(false);
      return;
    }

    setSubmitting(true);
    try {
      await enseignantService.affectMatieres(enseignantId, {
        matiereIds: selected,
      });
      setSuccess(true);
      setMessage("✓ Matières affectées avec succès!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setSuccess(false);
      setMessage("✗ Erreur lors de l'affectation");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMatieres = matieres.filter((m) =>
    m.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCoefficient = matieres
    .filter((m) => selected.includes(m.id!))
    .reduce((sum, m) => sum + (m.coefficient || 0), 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin">
          <FiBook size={48} className="text-blue-600" />
        </div>
        <span className="mt-4 text-gray-600 font-semibold">
          Chargement des matières...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiBook className="text-blue-600" size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Affecter des Matières
            </h3>
            <p className="text-gray-600 text-sm">
              Assignez les matières à{" "}
              <span className="font-semibold text-blue-600">
                {enseignantNom}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center justify-between border-l-4 animate-slideIn backdrop-blur-sm ${
            success
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-700"
              : "bg-gradient-to-r from-red-50 to-rose-50 border-red-500 text-red-700"
          }`}
        >
          <div className="flex items-center gap-3">
            {success ? (
              <FiCheckCircle size={24} className="flex-shrink-0" />
            ) : (
              <FiAlertCircle size={24} className="flex-shrink-0" />
            )}
            <span className="font-semibold">{message}</span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Rechercher une matière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-300"
          />
        </div>
      </div>

      {/* Select All Card */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="selectAll"
            checked={
              selected.length === filteredMatieres.length &&
              filteredMatieres.length > 0
            }
            onChange={toggleAll}
            className="w-5 h-5 cursor-pointer accent-blue-600"
          />
          <label
            htmlFor="selectAll"
            className="cursor-pointer font-semibold text-gray-700"
          >
            {selected.length === filteredMatieres.length &&
            filteredMatieres.length > 0
              ? "Désélectionner tout"
              : "Sélectionner tout"}
          </label>
        </div>
        <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-lg">
          {selected.length}/{matieres.length} sélectionnée(s)
        </span>
      </div>

      {/* Matières Grid */}
      <div className="mb-6">
        {filteredMatieres.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiBook
              size={48}
              className="mx-auto mb-3 opacity-30 text-gray-400"
            />
            <p className="text-gray-500 font-semibold">
              Aucune matière trouvée
            </p>
            <p className="text-gray-400 text-sm">Modifiez votre recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatieres.map((matiere) => (
              <div
                key={matiere.id}
                onClick={() => toggle(matiere.id!)}
                className={`p-5 rounded-xl border-2 cursor-pointer transition transform hover:scale-105 ${
                  selected.includes(matiere.id!)
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg ring-2 ring-blue-200"
                    : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(matiere.id!)}
                    onChange={() => toggle(matiere.id!)}
                    className="w-5 h-5 cursor-pointer mt-1 accent-blue-600"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 line-clamp-2">
                      {matiere.nom}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        <FiFilter size={12} />
                        Coef: {matiere.coefficient}
                      </span>
                    </div>
                  </div>
                  {selected.includes(matiere.id!) && (
                    <div className="text-blue-600">
                      <FiCheckCircle size={24} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {selected.length > 0 && (
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500 animate-slideIn">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Matières Sélectionnées</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {selected.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Coefficient Total</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {totalCoefficient}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux Couverture</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {Math.round((selected.length / matieres.length) * 100)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Restantes</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">
                {matieres.length - selected.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={submitting || selected.length === 0}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300 transform ${
            submitting || selected.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
          }`}
        >
          {submitting ? (
            <>
              <span className="inline-block animate-spin">⟳</span>
              Affectation en cours...
            </>
          ) : (
            <>
              <FiCheckCircle size={20} />
              Confirmer l'Affectation
              {selected.length > 0 && ` (${selected.length})`}
            </>
          )}
        </button>
        <button
          onClick={() => setSelected([])}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition duration-300 flex items-center gap-2"
        >
          <FiX size={20} />
          Annuler
        </button>
      </div>
    </div>
  );
}
