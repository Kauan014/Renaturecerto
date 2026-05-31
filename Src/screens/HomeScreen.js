import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../context/authContext';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <MaterialCommunityIcons name="account-circle" size={32} color="#FFF" />
          <Text style={styles.welcomeText}>
            Olá, {user?.nome || 'Pedro'}!
          </Text>
        </View>
        <TouchableOpacity onPress={logout} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chevron-down" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* LOGO CENTRAL */}
        <Image 
          source={require('../../assets/LogoRenature.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        {/* BOTÃO: RECICLÁVEIS */}
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
          <Text style={styles.menuButtonText}>RECICLÁVEIS</Text>
        </TouchableOpacity>

        {/* BOTÃO: CRÉDITOS */}
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
          <Text style={styles.menuButtonText}>CRÉDITOS</Text>
        </TouchableOpacity>

        {/* BOTÃO: MAPA */}
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
          <Text style={styles.menuButtonText}>MAPA</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

// --- ESTILIZAÇÃO COMPLETA DA HOME ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F0', 
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#4A7C00', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30, 
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 25,
    marginBottom: 25,
  },
  menuButton: {
    width: '100%',
    backgroundColor: '#4A7C00', 
    borderRadius: 15,
    paddingVertical: 22, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuButtonText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1, 
  },
});