import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}



/*

========================
AUTH ROUTES
========================

Controla telas de autenticação.

Essas telas aparecem somente
quando usuário NÃO está logado.

Exemplos:
- Login
- Cadastro
- Recuperar senha

Usa Stack Navigation:
→ navegação em pilha

Exemplo:

Login
↓
Cadastro
↓
Voltar

Futuramente:
- Auth0
- Firebase Login
- Google Login

serão usados aqui.

*/