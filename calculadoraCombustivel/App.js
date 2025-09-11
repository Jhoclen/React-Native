import { useState } from 'react';
import {Container,Titulo,Label,Img,Input,Button} from './src/assets/styler'
import logo from './assets/bomba-de-gasolina.png'


export default function App() {

  const [Alcool,setAlcool] = useState()
  const [gasolina,setGasolina] = useState()
  
  
  function calcular(){

  
    function moneyNumber(value) {
     if (!value) return 0;

        
     let numericString = value.replace(/[^0-9,.-]/g, '');

     numericString = numericString.replace(/\./g, '');
        
     numericString = numericString.replace(',', '.');

     const number = parseFloat(numericString);

     return isNaN(number) ? 0 : number;
    }

    var n = null
    var al = moneyNumber(Alcool)
    var gas = moneyNumber(gasolina) 
    var resultado = al/gas

    if(al == 0 || al == n || gas == 0 || gas == n || gas < 1 || al < 1 ){

      alert("valor inválido")
      
    }else {
      if(resultado < 0.7){
        alert("a recomendação é abastecer com álcool")
      }else{
        alert("a recomendação é abastecer com gasolina")
      }
    }
  
    setAlcool('')
    setGasolina('')
    
  }

  return (

    <Container>
      <Img source={logo}  />
      <Titulo>Qual a melhor opção</Titulo>

      <Label>Álcool (preço por litro):</Label>
      <Input
      value={Alcool}
      onChangeText={text => setAlcool(text)} 
      keyboardType='numeric' 
      placeholder='Álcool'>
      
      </Input>

      <Label>
        Gasolina (preço por litro):
      </Label>

      <Input 
      value={gasolina}
      onChangeText={text=>setGasolina(text)}
      keyboardType='numeric'  
      placeholder='gasolina'>

      </Input>

      <Button 
       title='calcular'
       onPress={calcular}
       color='black'
      ></Button>
    </Container>
  );
}


