import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { useContext } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../context/authContext';

export default function LoginScreen() {

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoContainer}>

        {/* Troque pela sua logo */}
        {/* <Image source={require('../../assets/logo.png')} /> */}

        <Text style={styles.logoText}>
          ReNature
        </Text>

        <View style={styles.line} />
      </View>


      {/* CARD */}
      <View style={styles.card}>

        <Text style={styles.title}>
          Bem-vindo
        </Text>

        <Text style={styles.description}>
          Entre com sua conta para acessar o aplicativo.
        </Text>


        {/* BOTÃO AUTH0 */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={login}
        >

          <MaterialCommunityIcons
            name="shield-account"
            size={26}
            color="#FFF"
          />

          <Text style={styles.loginButtonText}>
            Entrar com Auth0
          </Text>

        </TouchableOpacity>


        {/* LOGIN SOCIAL */}
        <View style={styles.socialContainer}>

          <View style={styles.socialItem}>
            <MaterialCommunityIcons
              name="google"
              size={32}
              color="#DB4437"
            />

            <Text style={styles.socialText}>
              Google
            </Text>
          </View>


          <View style={styles.socialItem}>
            <MaterialCommunityIcons
              name="facebook"
              size={32}
              color="#1877F2"
            />

            <Text style={styles.socialText}>
              Facebook
            </Text>
          </View>

        </View>


        <Text style={styles.footerText}>
          O login social será exibido automaticamente pelo Auth0.
        </Text>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F2E9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },


  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },


  logoText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#4A7C00',
  },


  line: {
    width: '70%',
    height: 2,
    backgroundColor: '#000',
    marginTop: 10,
  },


  card: {
    width: '100%',
    backgroundColor: '#4A7C00',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
  },


  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },


  description: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 35,
  },


  loginButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#111827',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },


  loginButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },


  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },


  socialItem: {
    alignItems: 'center',
  },


  socialText: {
    color: '#FFF',
    marginTop: 8,
    fontWeight: 'bold',
  },


  footerText: {
    color: '#E5E7EB',
    textAlign: 'center',
    fontSize: 13,
  },

});