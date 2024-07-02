import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Finance.css";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { createAction, deleteAction, getActions } from "../../queries/actions";

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
      axios
        .post("http://localhost:3000/users/token", {
          token: token,
        })
        .then(function (response) {
          if (!(response.data < 0)) {
            axios
              .get("http://localhost:3000/users/" + response.data.id)
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

  const deletaItem = async (id) => {
    await deleteAction({ id: id });
    get();
  };

  const get = async () => {
    const response = await getActions();
    setItem(response.data);
    saldoTotal(item);
  };

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

  const handleAnoChange = (e) => {
    setAno(e.target.value);
  };

  const handleMesChange = (e) => {
    setMes(e.target.value);
  };

  const handleAcaoChange = (e) => {
    setAcao(e.target.value);
  };

  const handleValorChange = (e) => {
    setValor(e.target.value);
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

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

  const calcularSaldo = () => {
    let total = 0;
    acoes.forEach((acao) => {
      if (acao.tipo === "Entrada") {
        total += acao.valor;
      } else if (acao.tipo === "Saída") {
        total -= acao.valor;
      }
    });
    setSaldo(total);
  };

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
