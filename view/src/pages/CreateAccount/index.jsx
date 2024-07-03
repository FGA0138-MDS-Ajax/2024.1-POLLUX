/*
  Página para criar conta, a qual somente o admin tem acesso.
  Este componente é responsável pela criação de uma nova conta de usuário.
  Inclui um formulário para entrada de dados do usuário, manipulação de estados
  para erros de validação, e chamada de API para criação do usuário no backend.
*/

import { useState, useEffect } from "react";
import "./CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../queries/user";
import { parseFormData } from "../../utils/parseFormData";

function CreateAccount() {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    matricula: "",
    senha: "",
  });
  const navigate = useNavigate()

  // Define o título da página ao montar o componente

  useEffect(() => {
    document.title = 'Criar Conta';
  }, []);

  // Função para criar um novo usuário chamando a API

  const newUser = async (userData) => {
    try {
      await createUser(userData);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  // Manipula o envio do formulário, realiza validações e 
  // chama a função de criação de usuário

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = parseFormData(new FormData(e.target));
    if (dados.password !== dados.confirmPassword) {
      setErrors((prev) => ({ ...prev, password: "As senhas não conferem" }));
      return;
    }
    await newUser({
      nome: dados.nome,
      matricula: dados.matricula,
      email: dados.email,
      senha: dados.password,
      acesso: {
        acesso_documents: dados.acesso_documents ?? false,
        acesso_meetings: dados.acesso_meetings ?? false,
        acesso_calendar: dados.acesso_calendar ?? false,
        acesso_finance: dados.acesso_finance ?? false,
        acesso_admin: dados.acesso_admin ?? false,
      },
    })
    navigate("/admin")
  };

  return (
    <>
      <div id="paginaCreateAccount">
        <div className="divC">
          <Link to="/admin">
            <img className="img-setaCreat" src="/seta.svg" alt="seta" />
          </Link>
          <span className="title">EDRA</span>
          <span className="sub-title">Registro</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" name="nome" />
            <input
              type="text"
              placeholder="Matrícula"
              maxLength={9}
              pattern="[0-9]+"
              name="matricula"
            />
            {errors.registration && (
              <span className="error">{errors.registration}</span>
            )}
            {errors.name && <span className="error">{errors.name}</span>}
            <input type="text" placeholder="E-Mail" name="email" />
            <input type="password" name="password" placeholder="Senha" />
            <input type="password" name="confirmPassword" placeholder="Confirmar Senha" />
            <fieldset>
              <legend>Acessos</legend>
              <div>
                <input
                  type="checkbox"
                  name="acesso_documents"
                  defaultChecked={false}
                  value={true}
                />
                <label> Documentos </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="acesso_meetings"
                  defaultChecked={false}
                  value={true}
                />
                <label> Reuniões </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="acesso_calendar"
                  defaultChecked={false}
                  value={true}
                />
                <label> Calendário </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="acesso_finance"
                  defaultChecked={false}
                  value={true}
                />
                <label> Financeiro </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="acesso_admin"
                  defaultChecked={false}
                  value={true}
                />
                <label> Tela Admin </label>
              </div>
            </fieldset>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <button type="submit">CRIAR CONTA</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
