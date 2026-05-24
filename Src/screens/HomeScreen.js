import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useContext } from 'react';

import { AuthContext } from '../context/authContext';

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tela Principal
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});