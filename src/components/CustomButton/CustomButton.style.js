import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginVertical: 4
    },
    icon:{
        marginRight:8,
    }
});