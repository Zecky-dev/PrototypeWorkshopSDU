import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({

    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 8,
        padding: 8
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

    imageContainer: {
        alignItems: 'center',
        flex: 0.4
    },

    image: {
        borderRadius: 12,
        width: 120,
        height: 120,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 0.6
    },

    name: {
        color: "black",
        fontWeight: "bold",
        fontSize: 24,
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