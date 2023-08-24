import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.headerTitle}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#007bff',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        paddingHorizontal: 15,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})