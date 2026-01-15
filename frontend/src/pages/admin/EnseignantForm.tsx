import { useState } from "react";
import { enseignantService } from "../../services/enseignant/enseignantService";
import {
  FiUser,
  FiMail,
  FiBook,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

interface FormData {
  matriculeEns: string;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
  password: string;
  confirmPassword?: string;
}

export default function EnseignantForm() {
  const [form, setForm] = useState<FormData>({
    matriculeEns: "",
    nom: "",
    prenom: "",
    email: "",
    specialite: "",
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

    if (!form.matriculeEns.trim()) newErrors.matriculeEns = "Matricule requis";
    else if (!/^[A-Z0-9]+$/.test(form.matriculeEns)) 
      newErrors.matriculeEns = "Format invalide (lettres/chiffres majuscules)";
    
    if (!form.nom.trim()) newErrors.nom = "Nom requis";
    if (!form.prenom.trim()) newErrors.prenom = "Prénom requis";
    
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email invalide";
    
    if (!form.specialite.trim()) newErrors.specialite = "Spécialité requise";
    
    if (form.password.length < 6)
      newErrors.password = "Minimum 6 caractères";
    
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
      const { confirmPassword, ...submitData } = form;
      await enseignantService.create(submitData);
      setSuccess(true);
      setMessage("✓ Enseignant créé avec succès!");
      setForm({
        matriculeEns: "",
        nom: "",
        prenom: "",
        email: "",
        specialite: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setSuccess(false);
  const progressFields = [form.matriculeEns, form.nom, form.prenom, form.email, form.specialite, form.password, form.confirmPassword];
  const completionPercentage = Math.round((progressFields.filter(f => f.trim()).length / progressFields.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <FiHome size={16} />
          <span>Admin</span>
          <FiArrowRight size={16} />
          <span className="text-indigo-600 font-semibold">Ajouter Enseignant</span>
        </div>

        {/* Header with Icon */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <FiBook className="text-white" size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              Ajouter un Enseignant
            </h1>
            <p className="text-gray-600">Créez un nouveau compte pour un enseignant</p>
          </div>
        </div>

        {/* Alert Messages with Animation */}
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
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-10">
            {/* Section: Informations Personnelles */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900">Informations Personnelles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matricule */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Matricule <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" size={20} />
                    <input
                      type="text"
                      name="matriculeEns"
                      value={form.matriculeEns}
                      onChange={handleChange}
                      placeholder="EX: ENS2024001"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.matriculeEns
                          ? "border-red-500 bg-red-50 focus:border-red-600"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.matriculeEns && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.matriculeEns}
                    </p>
                  )}
                </div>

                {/* Nom */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                      errors.nom
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.nom}
                    </p>
                  )}
                </div>

                {/* Prénom */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    placeholder="Jean"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                      errors.prenom
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.prenom}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@example.com"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Spécialité */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900">Domaine d'Expertise</h2>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Spécialité <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" size={20} />
                  <input
                    type="text"
                    name="specialite"
                    value={form.specialite}
                    onChange={handleChange}
                    placeholder="Ex: Mathématiques, Informatique, Physique..."
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                      errors.specialite
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                </div>
                {errors.specialite && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FiAlertCircle size={16} />
                    {errors.specialite}
                  </p>
                )}
              </div>
            </div>

            {/* Section: Sécurité */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900">Sécurité & Authentification</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 caractères"
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.password
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.password}
                    </p>
                  )}
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
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmer le mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmer le mot de passe"
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition duration-300 ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <FiAlertCircle size={16} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300 transform ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
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
                    Créer l'Enseignant
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

        {/* Info Box */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>💡 Information importante:</strong> Les données d'enseignant seront synchronisées automatiquement avec Keycloak pour l'authentification. L'enseignant pourra se connecter avec son email et le mot de passe défini.
          </p>
        </div>
      </div>
    </div>
  );
}           <strong>💡 Conseil:</strong> Les données d'enseignant seront
            également synchronisées avec Keycloak.
          </p>
        </div>
      </div>
    </div>
  );
}
