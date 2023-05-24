import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({

    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 8,
        padding: 8
    },

    cupboard: {
        color: 'black',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 8,
        padding: 4,
        borderRadius: 4,
    },

    middleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },


    image: {
        borderRadius: 12,
        width: 120,
        height: 120,
    },

 

    name: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize"
    },

    available: {
        active: {
            color: colors.active,
            fontWeight: 'bold',
        },
        passive: {
            color: colors.passive,
            fontWeight: 'bold',
        }
    },


    buttonContainer: {
        flexDirection: 'row'
    }

});