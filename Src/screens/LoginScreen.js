import { 
  View, Text, TouchableOpacity, StyleSheet, Image, TextInput, 
} from 'react-native';

import { useContext, useState } from 'react'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [manterConectado, setManterConectado] = useState(false);

  const handleEntrar = () => {
    login(email, senha);
  };

  return (
    <View style={styles.container}>

      {/* --- LOGO --- */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/LogoRenature.png')} />
        <MaterialCommunityIcons name="recycle" size={55} color="#4A7C00" />

        <Text style={styles.logoText}>
          Re<Text style={styles.logoTextGreen}>Nature</Text>
        </Text>
        <View style={styles.line} />
      </View>

      {/* --- CARD VERDE DE LOGIN --- */}
      <View style={styles.card}>

        {/* CAMPO: E-MAIL */}
        <View style={styles.inputGroup}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#000"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail do usuário"
            placeholderTextColor="#555"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* CAMPO: SENHA */}
        <View style={styles.inputGroup}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color="#000"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#555"
            secureTextEntry={true}
            autoCapitalize="none"
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* LINKS: MANTER CONECTADO (COM CHECKBOX FUNCIONAL) E ESQUECI MINHA SENHA */}
        <View style={styles.optionsRow}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setManterConectado(!manterConectado)}  
            activeOpacity={0.8}
          >
            <View style={styles.checkbox}>
              {manterConectado && (
                <MaterialCommunityIcons name="check" size={12} color="#4A7C00" />
              )}
            </View>
            <Text style={styles.optionText}>Manter conectado.</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.optionText, styles.underlineText]}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOTÃO ENTRAR */}
        <TouchableOpacity
          style={styles.buttonEntrar}
          onPress={handleEntrar}
        >
          <Text style={styles.buttonEntrarText}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={styles.cardLine} />

        {/* BOTÃO LOGIN SOCIAL: GOOGLE */}
        <TouchableOpacity style={styles.socialButton} onPress={() => login('google.user@gmail.com', '123456')}>
          <MaterialCommunityIcons name="google" size={24} color="#DB4437" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Login com Google</Text>
        </TouchableOpacity>

        {/* BOTÃO LOGIN SOCIAL: FACEBOOK */}
        <TouchableOpacity style={styles.socialButton} onPress={() => login('facebook.user@hotmail.com', '123456')}>
          <MaterialCommunityIcons name="facebook" size={24} color="#1877F2" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Login com Facebook</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F0', alignItems: 'center', justifyContent: 'center', padding: 25 },
  logoContainer: { alignItems: 'center', marginBottom: 35, width: '100%' },
  logoText: { fontSize: 48, fontWeight: 'bold', color: '#000000', marginTop: 5 },
  logoTextGreen: { color: '#4A7C00' },
  line: { width: '75%', height: 2, backgroundColor: '#000', marginTop: 5 },
  card: { width: '100%', backgroundColor: '#4A7C00', borderRadius: 20, padding: 22, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 30, width: '100%', height: 50, paddingHorizontal: 15, marginBottom: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: '100%', color: '#000', fontSize: 16 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 25, paddingHorizontal: 5, alignItems: 'center' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { 
    width: 16, 
    height: 16, 
    borderWidth: 1, 
    borderColor: '#FFF',  
    marginRight: 6,
    borderRadius: 3,
    backgroundColor: '#FFF', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionText: { color: '#FFF', fontSize: 11 },
  underlineText: { textDecorationLine: 'underline' },
  buttonEntrar: { backgroundColor: '#FFF', borderRadius: 30, width: '55%', height: 42, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  buttonEntrarText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  cardLine: { width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', marginBottom: 20 },
  socialButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 30, width: '100%', height: 50, paddingHorizontal: 20, marginBottom: 15 },
  socialIcon: { marginRight: 15 },
  socialButtonText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
});