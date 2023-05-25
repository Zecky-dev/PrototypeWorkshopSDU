import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: colors.grey,
        borderRadius: 8,
        margin: 8,
        padding: 8
    },

    cupboard: {
        color: 'black',
        flex:1,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8,
        padding: 4,
        borderRadius: 4,
    },

    middleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },


    image: {
        borderRadius: 12,
        width: 120,
        height: 120,
        marginRight:8
    },

 

    name: {
        flex:1,
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize"
    },

    available: {
        active: {
            color: colors.active,
            fontWeight: 'bold',
            marginLeft:8
        },
        passive: {
            color: colors.passive,
            fontWeight: 'bold',
            marginLeft:8
        }
    },


    buttonContainer: {
        flexDirection: 'row'
    }

});