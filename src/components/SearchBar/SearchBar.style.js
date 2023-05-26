import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        padding: 4
    },
    icon: {
        color: 'black',
    },
    input: {
        flex: 1,
        marginLeft: 8,
        paddingHorizontal: 4, 
        borderRadius: 8,
        color: 'black',
        fontSize: 18
    }
})