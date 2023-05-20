import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
        flexDirection:'row',
        justifyContent:'center',
    },
    label: {
        color: colors.white,
    }
});