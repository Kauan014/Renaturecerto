import {
  View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, TextInput, 
} from 'react-native';

import { useContext, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../context/authContext';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  
  const [exibindoPerfil, setExibindoPerfil] = useState(false);

  const [modalSenhaVisivel, setModalSenhaVisivel] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const nomeUsuario = user?.email 
    ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
    : 'Pedro Silva';

  const handleSalvarSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem. Digite igual nos dois campos!');
      return;
    }

    alert('Senha alterada com sucesso!');
    
    setNovaSenha('');
    setConfirmarSenha('');
    setModalSenhaVisivel(false);
  };

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <MaterialCommunityIcons name="account-circle" size={32} color="#FFF" />
          <Text style={styles.welcomeText}>
            {user?.email || 'joao@gmail.com'}
          </Text>
        </View>
        
        <TouchableOpacity onPress={() => setExibindoPerfil(!exibindoPerfil)} activeOpacity={0.7}>
          <MaterialCommunityIcons 
            name={exibindoPerfil ? "arrow-left" : "chevron-down"} 
            size={32} 
            color="#FFF" 
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {!exibindoPerfil ? (
          // =============================
          // HOME
          // =============================
          <>
            <Image 
              source={require('../../assets/LogoRenature.png')} 
              style={styles.logo}
              resizeMode="contain"
            />

            <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
              <Text style={styles.menuButtonText}>RECICLÁVEIS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
              <Text style={styles.menuButtonText}>CRÉDITOS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} 
            activeOpacity={0.8} >
              <Text style={styles.menuButtonText}>MAPA</Text>
            </TouchableOpacity>
          </>
        ) : (
          // =============================
          // DASHBOARD DE PERFIL
          // =============================
          <View style={styles.profileWrapper}>
            
            {/* CARD DO USUÁRIO */}
            <View style={styles.userCard}>
              <MaterialCommunityIcons name="account-circle" size={85} color="#FFF" />

              <View style={styles.userCardInfo}>
                <Text style={styles.userNameText}>{nomeUsuario}</Text>
                <Text style={styles.userDetailText}>{user?.email || 'pedrosilva@gmail.com'}</Text>
                <Text style={styles.userDetailText}>CPF: 000.000.000-00</Text>
                <Text style={styles.userDetailText}>Telefone: 00000-00000</Text>
                
                {/* Links de Ações */}
                <View style={styles.linksRow}>
                  <TouchableOpacity onPress={() => setModalSenhaVisivel(true)}>
                    <Text style={styles.linkText}>Mudar senha</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={logout}>
                    <Text style={styles.linkText}>Sair</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* GRID DE INFORMAÇÕES */}
            <View style={styles.gridContainer}>
              <View style={styles.gridCard}>
                <Text style={styles.gridCardTitle}>NÍVEL</Text>
                <View style={styles.badgeContainer}>
                  <MaterialCommunityIcons name="seal" size={52} color="#FFF" />
                  <Text style={styles.badgeText}></Text>
                </View>
              </View>

              <View style={styles.gridCard}>
                <Text style={styles.gridCardTitle}>PONTOS</Text>
                <Text style={styles.pointsNumber}>0</Text>
              </View>

              <View style={styles.gridCard}>
                <Text style={styles.gridCardTitle}>LOJAS</Text>
                <MaterialCommunityIcons name="shopping-outline" size={45} color="#FFF" style={{ marginTop: 5 }} />
              </View>

              <View style={styles.gridCard}>
                <Text style={styles.gridCardTitle}>CONQUISTAS</Text>
                <MaterialCommunityIcons name="trophy-outline" size={45} color="#FFF" style={{ marginTop: 5 }} />
              </View>
            </View>

            {/* CARD: DESEMPENHO SEMANAL */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>DESEMPENHO SEMANAL</Text>
              <View style={styles.chartContainer}>
                <View style={[styles.chartBar, { height: '40%' }]} />
                <View style={[styles.chartBar, { height: '65%' }]} />
                <View style={[styles.chartBar, { height: '50%' }]} />
                <View style={[styles.chartBar, { height: '75%' }]} />
                <View style={[styles.chartBar, { height: '30%' }]} />
                <View style={[styles.chartBar, { height: '100%' }]} />
                <View style={[styles.chartBar, { height: '45%' }]} />
              </View>
            </View>

          </View>
        )}

      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalSenhaVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalSenhaVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.passwordCard}>
            
            <MaterialCommunityIcons name="lock-reset" size={44} color="#4A7C00" />
            <Text style={styles.modalTitle}>Alterar Senha</Text>

            {/* Campo: Nova Senha */}
            <View style={styles.modalInputGroup}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.modalInput}
                placeholder="Nova senha (mín. 6 dígitos)"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={novaSenha}
                onChangeText={setNovaSenha}
              />
            </View>

            {/* Campo: Confirmar Senha */}
            <View style={styles.modalInputGroup}>
              <MaterialCommunityIcons name="lock-check-outline" size={20} color="#555" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.modalInput}
                placeholder="Confirme a nova senha"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </View>

            {/* Botões de Ação */}
            <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvarSenha}>
              <Text style={styles.btnSalvarText}>SALVAR NOVA SENHA</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.btnCancelar} 
              onPress={() => {
                setNovaSenha('');
                setConfirmarSenha('');
                setModalSenhaVisivel(false);
              }}
            >
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

// --- ESTILIZAÇÃO COMPLETA ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAF8F0' 
  },
  header: { 
    width: '100%', 
    height: 100, 
    backgroundColor: '#4A7C00', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 30 
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  welcomeText: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  content: { 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingBottom: 30 
  },
  logo: { 
    width: 120, 
    height: 120, 
    marginTop: 25, 
    marginBottom: 25 
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
    shadowOpacity: 0.2, shadowRadius: 2 
  },
  menuButtonText: { 
    color: '#FFF', 
    fontSize: 26, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  profileWrapper: { 
    width: '100%', 
    marginTop: 20 
  },
  userCard: { 
    width: '100%', 
    backgroundColor: '#4A7C00', 
    borderRadius: 20, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  userCardInfo: { 
    flex: 1, 
    marginLeft: 15 
  },
  userNameText: { 
    color: '#FFF', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  userDetailText: { 
    color: 'rgba(255, 255, 255, 0.85)', 
    fontSize: 13, 
    marginBottom: 2 
  },
  linksRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    paddingRight: 10 
  },
  linkText: { 
    color: '#FFF', 
    fontSize: 13, 
    textDecorationLine: 'underline' 
  },
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  gridCard: { 
    width: '48%', 
    backgroundColor: '#4A7C00', 
    borderRadius: 15, 
    paddingVertical: 15, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 15, 
    height: 110 
  },
  gridCardTitle: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    letterSpacing: 0.5 
  },
  pointsNumber: { 
    color: '#FFF', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  badgeContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 5 
  },
  badgeText: { 
    position: 'absolute', 
    color: '#4A7C00', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  chartCard: { 
    width: '100%', 
    backgroundColor: '#4A7C00', 
    borderRadius: 20, 
    padding: 20, 
    marginTop: 5 
  },
  chartTitle: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  chartContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    height: 100, 
    paddingHorizontal: 10 
  },
  chartBar: { 
    width: 14, 
    backgroundColor: '#FFF', 
    borderRadius: 3 
  },

  // ESTILOS EXCLUSIVOS DO MODAL DE SENHA:
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  passwordCard: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
    marginBottom: 20,
  },
  modalInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F0',
    borderWidth: 1,
    borderColor: '#E6E4DC',
    borderRadius: 30,
    width: '100%',
    height: 48,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  modalInput: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 15,
  },
  btnSalvar: {
    backgroundColor: '#4A7C00', 
    width: '100%',
    height: 46,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btnSalvarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnCancelar: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancelarText: {
    color: '#666',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});