import {StyleSheet,Dimensions} from 'react-native';
export default StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent:'space-around',
    },
    title: {
        fontSize: 36,
        color: 'black',
        fontWeight: '300',
        marginBottom:16
    },    
});