import AuthProvider from './Src/context/authContext';
import Routes from './Src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}


/*

========================
APP.JS
========================

Arquivo principal do aplicativo.

Responsável por iniciar:
- AuthProvider
- sistema de rotas
- contexto global

Fluxo:

index.js
↓
App.js
↓
AuthProvider
↓
Routes
↓
AuthRoutes ou AppRoutes

Tudo começa aqui.

*/