import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login() {
    setUser({
      nome: 'Kauan',
    });
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


/*

========================
AUTHCONTEXT
========================

Responsável por controlar autenticação do aplicativo inteiro.

Aqui ficam:
- usuário logado
- login
- logout
- token futuramente

O Context permite que qualquer tela consiga acessar
informações do usuário sem precisar passar props.

Fluxo:

Login
↓
AuthContext salva usuário
↓
Routes detecta login
↓
AppRoutes é liberado

Quando usuário sai:
↓
logout()
↓
setUser(null)
↓
volta para AuthRoutes

Futuramente:
- Auth0
- Firebase Auth
- JWT
- Login Google
- Login Apple

Tudo será controlado aqui.

*/