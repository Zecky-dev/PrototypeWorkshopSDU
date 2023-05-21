import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({
   
   container: {
    backgroundColor:colors.white,
    margin: 8,
   },
   
   
    infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    margin: 8,
    padding: 4,
    borderRadius: 4,
    },
   
    middleContainer: {
        justifyContent:'center',
        alignItems:'center',
    },
   
   
    image: {
    width: 80,
    height: 80,
    },
   
    name: {
    color:"black",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "capitalize"
   },

   available: {
    active: {
        color: colors.active,
        fontWeight: 'bold',
    },
    passive: {
        color: colors.passive,
        fontWeight: 'bold',
    }
   },


   buttonContainer: {
    flexDirection:'row',
   }

});