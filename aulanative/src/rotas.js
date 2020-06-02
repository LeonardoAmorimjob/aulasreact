import React from 'react'
import{ NavigationContainer}from '@react-navigation/native';
import{createStackNavigator}from '@react-navigation/stack'
import Principal from './paginas/Principal/index'
import Usuario from './paginas/Usuario/index'
const Stack=createStackNavigator()
function Rotas(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitleAlign:'center',
        headerBackTitle:false,
        headerStyle:{
          backgroundColor:'#22c90c',

        }, headerTintColor:'#fff'
      }}>
      <Stack.Screen  name="Principal"  component={Principal}
      options={
        {
          title:'Home',



      }} />
      <Stack.Screen name="Usuario" component={Usuario}
     options={({ route }) => ({ title: route.params.usuario.nome })}
      />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
