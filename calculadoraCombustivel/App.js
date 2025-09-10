import { useState } from 'react';
import { StyleSheet, Text, View , Image, TextInput, Button} from 'react-native';
import logo from './assets/bomba-de-gasolina.png'


export default function App() {

  const [Alcool,setAlcool] = useState()
  const [gasolina,setGasolina] = useState()
  
  function calcular(){
    let alv = Alcool
    let gasl = gasolina 
    var n = null
  
    if(alv || gasl){
      var al = alv.replace(',','.')
      var gas = gasl.replace(',','.')
    }else{
      al = n
      gas = n
    }
    var resultado = al/gas

    if(al == 0 || al == n || gas == 0 || gas == n || gas < 1 || al < 1  ){

      alert(" valor inválido")
      
    }else {
      if(resultado < 0.7){
        alert("a recomendação é abastecer com álcool")
      }else{
        alert("a recomendação é abastecer com gasolina")
      }
    }
    
  }

  return (

    

    <View style={styles.container}>
      <Image source={logo} style={styles.img} />
      <Text style={styles.Text}>Qual a melhor opção</Text>

      <Text style={styles.label}>Álcool (preço por litro):</Text>
      <TextInput
      value={Alcool}
      onChangeText={text => setAlcool(text)} 
      keyboardType='numeric'
      style={styles.in} 
      placeholder='Álcool'>
      </TextInput>

      <Text style={styles.label}>
        Gasolina (preço por litro):
      </Text>

      <TextInput 
      value={gasolina}
      onChangeText={text=>setGasolina(text)}
      keyboardType='numeric' 
      style={styles.in}  
      placeholder='gasolina'>
      </TextInput>
      <Button style={styles.but} title='calcular' onPress={calcular}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e85d6a2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    fontSize: 36,
    padding:10,
    top: -1,
    fontWeight: 'bold'
    
  },
  img:{
    width: 200,
    height:200,
    justifyContent:'center',
    alignItems:'center',
    top: -30,
    left:15
  },
  in:{
    backgroundColor:'rgba(235, 235, 224, 1)',
    width:300,
    textAlign: 'center',
    borderRadius:30,
    marginBottom:15

  },
  label:{
    fontSize:20,
    padding:16
  },
  but:{
    
  }


});
