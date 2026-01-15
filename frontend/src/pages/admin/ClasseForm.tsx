import { useState } from "react";
import { classeService } from "../../services/classe/classeService";
import {
  FiBook,
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

interface FormData {
  nom: string;
  niveau: string;
  annee: string;
}

const niveaux = ["L1", "L2", "L3", "M1", "M2"];
const annees = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 2 + i).toString()
);

export default function ClasseForm() {
  const [form, setForm] = useState<FormData>({
    nom: "",
    niveau: "",
    annee: new Date().getFullYear().toString(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.nom.trim()) newErrors.nom = "Nom de la classe requis";
    if (!form.niveau) newErrors.niveau = "Niveau requis";
    if (!form.annee) newErrors.annee = "Année académique requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await classeService.createClasse(form);
      setSuccess(true);
      setMessage("✓ Classe créée avec succès!");
      setForm({
        nom: "",
        niveau: "",
        annee: new Date().getFullYear().toString(),
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setSuccess(false);
      setMessage("✗ Erreur lors de la création");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const progressFields = [form.nom, form.niveau, form.annee];
  const completionPercentage = Math.round(
    (progressFields.filter((f) => f.trim()).length / progressFields.length) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-emerald-600 font-semibold">Créer Classe</span>
        </div>

        {/* Header with Icon */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
            <FiBook className="text-white" size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              Créer une Nouvelle Classe
            </h1>
            <p className="text-gray-600">
              Configurez les informations de la classe académique
            </p>
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 border-l-4 animate-slideIn backdrop-blur-sm ${
              success
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-700"
                : "bg-gradient-to-r from-red-50 to-rose-50 border-red-500 text-red-700"
            }`}
          >
            {success ? (
              <FiCheckCircle size={24} className="flex-shrink-0" />
            ) : (
              <FiAlertCircle size={24} className="flex-shrink-0" />
            )}
            <span className="font-semibold">{message}</span>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-10">
            {/* Section: Informations de Base */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900">
                  Informations de Base
                </h2>
              </div>

              {/* Nom de la Classe */}
              <div className="group mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de la Classe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiBook
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition"
                    size={20}
                  />
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Ex: Informatique 1A, Sciences 2B, Littérature 3C"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                      errors.nom
                        ? "border-red-500 bg-red-50 focus:border-red-600"
                        : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    }`}
                  />
                </div>
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FiAlertCircle size={16} />
                    {errors.nom}
                  </p>
                )}
              </div>
            </div>

            {/* Section: Configuration Académique */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900">
                  Configuration Académique
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Niveau */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Niveau <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiTrendingUp
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition pointer-events-none"
                      size={20}
                    />
                    <select
                      name="niveau"
                      value={form.niveau}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 appearance-none cursor-pointer bg-white ${
                        errors.niveau
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      }`}
                    >
                      <option value="">Sélectionnez un niveau</option>
                      {niveaux.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.niveau && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.niveau}
                    </p>
                  )}
                </div>

                {/* Année Académique */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Année Académique <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition pointer-events-none"
                      size={20}
                    />
                    <select
                      name="annee"
                      value={form.annee}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 appearance-none cursor-pointer bg-white ${
                        errors.annee
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      }`}
                    >
                      {annees.map((a) => (
                        <option key={a} value={a}>
                          {a}/{parseInt(a) + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.annee && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.annee}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {form.nom && form.niveau && (
              <div className="mb-10 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-l-4 border-emerald-500 animate-slideIn">
                <div className="flex items-center gap-3">
                  <FiBook className="text-emerald-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Aperçu:</strong>
                    </p>
                    <p className="text-lg font-semibold text-emerald-700">
                      {form.nom} - {form.niveau} ({form.annee}/
                      {parseInt(form.annee) + 1})
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300 transform ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin">⟳</span>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={20} />
                    Créer la Classe
                  </>
                )}
              </button>
              <button
                type="reset"
                className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition duration-300"
              >
                Réinitialiser
              </button>
            </div>
          </form>
        </div>

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-xl shadow-md border-t-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">
              {niveaux.length}
            </p>
            <p className="text-gray-600 text-sm mt-1">Niveaux Disponibles</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border-t-4 border-teal-500">
            <p className="text-2xl font-bold text-teal-600">{annees.length}</p>
            <p className="text-gray-600 text-sm mt-1">Années Académiques</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border-t-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">∞</p>
            <p className="text-gray-600 text-sm mt-1">Capacité Étudiants</p>
          </div>
        </div>
      </div>
    </div>
  );
}
