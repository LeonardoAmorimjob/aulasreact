import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import Container from '../../component/index';
import { Form, SubmitButton, Listar } from './estilo';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositorios: [],
    loading: false,
  };

  componentDidMount() {
    const repositorios = localStorage.getItem('repositorios');
    if (repositorios) {
      this.setState({ repositorios: JSON.parse(repositorios) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositorios } = this.state;
    if (prevState.repositorios !== repositorios) {
      localStorage.setItem('repositorios', JSON.stringify(repositorios));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { newRepo, repositorios } = this.state;

    const res = await api.get(`/repos/${newRepo}`);
    const data = {
      name: res.data.full_name,
    };
    this.setState({
      repositorios: [...repositorios, data],
      newRepo: '',
      loading: false,
    });
    console.log(res);
  };

  render() {
    const { newRepo, repositorios, loading } = this.state;
    console.log(loading);
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton load={loading}>
            {loading ? (
              <FaSpinner color="#fff" size="14" />
            ) : (
              <FaPlus color="#fff" size="14" />
            )}
          </SubmitButton>
        </Form>
        <Listar>
          {repositorios.map((repositorio) => (
            <li key={repositorio.name}>
              <span>{repositorio.name}</span>
              <Link to={`/repositorio/${encodeURIComponent(repositorio.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </Listar>
      </Container>
    );
  }
}
