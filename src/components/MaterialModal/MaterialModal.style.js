import { StyleSheet,Dimensions } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        margin:24,
        backgroundColor:'#E40000'
    },
    modal_view: {
        flex:1,
    },
    image_container:{
        flex:1,
        marginTop:12,
        alignItems: 'center',
        justifyContent:'center',
    },
    image:{
        maxHeight:300,
        width:200,
        resizeMode:'contain'
    },
    inputArea: {
        flex:1,
        paddingHorizontal:8,
        justifyContent:'center',
    },
    text:{
        textAlign:'center',
        fontSize:20,
        fontWeight: '500',
        color:colors.white
    },
    text_input: {
        width: '100%'
    },
    picker:{ 
        color: colors.black ,
        backgroundColor: colors.white,
        marginVertical:8,
        marginHorizontal:8,
    }
})