import {StyleSheet,Dimensions} from 'react-native';
import colors from '../../utils/colors'
export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.cream,
        alignItems:'center',
        justifyContent:'center',
    },
    imageContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center'
    },
    formikContainer: {
        flex: 0.5
    },
    title: {
        fontSize: 36,
        color: 'black',
        fontWeight: '500',
        marginBottom:16
    },    
});