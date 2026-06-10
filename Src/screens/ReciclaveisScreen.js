import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

export default function ReciclaveisScreen({ navigation }) {
    const [materiais, setMateriais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarMateriais() {
            try {
                const querySnapshot = await getDocs(collection(db, "reciclaveis"));
                const listaMateriais = [];

                querySnapshot.forEach((doc) => {
                    listaMateriais.push({ id: doc.id, ...doc.data() });
                });

                setMateriais(listaMateriais);
            } catch (error) {
                console.error("Erro ao buscar dados do Firebase: ", error);
            } finally {
                setLoading(false);
            }
        }

        buscarMateriais();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#43A047" />
                <Text style={styles.loadingText}>Carregando materiais...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recicláveis</Text>
                <Text style={styles.subtitle}>
                    Dados vindos direto do Firebase na nuvem!
                </Text>
            </View>

            <View style={styles.cardContainer}>
                {materiais.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.card,
                            { borderLeftColor: item.cor_coleta || "#333" },
                        ]}
                    >
                        <Text
                            style={[styles.cardText, { color: item.cor_coleta || "#333" }]}
                        >
                            {item.categoria}
                        </Text>
                        <Text style={styles.cardDescription}>
                            {item.descricao || "Toque para saber mais sobre este material."}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Voltar para Home</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    loadingText: { marginTop: 10, color: "#666" },
    header: { marginTop: 40, marginBottom: 30 },
    title: { fontSize: 28, fontWeight: "bold", color: "#333" },
    subtitle: { fontSize: 14, color: "#43A047", marginTop: 5, fontWeight: "600" },
    cardContainer: { gap: 15 },
    card: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: { fontSize: 18, fontWeight: "bold" },
    cardDescription: { fontSize: 14, color: "#666", marginTop: 5 },
    backButton: {
        marginTop: 40,
        backgroundColor: "#333",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 30,
    },
    backButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
