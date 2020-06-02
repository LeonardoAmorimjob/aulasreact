import React,{Component} from 'react';
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import { Keyboard,ActivityIndicator} from 'react-native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
        Container,
        SubmitButton,
        Input,Form,
        List,Avatar,
        Usuario,
        Bio,
        IrParaPerfil,
        IrParaPrefilTexto,
        Nome
       } from './estilo';


export default class Principal extends Component {
  state={
    novoUsuario:'',
    usuarios:[],
    loading:false
  }


  async componentDidMount(){
      const usuarios=await AsyncStorage.getItem('usuarios');
      if(usuarios){
        this.setState({
          usuarios:JSON.parse(usuarios)
        })
      }
  }

 componentDidUpdate(_,prevState){
  const{usuarios}=this.state;
  if (prevState.usuarios!==usuarios ){
     AsyncStorage.setItem('usuarios',JSON.stringify(usuarios))
  }

}

  btnAddUsuario=async ()=>{
    const {usuarios, novoUsuario}=this.state;
    this.setState({
      loading:true
    });

    const res=await api.get(`/users/${novoUsuario}`)
    const data={
      nome: res.data.name,
      login:res.data.login,
      bio:res.data.bio,
      avatar:res.data.avatar_url

    }
    this.setState({
      usuarios:[...usuarios,data],
      novoUsuario:'',
      loading:false
    });
    Keyboard.dismiss()

  }
  navegar=(usuario)=>{
    const{navigation}=this.props;

  navigation.navigate('Usuario',{usuario})

  }
  render(){
    const{usuarios,novoUsuario,loading}=this.state;
    return (
      <Container>
       <Form >
        <Input autocorrect={false}
        autoCapitalize="none"
        placeholder="add usuario"
        value={novoUsuario}
        onChangeText={text=>this.setState({novoUsuario:text})}
        returnKeyType="send"
        onSubmitEditing={this.btnAddUsuario}/>


        <SubmitButton loading={loading}
        onPress={this.btnAddUsuario}
        >
          {loading?<ActivityIndicator  size={20}color="#fff"/>:<Icon name="add" size={20} color="#fff"/>}
        </SubmitButton>
       </Form>
       <List
       data={usuarios}
       keyExtractor={usuario=>usuario.login}
       renderItem={({item})=>(
        <Usuario>
          <Avatar source={{uri:item.avatar}}/>
          <Nome>
            {item.nome}
          </Nome>
          <Bio>{item.bio}</Bio>
          <IrParaPerfil onPress={()=>this.navegar(item)}>
            <IrParaPrefilTexto>perfil</IrParaPrefilTexto>
          </IrParaPerfil>

        </Usuario>

       )
       }/>


     </Container>

    );

  }

}


