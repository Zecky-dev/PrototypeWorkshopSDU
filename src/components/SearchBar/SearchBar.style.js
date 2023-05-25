import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.cream,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    icon: {
        color: 'black',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 8,
        paddingHorizontal: 4, 
        borderRadius: 8,
        color: 'black',
        fontSize: 18
    }
})