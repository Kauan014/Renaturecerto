import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Dimensions,
  Alert,
  Platform 
} from 'react-native';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MapScreen({ navigation }) {
  const [regiao, setRegiao] = useState({
    latitude: -22.3241,
    longitude: -49.0792,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [busca, setBusca] = useState('');
  
  const [exibirEcoPontos, setExibirEcoPontos] = useState(true);
  const [exibirLojasParceiras, setExibirLojasParceiras] = useState(true);

  const pontosColeta = [
    { id: 1, titulo: 'EcoPonto Centro', desc: 'Reciclagem de PET e Papel', lat: -22.3210, lng: -49.0750 },
    { id: 2, titulo: 'Ponto Eletrônicos Jardim Estoril', desc: 'Descarte de pilhas e baterias', lat: -22.3310, lng: -49.0820 },
  ];

  const lojasParceiras = [
    { id: 3, titulo: 'Supermercado Parceiro Green', desc: 'Troque seus pontos por descontos aqui', lat: -22.3260, lng: -49.0690 },
    { id: 4, titulo: 'Farmácia EcoVida', desc: 'Descontos especiais com créditos RN', lat: -22.3180, lng: -49.0850 },
  ];

  const executarBusca = () => {
    if (!busca.trim()) return;
    
    if (Platform.OS === 'web') {
      alert(`Buscando por: "${busca}"...`);
    } else {
      Alert.alert("Busca de Local", `Buscando por: "${busca}"...`);
    }

    setRegiao({
      ...regiao,
      latitude: -22.3241 + (Math.random() - 0.5) * 0.01,
      longitude: -49.0792 + (Math.random() - 0.5) * 0.01,
    });
  };

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
          <Text style={styles.headerTitle}>MAPA</Text>
        </TouchableOpacity>
      </View>

      {/* --- BARRA DE PESQUISA INTEGRADA --- */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite seu bairro ou cidade..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={executarBusca}
        />
        <TouchableOpacity style={styles.searchButton} onPress={executarBusca}>
          <MaterialCommunityIcons name="magnify" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* --- RENDERIZAÇÃO DO MAPA (HÍBRIDA WEB/NATIVO) --- */}
      {Platform.OS === 'web' ? (
        // 🛠️ SE FOR EXECUTADO NA WEB: Mostra maquete interativa para não quebrar o navegador
        <View style={[styles.mapa, styles.webMapContainer]}>
          <MaterialCommunityIcons name="map" size={50} color="#A0AEC0" />
          <Text style={styles.webMapTitle}>Visualização de Mapa (Modo Web)</Text>
          <Text style={styles.webMapSubtitle}>Os filtros abaixo funcionam em tempo real!</Text>
          
          <ScrollView style={styles.webList}>
            {exibirEcoPontos && pontosColeta.map(ponto => (
              <View key={ponto.id} style={styles.webItemRow}>
                <MaterialCommunityIcons name="recycle" size={20} color="#4A7C00" style={{ marginRight: 8 }} />
                <Text style={{ fontWeight: 'bold', color: '#1A202C' }}>{ponto.titulo} <Text style={{ fontWeight: 'normal', color: '#718096', fontSize: 13 }}>\n{ponto.desc}</Text></Text>
              </View>
            ))}
            
            {exibirLojasParceiras && lojasParceiras.map(loja => (
              <View key={loja.id} style={styles.webItemRow}>
                <MaterialCommunityIcons name="store" size={20} color="#3182CE" style={{ marginRight: 8 }} />
                <Text style={{ fontWeight: 'bold', color: '#1A202C' }}>{loja.titulo} <Text style={{ fontWeight: 'normal', color: '#718096', fontSize: 13 }}>\n{loja.desc}</Text></Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        // SE FOR EXECUTADO NO ANDROID STUDIO: Ativa o mapa original do Google Maps
        <MapView 
          style={styles.mapa}
          region={regiao}
          onRegionChangeComplete={setRegiao}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {exibirEcoPontos && pontosColeta.map(ponto => (
            <Marker
              key={ponto.id}
              coordinate={{ latitude: ponto.lat, longitude: ponto.lng }}
              title={ponto.titulo}
              description={ponto.desc}
              pinColor="#4A7C00" 
            />
          ))}

          {exibirLojasParceiras && lojasParceiras.map(loja => (
            <Marker
              key={loja.id}
              coordinate={{ latitude: loja.lat, longitude: loja.lng }}
              title={loja.titulo}
              description={loja.desc}
              pinColor="#3182CE" 
            />
          ))}
        </MapView>
      )}

      {/* --- MENU INFERIOR DE FILTROS --- */}
      <View style={styles.footerMenu}>
        
        {/* Botão Eco Pontos */}
        <TouchableOpacity 
          style={[styles.footerOption, !exibirEcoPontos && styles.disabledOption]}
          activeOpacity={0.7}
          onPress={() => setExibirEcoPontos(!exibirEcoPontos)}
        >
          <View style={styles.iconContainerVerde}>
            <MaterialCommunityIcons name="recycle" size={24} color="#FFF" />
          </View>
          <Text style={styles.footerText}>Eco Pontos</Text>
          <MaterialCommunityIcons 
            name={exibirEcoPontos ? "eye" : "eye-off"} 
            size={18} 
            color="rgba(255,255,255,0.6)" 
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {/* Botão Lojas Parceiras */}
        <TouchableOpacity 
          style={[styles.footerOption, { borderBottomWidth: 0 }, !exibirLojasParceiras && styles.disabledOption]}
          activeOpacity={0.7}
          onPress={() => setExibirLojasParceiras(!exibirLojasParceiras)}
        >
          <View style={styles.iconContainerAzul}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#FFF" />
          </View>
          <Text style={styles.footerText}>Lojas Parceiras</Text>
          <MaterialCommunityIcons 
            name={exibirLojasParceiras ? "eye" : "eye-off"} 
            size={18} 
            color="rgba(255,255,255,0.6)" 
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F0',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#4A7C00',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  searchContainer: {
    position: 'absolute',
    top: 115,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    width: 50,
    height: 46,
    backgroundColor: '#4A7C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  mapa: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 250, 
    flex: 1,
  },
  // Estilos exclusivos adicionados para simulação Web
  webMapContainer: {
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  webMapTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A5568', marginTop: 10 },
  webMapSubtitle: { fontSize: 13, color: '#718096', marginBottom: 15 },
  webList: { width: '100%', flex: 1 },
  webItemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#CBD5E0' },
  
  footerMenu: {
    width: '100%',
    backgroundColor: '#3E6600', 
    paddingVertical: 5,
  },
  footerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  disabledOption: {
    opacity: 0.4, 
  },
  iconContainerVerde: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#2F855A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconContainerAzul: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#3182CE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  footerText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
});