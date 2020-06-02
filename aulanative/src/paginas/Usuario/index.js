import React, { Component } from 'react';


 import {
   Container,
   Header,
   Avatar,
   Nome,
   Bio,
   Estrela,
   Estrelado,
   AvatarAutor,
   Titulo,
   Autor,
   Info,
   } from './estilo';
import api from '../../services/api';

export default class Usuario extends Component {
state={
  estrelas:[],

}
  async componentDidMount(){
    const {route}=this.props;
    const usuario=route.params.usuario
    const res=await api.get(`/users/${usuario.login}/starred`);

    this.setState({
      estrelas:res.data
    })
  }

  render(){
    const {route}=this.props;
    const {estrelas}=this.state;
    console.tron.log(estrelas)
    const usuario=route.params.usuario;
    return (
      <Container>
        <Header>
          <Avatar source={{uri:usuario.avatar }} />
          <Nome>
            {usuario.nome}
          </Nome>
          <Bio>{usuario.bio}</Bio>
       </Header>
       <Estrela
         data={estrelas}
         keyExtractor={estrela=>String(estrela.id)}
         renderItem={({item})=>(
          <Estrelado>
            <AvatarAutor source={{uri:item.owner.avatar_url}}/>
            <Info>
              <Titulo>
                  {item.name}
                </Titulo>
                <Autor>
                  {item.owner.login}
                </Autor>
                </Info>
          </Estrelado>
        )}/>

      </Container>
    );
  }

}
