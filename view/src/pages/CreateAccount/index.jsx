import React, { useState } from 'react';
import './CreateAccount.css';
import { Link } from 'react-router-dom';
import { createUser } from '../../queries/user';
import axios from 'axios';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(''); // Novo estado para armazenar a função do usuário
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    registration: '',
    password: '',
  });

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z\s]/.test(value)) {
      setErrors({ ...errors, name: 'O nome não pode conter números ou caracteres especiais' });
    } else {
      setErrors({ ...errors, name: '' });
      setName(value);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegistrationChange = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setErrors({ ...errors, registration: 'A matrícula deve conter apenas números' });
    } else {
      setErrors({ ...errors, registration: '' });
      setRegistration(value);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setErrors({ ...errors, password: 'As senhas não conferem' });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleRoleChange = (e) => { // Função para lidar com a mudança de opção na dropbox
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ ...errors, password: 'As senhas não conferem' });
      return;
    }

    const userData = {
        nome: name,
        matricula: registration,
        email: email,
        senha: password,
        cargo_id: role // Atualizado para usar o estado da dropbox
    };

    const apiUrl = 'http://localhost:3000';
    axios.post("http://localhost:3000/users", userData)
    .then(response => {
        console.log('Usuário criado com sucesso:', response.data);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao criar o usuário:', error);
    });
  };

  return (
    <>
      <body id='paginaCreateAccount'>
        <div className='divC'>
          <Link to="/">
            <img className='img-setaCreat' src='/seta.svg' alt='seta' />
          </Link>
          <span className='title'>EDRA</span>
          <span className='sub-title'>Registro</span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Nome'
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && <span className='error'>{errors.name}</span>}
            <input
              type="text"
              placeholder='E-Mail'
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="text"
              placeholder='Matrícula'
              value={registration}
              onChange={handleRegistrationChange}
              maxLength={9}
              pattern='[1-9]*'
            />
            {errors.registration && <span className='error'>{errors.registration}</span>}
            <input
              type="password"
              placeholder='Senha'
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              placeholder='Confirmar Senha'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
            {/* Dropdown para selecionar o cargo */}
            <select value={role} onChange={handleRoleChange}>
              <option value="">Selecione o cargo</option>
              <option value="1">Cargo 1</option>
              <option value="2">Cargo 2</option>
              <option value="3">Cargo 3</option>
            </select>
            <button type="submit">CRIAR CONTA</button>
          </form>
          <p>Já tem conta? <a href='/login'>Entrar</a></p>
        </div>
      </body>
    </>
  );
}

export default CreateAccount;
