/*
  Página detalhe, responsável por exibir os detalhes do usuário logado,
  incluindo a funcionalidade de alterar a senha.
  Apenas o admin é redirecionado para a página admin.
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import SideBar from "../../components/SideBar";
import { editPassword } from "../../queries/user";
import axios from "axios";

function Detail() {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaMatch, setSenhaMatch] = useState(true);
  const [userId, setUserId] = useState("");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  // Define o título da página e recupera os dados do usuário ao montar o componente

  useEffect(() => {
    document.title = 'Detalhe';
    try {
      var cookieValue = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value),
          }),
          {}
        );
      let token = cookieValue.jwtToken.toString();
      axios
        .post("http://18.209.49.236:3000/users/token", {
          token: token,
        })
        .then(function (response) {
          if (!(response.data < 0)) {
            setUsuario(response.data.nome);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setMatricula(response.data.matricula);
            setUserId(response.data.id);
            axios.get("http://18.209.49.236:3000/users/" + response.data.id).then(function (resposta) {
              if (resposta.data.acesso.acesso_admin) {
                const estiloBotao = {
                  opacity: 1.0, // Define a opacidade desejada aqui
                };
                setAdmin(resposta.data.acesso.acesso_admin);
              } else {
                const estiloBotao = {
                  opacity: 0.0, // Define a opacidade desejada aqui
                };
              }
            });
          } else {
            navigate("/login");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      navigate("/login");
    }
  }, []);

  // Função para exibir o popup de alteração de senha

  const handleAlterarSenha = () => {
    setMostrarPopup(true);
  };

  // Função para fechar o popup de alteração de senha

  const fecharPopup = () => {
    setNovaSenha("");
    setConfirmarSenha("");
    setMostrarPopup(false);
    setSenhaMatch(true); // Reinicia o estado para que a mensagem de erro desapareça quando o popup for fechado
  };

  // Função para alterar a senha do usuário chamando a API

  const alterarSenha = async (userId, newData) => {
    try {
      await editPassword(userId, newData);
      alert("Senha alterada com sucesso!");
      fecharPopup();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  // Manipula o envio do formulário de alteração de senha

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Verifica se as senhas são iguais
    if (novaSenha === confirmarSenha) {
      // Lógica para enviar a nova senha ao backend e fechar o popup
      try {
        await editPassword(userId, {
          senha: novaSenha
        });
        setNovaSenha("");
        setConfirmarSenha("");
        setMostrarPopup(false);
        setSenhaMatch(true); // Reinicia o estado para que a mensagem de erro desapareça*/
      } catch (error) {
        alert("Erro ao editar a senha!");
      }
    } else {
      setSenhaMatch(false); // Exibe mensagem de erro
    }
  };

  // Função para redirecionar para a página de administração se o usuário for admin

  const AdminTela = () => {
    console.log(admin);
    if (admin) {
      navigate("/Admin"); // Redireciona para pag Admin
    }
  };

  return (
    <>
      <SideBar />
      <section className="containerDetail">
        <img className="edraDetail" src="/edraV.svg" alt="logo edraV" />
        <div className="conteudo1">
          <p>Olá {usuario}!</p>
        </div>

        <div className="conteudo2">
          <p> Nome: {nome} </p>
          <p> Matrícula: {matricula} </p>
          <p> E-mail: {email} </p>
        </div>

        <div className="conteudo3">
          <button onClick={handleAlterarSenha}>Alterar senha</button>
          <button className={`botaoAdmin ${!admin ? 'botaoNAOAdmin' : ''}`} onClick={AdminTela}>
            Gerenciamento
          </button>
          {mostrarPopup && (
            <div className="popupContainer">
              <div className="alterarSenhaPopup">
                <span className="fecharPopup" onClick={fecharPopup}>
                  &times;
                </span>
                <h2>Alterar Senha</h2>
                <form onSubmit={handleSubmit}>
                  <label>Nova Senha:</label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                  <label>Confirmar Senha:</label>
                  <input
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                  {!senhaMatch && (
                    <p className="erroSenha">As senhas não coincidem.</p>
                  )}
                  <button type="submit">Salvar</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Detail;
