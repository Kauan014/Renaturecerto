import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SocialScreen from '../screens/SocialScreen';
import HomeScreen from '../screens/HomeScreen';
import ReciclaveisScreen from '../screens/ReciclaveisScreen';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopWidth: 0,
          height: 65,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


/*

========================
APP ROUTES
========================

Controla navegação principal do aplicativo.

Essas telas aparecem somente
após autenticação/login.

Exemplos:
- Home
- Comunidade
- Perfil
- Configurações

Usa Bottom Tabs:
→ menu inferior do aplicativo

Exemplo:

Home | Comunidade | Perfil

Responsável por:
- tabs inferiores
- ícones
- navegação principal
- estrutura interna do app

Novas telas serão adicionadas aqui futuramente.

*/