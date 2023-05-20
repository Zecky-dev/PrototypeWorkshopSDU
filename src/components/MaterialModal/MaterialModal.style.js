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
        width:300,
        resizeMode:'contain'
    },
    inputArea: {
        flex:1,
        justifyContent:'center',
    },
    inputAreaInfo:{
        flex:1,
        justifyContent:'space-evenly',
        height:300
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
    },
    button_container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:32,
    },
    btn:{
        container:{
            justifyContent:'center',
            width: '80%'
        }
    }
})