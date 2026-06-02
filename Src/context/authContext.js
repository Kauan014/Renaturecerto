import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, senha) {
    const emailValido = email.includes('@') && email.includes('.');
    const senhaValida = senha.length >= 6;

    if (!emailValido || !senhaValida) {
      alert('Erro: Insira um e-mail válido e uma senha com no mínimo 6 caracteres.');
      return false;
    }

    setUser({
      email: email,
      nome: email.split('@')[0], 
    });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}