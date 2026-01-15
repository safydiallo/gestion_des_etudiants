import { useState } from "react";
import { etudiantService } from "../../services/etudiant/etudiantService";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiHome,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface FormData {
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function EtudiantForm() {
  const [form, setForm] = useState<FormData>({
    matricule: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.matricule.trim()) newErrors.matricule = "Matricule requis";
    if (!/^[A-Z0-9]+$/.test(form.matricule))
      newErrors.matricule = "Format invalide (majuscules et chiffres)";
    if (!form.nom.trim()) newErrors.nom = "Nom requis";
    if (!form.prenom.trim()) newErrors.prenom = "Prénom requis";
    if (!form.email.trim()) newErrors.email = "Email requis";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Email invalide";
    if (form.password.length < 6) newErrors.password = "Min 6 caractères";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await etudiantService.creerEtudiant({
        matricule: form.matricule,
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        password: form.password,
      });
      setSuccess(true);
      setMessage("✓ Étudiant créé avec succès!");
      setForm({
        matricule: "",
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmPassword: "",
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

  const progressFields = [
    form.matricule,
    form.nom,
    form.prenom,
    form.email,
    form.password,
    form.confirmPassword,
  ];
  const completionPercentage = Math.round(
    (progressFields.filter((f) => f.trim()).length / progressFields.length) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-blue-600 font-semibold">Créer Étudiant</span>
        </div>

        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
            <FiUser size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Créer un Étudiant
            </h1>
            <p className="text-gray-600 mt-1">
              Ajouter un nouveau participant au système
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
            <span className="text-sm font-bold text-blue-600">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Section 1: Informations Personnelles */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-800">
                  Informations Personnelles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matricule */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition">
                    Matricule
                  </label>
                  <div className="relative">
                    <FiUser
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition"
                      size={20}
                    />
                    <input
                      type="text"
                      name="matricule"
                      value={form.matricule}
                      onChange={handleChange}
                      placeholder="Ex: STU001"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.matricule
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                  </div>
                  {errors.matricule && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.matricule}
                    </p>
                  )}
                </div>

                {/* Nom */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition">
                    Nom
                  </label>
                  <div className="relative">
                    <FiUser
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition"
                      size={20}
                    />
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.nom
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                  </div>
                  {errors.nom && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.nom}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Prénom */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition">
                    Prénom
                  </label>
                  <div className="relative">
                    <FiUser
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition"
                      size={20}
                    />
                    <input
                      type="text"
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.prenom
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                  </div>
                  {errors.prenom && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.prenom}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="exemple@email.com"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.email
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Sécurité */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-800">Sécurité</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Password */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.password
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-500 transition"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          form.password.length < 6
                            ? "w-1/3 bg-red-500"
                            : form.password.length < 12
                            ? "w-2/3 bg-yellow-500"
                            : "w-full bg-green-500"
                        }`}
                      ></div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition">
                    Confirmer mot de passe
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-500 transition"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={14} /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin">
                      <FiUser size={20} />
                    </div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={20} />
                    Créer l'Étudiant
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
