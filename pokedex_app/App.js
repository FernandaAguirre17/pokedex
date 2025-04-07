import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View> {/* Container Image */}
        <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"}}
        width={200}
        height={200}/>
      </View>
      <View> {/*Container Form*/}
        <Text style={styles.title}>Iniciar Sesion</Text> {/* tittle */}
        <Text style={styles.label}>Correo:</Text> {/* label */}
        <TextInput style={styles.input}/>
        <Text style={styles.label}>Contraseña:</Text> {/* label */}
        <TextInput style={styles.input}/>
        <Pressable style={styles.send}>
          <Text style={styles.send.textButton}>Enviar</Text>
        </Pressable>
      </View>
      <View> {/* Container footer */}
        <Text>¿Olvidaste tu contraseña?</Text>
        <Text>Registrate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:30,
    fontWeight:"bold",
  },
  label:{
    fontSize:20,
    fontWeight:"bold"
  },
  input:{
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    fontSize:20,
    width:"auto",
  },
  send:{
    backgroundColor:"red",
    width:"auto",
    height:"auto",
    borderRadius:10,
    marginTop:15,
    alignItems:"center",
    textButton:{
      color:"black",
      fontSize:20,
      fontWeight:"bold",
    }
  }
});
