# Estrutura do Projeto

## Pastas

src/
 ├── context/
 │    └── AuthContext.js
 │
 ├── routes/
 │    ├── auth.routes.js
 │    ├── app.routes.js
 │    └── index.js
 │
 ├── screens/
 │    ├── LoginScreen.js
 │    ├── HomeScreen.js
 │    └── ComunidadeScreen.js


# Função das Pastas

## context/
Responsável por controle global do aplicativo.

Atualmente:
- autenticação
- login
- logout

---

## routes/
Responsável pela navegação.

Contém:
- rotas públicas
- rotas privadas
- tabs
- stacks

---

## screens/
Contém as telas do aplicativo.

Exemplo:
- Login
- Home
- Comunidade

---

# Fluxo do App

index.js
↓
App.js
↓
AuthProvider
↓
Routes
↓
AuthRoutes ou AppRoutes

---

# Tecnologias

- React Native
- Expo
- React Navigation
- Context API

---

# Futuras implementações

- Auth0
- Firebase
- API Node.js
- Banco de dados
- Chat
- Comunidade
