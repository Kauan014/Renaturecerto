import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';

import { AuthContext } from '../context/authContext';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export default function Routes() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

/*

========================
ROUTES INDEX
========================

Arquivo principal da navegação.

Responsável por decidir:

Usuário logado?
→ AppRoutes

Usuário NÃO logado?
→ AuthRoutes

Fluxo:

App.js
↓
Routes
↓
Verifica user
↓
Mostra rotas corretas

Esse sistema permite:
- proteção de telas
- login automático
- logout automático
- separação profissional das rotas

*/