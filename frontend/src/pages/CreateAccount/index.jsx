import React, { useState } from 'react';
import './CreateAccount.css';
import { Link } from 'react-router-dom';

function CreateAccount() {
  const [name, setName] = useState('');
  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
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

  //confere se as senhas são as mesmas
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setErrors({ ...errors, password: 'As senhas não conferem' });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ ...errors, password: 'As senhas não conferem' });
      return;
    }
    // os dados que o usuario mandou chegam aqui
    console.log('Nome:', name);
    console.log('Matrícula:', registration);
    console.log('Senha:', password);
    console.log('Confirmar Senha:', confirmPassword);

    //alerta pra ver se esta recebendo os valores
    alert("Matricula : " + registration +" Senha: " + password + "Nome: "+ name + "Senha confirmada: "+ confirmPassword);

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
            <button type="submit">CRIAR CONTA</button>
          </form>
          <p>Já tem conta? <a href='/login'>Entrar</a></p>
        </div>
      </body>
    </>
  );
}

export default CreateAccount;
