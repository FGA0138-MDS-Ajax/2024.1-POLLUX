import { useState } from 'react';
import './CreateAccount.css';
import { Link } from 'react-router-dom';
import { createUser } from '../../queries/user';

function CreateAccount() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [registration, setRegistration] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    registration: '',
    password: '',
  });

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z\s]/.test(value)) {
      setErrors(prev => ({ ...prev, name: 'O nome não pode conter números ou caracteres especiais' }));
    } else {
      setErrors(prev => ({ ...prev, name: '' })); //Essa função é assíncrona, não garante que vá pegar os erros se tiver setado como ...errors
      setName(value); // Tá tendo muitos setEstate, isso pode dar problema no tempo de renderização
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

  const newUser = async (userData) => {
    try {
      await createUser(userData)
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, password: 'As senhas não conferem' }));
      return;
    }

    await newUser({
      "nome": name,
      "matricula": registration,
      "email": email,
      "senha": password,
    })
  };

  return (
    <>
      <div id='paginaCreateAccount'>
        <div className='divC'>
          <Link to="/admin">
            <img className='img-setaCreat' src='/seta.svg' alt='seta' />
          </Link>
          <span className='title'>EDRA</span>
          <span className='sub-title'>Registro</span>
          <form onSubmit={handleSubmit}> {/* Como esse form ta como um input controlado daria pra usar formData */}
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
            <button type="submit">CRIAR CONTA</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
