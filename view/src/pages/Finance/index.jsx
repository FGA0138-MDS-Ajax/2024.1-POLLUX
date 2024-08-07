/*
   Página de gestão financeira, utiliza:
  - useState para gerenciar estados locais para ano, mês, 
  ação, valor, tipo, ações, saldo e item.
  - useEffect para configurar o título da página e verificar a 
  autenticação do usuário através de cookies.
  - SideBar para navegação lateral.
  - funções assíncronas para obter, criar e deletar ações 
  financeiras através de requisições ao backend.
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Finance.css";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { createAction, deleteAction, getActions } from "../../queries/actions";
import { baseURL } from '../../config/baseurl';

function Finance() {
  const [showPopup, setShowPopup] = useState(false);
  const [ano, setAno] = useState("2024");
  const [mes, setMes] = useState("Junho");
  const [acao, setAcao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Entrada");
  const [acoes, setAcoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [item, setItem] = useState([]);
  const navigate = useNavigate();

  // Configurar o título da página e verificar a autenticação do usuário.
  // Utiliza um cookie jwtToken para determinar se o usuário está autenticado.
  // Redireciona para a página de detalhes se o usuário não tiver permissão de acesso financeiro.
  // Redireciona para a página de login se o token de autenticação não for válido.

  useEffect(() => {
    document.title = "Financeiro";
    get()
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
      // Verifica se o token de autenticação é válido e se o usuário tem acesso à gestão financeira
      axios
        .post(baseURL+"users/token", {
          token: token,
        })
        .then(function (response) {
          if (!(response.data < 0)) {
            axios
              .get(baseURL+"users/" + response.data.id)
              .then(function (resposta) {
                if (resposta.data.acesso.acesso_finance) {
                } else {
                  navigate("/detail");
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

  // Função para deletar uma ação financeira pelo seu ID.

  const deletaItem = async (id) => {
    await deleteAction({ id: id });
    get();
  };


  // Função para obter todas as ações financeiras do usuário através da API.
  // Calcula e atualiza o saldo total com base nas ações obtidas.

  const get = async () => {
    const response = await getActions();
    setItem(response.data);
    saldoTotal(response.data);
  };

  // Função para criar uma nova ação financeira, com título, valor, 
  // tipo, mês e ano. Atualiza a lista de ações e o saldo total após a criação.
  // Exibe um alerta em caso de erro ao criar a ação.

  const criarItem = async (titulo, valor, tipo, mes, ano) => {
    const bool = tipo === "Entrada" ? true : false;
    try {
      await createAction({
        titulo: titulo,
        valor: valor,
        tipo: bool,
        mes: mes,
        ano: ano,
        user_id: 1,
      });
      get()
    } catch (error) {
      console.log(error);
      alert("Erro ao criar a ação!");
    }
  };

  // Função para atualizar o estado do ano conforme o usuário seleciona um novo ano.

  const handleAnoChange = (e) => {
    setAno(e.target.value);
  };

  // Função para atualizar o estado do mês conforme o usuário seleciona um novo mês.

  const handleMesChange = (e) => {
    setMes(e.target.value);
  };

  // Função para atualizar o estado do título da ação conforme o usuário digita.

  const handleAcaoChange = (e) => {
    setAcao(e.target.value);
  };

  //Função para atualizar o estado do valor da ação conforme o usuário digita.

  const handleValorChange = (e) => {
    setValor(e.target.value);
  };

  // Função para atualizar o estado do tipo da ação conforme o usuário seleciona (Entrada/Saída).

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  // Função para exibir o popup de adição de entrada/saída ao clicar na imagem.

  const handleImageClick = () => {
    setShowPopup(true);
  };

  // Função para fechar o popup de adição de entrada/saída ao clicar no botão de fechar.

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  /**
 * Função handleSubmit para lidar com a submissão do formulário de criação de nova ação financeira.
 * Cria um objeto novaAcao com os valores de ano, mês, ação, valor e tipo.
 * Adiciona a nova ação ao estado acoes.
 * Fecha o popup de criação de ação e limpa os estados de acao e valor.
 * 
 * @param {Event} e Evento de submissão do formulário
 */

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaAcao = {
      ano,
      mes,
      acao,
      valor: parseFloat(valor),
      tipo,
    };
    setAcoes([...acoes, novaAcao]);
    setShowPopup(false);
    setAcao("");
    setValor("");
  };

  // Função saldoTotal para calcular e atualizar o saldo total com base nas ações financeiras.
  // Itera sobre o array de item, que contém as ações financeiras.
  // Se a ação for do tipo "Entrada", adiciona o valor ao total; se for do tipo 
  // "Saída", subtrai o valor. Atualiza o estado de saldo com o valor calculado.

  const saldoTotal = (item) => {
    let total = 0;
    item.forEach((acao) => {
      if (acao.tipo) {
        total += acao.valor;
      } else {
        total -= acao.valor;
      }
    });
    setSaldo(total);
  };

  // Função  para lidar com a remoção de uma ação financeira da lista.
  // Recebe o índice da ação a ser removida como parâmetro.
  // Cria uma cópia do array de acoes.
  // Remove a ação do índice especificado da cópia.
  // Atualiza o estado de acoes com a nova lista de ações.
  // Atualiza o saldo com base no tipo (Entrada ou Saída) da ação removida.


  const handleDelete = (index) => {
    const novaListaAcoes = [...acoes];
    const acaoRemovida = novaListaAcoes.splice(index, 1)[0];

    setAcoes(novaListaAcoes);

    // Atualizar o saldo após a remoção do registro
    let novoSaldo = saldo;
    if (acaoRemovida.tipo === "Entrada") {
      novoSaldo -= acaoRemovida.valor;
    } else if (acaoRemovida.tipo === "Saída") {
      novoSaldo += acaoRemovida.valor;
    }
    setSaldo(novoSaldo);
  };

  return (
    <>
      <SideBar />
      <div id="paginaFinance">
        <div className="financeTitulo">
          <h1>Financeiro</h1>
        </div>
        <div className="img-text-container2">
          <div className="caixa">
            <label htmlFor="ano" className="anoMes">
              Ano:
            </label>
            <select id="ano" value={ano} onChange={handleAnoChange}>
              {Array.from({ length: 7 }, (_, i) => 2024 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="caixa">
            <label htmlFor="mes" className="anoMes">
              Mês:
            </label>
            <select id="mes" value={mes} onChange={handleMesChange}>
              {[
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="financeCorpo">
          <h2>{mes} - Ações:</h2>
          <ul>
            {item
              .filter((acao) => acao.mes === mes && acao.ano === ano)
              .map((acao, index) => (
                <li
                  key={index}
                  className={acao.tipo === true ? "entrada" : "saida"}
                >
                  {acao.tipo} {acao.titulo} - R$ {acao.valor.toFixed(2)}
                  <img
                    src="trash.svg"
                    alt="Delete"
                    onClick={() => deletaItem(acao.id)}
                  />
                </li>
              ))}
          </ul>
          <h3>Saldo Atual: R$ {saldo.toFixed(2)}</h3>
          <div className="botao-container">
            <button className="botao" onClick={handleImageClick}>
              Adicionar Entrada/Saída
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <div className="caixa">
                  <label htmlFor="acao">Ação:</label>
                  <input
                    type="text"
                    id="acao"
                    value={acao}
                    onChange={handleAcaoChange}
                    required
                  />
                </div>
                <div className="caixa">
                  <label htmlFor="valor">Valor:</label>
                  <input
                    type="number"
                    step="0.01"
                    id="valor"
                    value={valor}
                    onChange={handleValorChange}
                    required
                  />
                </div>
                <div className="caixa">
                  <label htmlFor="tipo">Tipo:</label>
                  <select id="tipo" value={tipo} onChange={handleTipoChange}>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="botao"
                  onClick={() => criarItem(acao, valor, tipo, mes, ano)}
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Finance;
