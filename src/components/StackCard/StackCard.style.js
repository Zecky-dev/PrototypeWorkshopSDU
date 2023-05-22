import { StyleSheet,Dimensions } from 'react-native'

export default StyleSheet.create({
    container:{
        backgroundColor: 'gray', 
        width: Dimensions.get('screen').width / 2-16,
        height: Dimensions.get('screen').height / 5,
        margin:8,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },

    text:{
        title_Text: {
             fontSize: 64, 
             color: 'black', 
             fontWeight: '500' 
            }
    }
})