import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SocialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Comunidade
      </Text>
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
  },
});