import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
export default StyleSheet.create({
    container: {
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
        width: 200,
        height: 200,
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
    }



});