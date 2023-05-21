import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        justifyContent:'center',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    innerContainer: {
        padding:8,
    },
    imageContainer: {
        alignItems:'center',
    },  
    image: {
        width: 300,
        height: 300,
    },
    input: {
        container: {
            marginVertical: 8,
        },
        label: {
            marginBottom: 4,
            fontSize: 18,
            color: colors.white,
        }
    },
    buttonContainer: {
        width: '100%',
        justifyContent:'space-around',
        flexDirection: 'row',
        marginTop: 12,
    }



});