import { useState } from "react";
import { classeService } from "../../services/classe/classeService";
import {
  FiBook,
  FiSliders,
  FiArrowRight,
  FiHome,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface FormData {
  nom: string;
  coefficient: string;
}

export default function MatiereForm() {
  const [form, setForm] = useState<FormData>({
    nom: "",
    coefficient: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.nom.trim()) newErrors.nom = "Nom de la matière requis";
    if (!form.coefficient) newErrors.coefficient = "Coefficient requis";
    if (Number(form.coefficient) <= 0)
      newErrors.coefficient = "Le coefficient doit être positif";
    if (Number(form.coefficient) > 10)
      newErrors.coefficient = "Le coefficient ne peut pas dépasser 10";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await classeService.createMatiere({
        nom: form.nom,
        coefficient: Number(form.coefficient),
      });
      setSuccess(true);
      setMessage("✓ Matière créée avec succès!");
      setForm({ nom: "", coefficient: "" });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setSuccess(false);
      setMessage("✗ Erreur lors de la création");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const completionPercentage =
    (Number(Boolean(form.nom.trim())) + Number(Boolean(form.coefficient))) * 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-orange-600 font-semibold">Créer Matière</span>
        </div>

        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
            <FiBook size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Créer une Matière
            </h1>
            <p className="text-gray-600 mt-1">
              Ajouter un nouveau cours au catalogue
            </p>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-slideIn ${
              success
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-red-50 border-l-4 border-red-500"
            }`}
          >
            {success ? (
              <FiCheckCircle className="text-green-500" size={20} />
            ) : (
              <FiAlertCircle className="text-red-500" size={20} />
            )}
            <span className={success ? "text-green-700" : "text-red-700"}>
              {message}
            </span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progression
            </span>
            <span className="text-sm font-bold text-orange-600">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={submit} className="p-8">
            {/* Section: Informations */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-800">
                  Informations de la Matière
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Nom */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-orange-600 transition">
                    Nom de la Matière
                  </label>
                  <div className="relative">
                    <FiBook
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-orange-500 transition"
                      size={20}
                    />
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Ex: Mathématiques, Français..."
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.nom
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      }`}
                    />
                  </div>
                  {errors.nom && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.nom}
                    </p>
                  )}
                </div>

                {/* Coefficient */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-orange-600 transition">
                    Coefficient
                  </label>
                  <div className="relative">
                    <FiSliders
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-orange-500 transition"
                      size={20}
                    />
                    <input
                      type="number"
                      name="coefficient"
                      value={form.coefficient}
                      onChange={handleChange}
                      placeholder="Ex: 3, 4, 5..."
                      min="0.5"
                      max="10"
                      step="0.5"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.coefficient
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      }`}
                    />
                  </div>
                  {form.coefficient && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-700">
                        <span className="font-bold">Poids relatif:</span>{" "}
                        {((Number(form.coefficient) / 10) * 100).toFixed(0)}% de
                        difficulté
                      </p>
                    </div>
                  )}
                  {errors.coefficient && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.coefficient}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Info Box */}
            {form.nom && form.coefficient && (
              <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <h3 className="text-sm font-bold text-orange-900 mb-2">
                  Prévisualisation
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-orange-700">
                      {form.nom}
                    </p>
                    <p className="text-sm text-orange-600">
                      Coefficient: {form.coefficient}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      {Number(form.coefficient).toFixed(1)}
                    </p>
                    <p className="text-xs text-orange-500">coeff</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin">
                      <FiBook size={20} />
                    </div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={20} />
                    Créer la Matière
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
