import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, LogIn, Shield } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Background blobs animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite] animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_7s_infinite] animation-delay-4000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Carte principale */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* En-tête avec effet de verre */}
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 p-8 border-b border-gray-700/50">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur" />
                <div className="relative bg-gray-900 p-4 rounded-full border border-gray-700">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="mt-6 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Secure Portal
              </h1>
              <p className="mt-2 text-gray-400 text-center">
                Accédez à votre espace sécurisé
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Champ username */}
              <div className="group">
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Entrez votre nom d'utilisateur"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Champ password */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-900 border-gray-700 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <span className="text-sm text-gray-400">Se souvenir de moi</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-3 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connexion...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Se connecter</span>
                  </>
                )}
              </div>
            </button>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800/50 text-gray-400">
                  ou continuez avec
                </span>
              </div>
            </div>

            {/* Boutons sociaux */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700 rounded-lg py-2.5 px-4 transition-colors duration-200 group"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-500 rounded" />
                <span className="text-sm text-gray-300 group-hover:text-white">
                  Microsoft
                </span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center space-x-2 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700 rounded-lg py-2.5 px-4 transition-colors duration-200 group"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-yellow-500 rounded" />
                <span className="text-sm text-gray-300 group-hover:text-white">
                  Google
                </span>
              </button>
            </div>
          </form>

          {/* Pied de page */}
          <div className="px-8 py-6 bg-gray-900/30 border-t border-gray-700/50">
            <p className="text-center text-sm text-gray-500">
              Vous n'avez pas de compte ?{" "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Contactez l'administrateur
              </button>
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-600">
              <Lock className="w-3 h-3" />
              <span>Connexion sécurisée par chiffrement SSL</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Secure Portal. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}