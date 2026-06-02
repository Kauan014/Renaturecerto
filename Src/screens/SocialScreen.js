import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { useState, useContext } from 'react'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext'; 

export default function SocialScreen() {
  const { user } = useContext(AuthContext); 
  
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState('todos'); 

  const nomeUsuario = user?.email 
    ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
    : 'Pedro Silva';

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <Text style={styles.headerTitle}>COMUNIDADE</Text>
          {filtro !== 'todos' && (
            <TouchableOpacity style={styles.badgeFiltro} onPress={() => setFiltro('todos')}>
              <Text style={styles.badgeText}>
                {filtro === 'perfil' && 'Perfil ✕'}
                {filtro === 'noticias' && 'Notícias ✕'}
                {filtro === 'curiosidades' && 'Curiosidades ✕'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <MaterialCommunityIcons name="dots-vertical" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* --- MENU FLUTUANTE --- */}
      {menuAberto && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity 
            style={styles.menuItem} 
            activeOpacity={0.8}
            onPress={() => {
              setFiltro('perfil');
              setMenuAberto(false);
            }}
          >
            <Text style={styles.menuItemText}>Perfil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem} 
            activeOpacity={0.8}
            onPress={() => {
              setFiltro('noticias');
              setMenuAberto(false);
            }}
          >
            <Text style={styles.menuItemText}>Notícias</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomWidth: 0 }]} 
            activeOpacity={0.8}
            onPress={() => {
              setFiltro('curiosidades');
              setMenuAberto(false);
            }}
          >
            <Text style={styles.menuItemText}>Curiosidades</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView 
        contentContainerStyle={styles.feedContainer} 
        showsVerticalScrollIndicator={true} 
        persistentScrollbar={true} 
      >
        
        {/* ==========================================
            PERFIL 
            ========================================== */}
        {filtro === 'perfil' && (
          <View style={styles.perfilContainer}>
            <View style={styles.profileCard}>
              <MaterialCommunityIcons name="account-circle" size={90} color="#FFF" />
              <Text style={styles.profileName}>{nomeUsuario}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'usuario@renature.com'}</Text>
              
              <View style={styles.profileStatsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>0</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>0</Text>
                  <Text style={styles.statLabel}>Pontos</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ==========================================
            FEED FILTRADO (NOTÍCIAS / CURIOSIDADES)
            ========================================== */}
        {filtro !== 'perfil' && (
          <>
            {/* POST 1: RENATURE */}
            {(filtro === 'todos' || filtro === 'noticias') && (
              <View style={styles.postBox}>
                <View style={styles.postHeader}>
                  <View style={styles.avatarRN}><Text style={styles.avatarTextRN}>RN</Text></View>
                  <Text style={styles.usernameText}>ReNature_oficial</Text>
                </View>
                <View style={styles.blueBanner}>
                  <Text style={styles.blueBannerTitle}>5 ações para</Text>
                  <Text style={styles.blueBannerTitle}>salvar o mundo</Text>
                  <MaterialCommunityIcons name="earth" size={70} color="#68D391" style={{ marginTop: 10 }} />
                </View>
                <View style={styles.interactionBar}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="heart-outline" size={26} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="bookmark-outline" size={26} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* POST 2: G1 NOTÍCIAS */}
            {(filtro === 'todos' || filtro === 'noticias') && (
              <View style={styles.postBox}>
                <View style={styles.postHeader}>
                  <View style={styles.avatarG1}><Text style={styles.avatarTextG1}>g1</Text></View>
                  <Text style={styles.usernameText}>G1_notícias</Text>
                </View>
                <View style={styles.g1TextBox}>
                  <Text style={styles.g1TextTitle}>Saiba como separar o lixo para reciclagem</Text>
                  <Text style={styles.g1TextParagraph}>
                    A forma mais simples de fazer a reciclagem de lixo doméstico consiste em separar seus resíduos em duas categorias: recicláveis e não recicláveis.
                  </Text>
                </View>
                <View style={styles.interactionBar}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="heart-outline" size={26} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="bookmark-outline" size={26} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* POST 3: CARLOS SILVA */}
            {(filtro === 'todos' || filtro === 'curiosidades') && (
              <View style={styles.postBox}>
                <View style={styles.postHeader}>
                  <View style={styles.avatarUser}><MaterialCommunityIcons name="account" size={22} color="#FFF" /></View>
                  <Text style={styles.usernameText}>Carlos_Silva22</Text>
                </View>
                <View style={styles.appTextBox}>
                  <Text style={styles.appTextTitle}>🏆 Consegui meus primeiros 5000 Pontos!</Text>
                  <Text style={styles.appTextParagraph}>
                    Galera, acabei de levar 12kg de garrafas PET no ponto de coleta do shopping que achei pelo MAPA do ReNature. Meus créditos já caíram na conta, bora trocar por cupons!
                  </Text>
                </View>
                <View style={styles.interactionBar}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="heart" size={26} color="#DC2626" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="bookmark-outline" size={26} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* POST 4: UNISAGRADO */}
            {(filtro === 'todos' || filtro === 'noticias') && (
              <View style={styles.postBox}>
                <View style={styles.postHeader}>
                  <View style={styles.avatarUnisagrado}><MaterialCommunityIcons name="school" size={18} color="#FFF" /></View>
                  <Text style={styles.usernameText}>Unisagrado</Text>
                </View>
                <View style={styles.odsBanner}>
                  <MaterialCommunityIcons name="globe-model" size={40} color="#1A365D" />
                  <Text style={styles.odsBannerTitle}>OBJETIVOS</Text>
                  <Text style={styles.odsBannerSubtitle}>DE DESENVOLVIMENTO SUSTENTÁVEL</Text>
                </View>
                <View style={styles.interactionBar}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="heart-outline" size={26} color="#333" /></TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="#333" /></TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="bookmark-outline" size={26} color="#333" /></TouchableOpacity>
                </View>
              </View>
            )}

            {/* POST 5: RENATURE ALERTA */}
            {(filtro === 'todos' || filtro === 'noticias') && (
              <View style={styles.postBox}>
                <View style={styles.postHeader}>
                  <View style={styles.avatarRN}><Text style={styles.avatarTextRN}>RN</Text></View>
                  <Text style={styles.usernameText}>ReNature_oficial</Text>
                </View>
                <View style={styles.greenAlertBox}>
                  <Text style={styles.greenAlertTitle}>🚀 NOVO PONTO DE COLETA ADICIONADO</Text>
                  <Text style={styles.greenAlertParagraph}>
                    Atendendo aos pedidos da comunidade, adicionamos um novo ecoponto exclusivo para descarte de lixo eletrônico (baterias, pilhas e celulares velhos). Abra a aba MAPA para ver a rota!
                  </Text>
                </View>
                <View style={styles.interactionBar}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="heart-outline" size={26} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="bookmark" size={26} color="#4A7C00" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* POST 6: ECO DICAS */}
            {(filtro === 'todos' || filtro === 'curiosidades') && (
              <View style={styles.postBox}>
                <View style={styles.postHeader}>
                  <View style={styles.avatarEco}><MaterialCommunityIcons name="leaf" size={20} color="#FFF" /></View>
                  <Text style={styles.usernameText}>EcoVida_Dicas</Text>
                </View>
                <View style={styles.g1TextBox}>
                  <Text style={styles.g1TextTitle}>Quanto tempo o plástico demora para sumir?</Text>
                  <Text style={styles.g1TextParagraph}>
                    Uma simples sacola plástica descartada incorretamente pode levar até 450 anos para se decompor na natureza. Prefira sempre sacolas retornáveis e recicle suas embalagens no ReNature!
                  </Text>
                </View>
                <View style={styles.interactionBar}>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="heart-outline" size={26} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="bookmark-outline" size={26} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// --- ESTILIZAÇÃO ---
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
    justifycontent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 30 
  },
  headerLeftContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flex: 1, 
    paddingRight: 15 
  },
  headerTitle: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    letterSpacing: 0.5 
  },
  badgeFiltro: { 
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 12, 
    marginLeft: 10 
  },
  badgeText: { 
    color: '#FFF', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  dropdownMenu: { 
    position: 'absolute', 
    top: 100, 
    right: 0, 
    width: '55%', 
    backgroundColor: '#4A7C00', 
    zIndex: 999, 
    borderLeftWidth: 1.5, 
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.4)' 
  },
  menuItem: { 
    paddingVertical: 14, 
    paddingHorizontal: 18, 
    borderBottomWidth: 1.5, 
    borderBottomColor: 'rgba(255, 255, 255, 0.4)' 
  },
  menuItemText: { 
    color: '#FFF', 
    fontSize: 21, 
    fontWeight: 'bold' 
  },
  feedContainer: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 40 
  },
  postBox: { 
    width: '100%', 
    marginBottom: 25 
  },
  postHeader: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10 
  },
  usernameText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000', 
    marginLeft: 10 
  },
  avatarRN: { 
    width: 40, 
    height: 40, 
    borderRadius: 20,
    borderWidth: 1.5, 
    borderColor: '#000', 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarTextRN: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    color: '#4A7C00' 
  },
  avatarG1: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#C8102E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarTextG1: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#FFF' 
  },
  avatarUnisagrado: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#7A1C1C', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarUser: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#3182CE', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarEco: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#2F855A', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  blueBanner: { 
    width: '100%', 
    height: 190, 
    backgroundColor: '#427cb6', 
    borderRadius: 4, 
    borderWidth: 1.5, 
    borderColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 10 
  },
  blueBannerTitle: { 
    color: '#FFF', 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  g1TextBox: { 
    width: '100%', 
    backgroundColor: '#FFF', 
    borderWidth: 1.5, 
    borderColor: '#000', 
    padding: 15, 
    borderRadius: 4 
  },
  g1TextTitle: { 
    fontSize: 19, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 8, 
    lineHeight: 24 
  },
  g1TextParagraph: { 
    fontSize: 12, 
    color: '#555', 
    lineHeight: 16 
  },
  appTextBox: { 
    width: '100%',
    backgroundColor: '#EBF8FF', 
    borderWidth: 1.5, 
    borderColor: '#3182CE', 
    padding: 15, 
    borderRadius: 10 
  },
  appTextTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2B6CB0', 
    marginBottom: 6 
  },
  appTextParagraph: { 
    fontSize: 13, 
    color: '#2D3748', 
    lineHeight: 18 
  },
  greenAlertBox: { 
    width: '100%', 
    backgroundColor: '#E6FFFA', 
    borderWidth: 1.5, 
    borderColor: '#319795', 
    padding: 15, 
    borderRadius: 10 
  },
  greenAlertTitle: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#234E52', 
    marginBottom: 6 
  },
  greenAlertParagraph: { 
    fontSize: 13, 
    color: '#2D3748', 
    lineHeight: 18 
  },
  odsBanner: { 
    width: '100%', 
    height: 150, 
    backgroundColor: '#FFF', 
    borderRadius: 4, 
    borderWidth: 1.5, 
    borderColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10 
  },
  odsBannerTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#1A365D', 
    letterSpacing: 1 
  },
  odsBannerSubtitle: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#4A5568' 
  },
  interactionBar: { 
    flexDirection: 'row', 
    marginTop: 8, 
    paddingLeft: 2 
  },
  iconButton: { 
    marginRight: 15 
  },
  perfilContainer: { 
    width: '100%', 
    alignItems: 'center', 
    paddingTop: 10 
  },
  profileCard: { 
    width: '100%', 
    backgroundColor: '#4A7C00', 
    borderRadius: 15, 
    padding: 25, 
    alignItems: 'center', 
    elevation: 4 
  },
  profileName: { 
    color: '#FFF', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  profileEmail: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: 14, 
    marginTop: 4 
  },
  profileStatsRow: { 
    flexDirection: 'row', 
    marginTop: 20, 
    width: '100%', 
    justifyContent: 'space-around', 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.2)', 
    paddingTop: 15 
  },
  statBox: { 
    alignItems: 'center' 
  },
  statNumber: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  statLabel: { 
    color: 'rgba(255,255,255,0.7)', 
    fontSize: 12 
  }
});