import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream
    },
    FAB: {
        position: 'absolute',
        right: 16,
        bottom: 16
    },
})