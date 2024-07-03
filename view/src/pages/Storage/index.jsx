/*
  Página de gestão de estoque, gerencia a exibição, adição, edição 
  e exclusão de itens no estoque. Utiliza Axios para comunicação com 
  a API RESTful para operações CRUD. Inclui funcionalidades como 
  manipulação de quantidades, seleção de status e edição em pop-up.
*/

import { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import "./Storage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  createStorage,
  deleteStorage,
  editStorage,
  getStorages,
} from "../../queries/storages";

function Storage() {

  // Estados para controlar o estado do pop-up, nome, 
  // quantidade, links, imagem selecionada e índice de edição

  const [showPopup, setShowPopup] = useState(false);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [links, setLinks] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [editIndex, setEditIndex] = useState(-1); // Estado para rastrear o índice do item em edição
  const [itemEstoque, setItem] = useState([]);
  const navigate = useNavigate();

  // Efeito para verificar a autenticação do usuário e obter dados do estoque ao montar o componente

  useEffect(() => {
    try {
      document.title = "Estoque";
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
          if (response.data) {
            // Usuário autenticado, nada precisa ser feito

          } else {
            navigate("/login");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      get(); // Carregar os dados do estoque
    } catch (err) {
      navigate("/login");
    }
  }, [nome, quantidade, links, imagemSelecionada, editIndex, showPopup]);

  // Função assíncrona para obter os dados do estoque da API

  const get = async () => {
    const listaStorage = await getStorages();
    setItem(listaStorage.data);
  };

  // Função assíncrona para editar um item do estoque

  const editaItem = async (id, nome, quantidade, status, user_id) => {
    try {
      await editStorage(id, {
        nome: nome,
        quantidade: quantidade,
        status: status,
        user_id,
      });
      get()
    } catch (error) {
      console.log(error)
      alert("Erro ao editar o Item!");
    }
  };

  // Função assíncrona para deletar um item do estoque

  const deletaItem = async (id) => {
    try {
      await deleteStorage(id);
      await get();
    } catch (error) {
      console.error("Error deleting storage:", error);
      alert("Erro ao deletar o Item!");
    }
  };

  // Função assíncrona para criar um novo item no estoque

  const criarEstoque = async (nome, quantidade, status, user_id) => {
    try {
      await createStorage({
        nome: nome,
        quantidade: quantidade,
        status: status,
        user_id: user_id,
      });
      await get();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  // Função assíncrona para editar a quantidade de um item do estoque

  const editQuantidade = async (id, qtd, btn) => {
    const quantidade = qtd + btn;
    //console.log(quantidade)
    try {
      await editStorage(id, {
        quantidade: quantidade
      })
    } catch (error) {
      console.error(error);
      alert("Erro ao editar quantidade!")
    }
    get()
  }

  // Manipulador de evento para exibir o pop-up de adicionar item

  const handleImageClick = () => {
    setShowPopup(true);
  };

  // Manipulador de evento para fechar o pop-up de adicionar item

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(-1); // Resetar o índice de edição ao fechar o pop-up
    setNome(""); // Resetar o nome ao fechar o pop-up
    setQuantidade(""); // Resetar a quantidade ao fechar o pop-up
    setImagemSelecionada(null); // Resetar a imagem ao fechar o pop-up
  };

  // Manipulador de evento para atualizar o estado do nome do item

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  // Manipulador de evento para selecionar a imagem de status do item

  const handleImageSelection = (imagem) => {
    setImagemSelecionada(imagem);
  };

  // Manipulador de evento para atualizar o estado da quantidade do item

  const handleQuantidadeChange = (event) => {
    const { value } = event.target;
    if (value === "" || /^\d+$/.test(value)) {
      setQuantidade(value);
    }
  };

  // Manipulador de evento para submeter o formulário de adicionar/editar item

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() !== "" && quantidade.trim() !== "") {
      if (editIndex > -1) {
        // Editando um item existente
        const updatedLinks = [...links];
        updatedLinks[editIndex] = {
          quantidade,
          nome,
          imagem: imagemSelecionada,
        };
        setLinks(updatedLinks);
        setEditIndex(-1); // Resetar o índice de edição
      } else {
        // Adicionando um novo item
        setLinks([...links, { quantidade, nome, imagem: imagemSelecionada }]);
      }
      setShowPopup(false);
      setNome("");
      setQuantidade("");
      setImagemSelecionada(null);
      get();
    }
  };

  // Manipulador de evento para remover um item da lista de links

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  // Manipulador de evento para adicionar quantidade a um item do estoque

  const handleAddQuantity = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index].quantidade = String(
      parseInt(updatedLinks[index].quantidade) + 1
    );
    setLinks(updatedLinks);
  };

  // Manipulador de evento para remover quantidade de um item do estoque

  const handleRemoveQuantity = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index].quantidade = String(
      parseInt(updatedLinks[index].quantidade) - 1
    );
    if (updatedLinks[index].quantidade < 0) {
      updatedLinks[index].quantidade = "0";
    }
    setLinks(updatedLinks);
  };

  // Manipulador de evento de duplo clique para editar um item do estoque

  const handleDoubleClick = (item, index) => {
    setNome(item.nome);
    setQuantidade(item.quantidade);
    setImagemSelecionada(item.status);
    setEditIndex(index); // Definir o índice do item em edição
    setShowPopup(true); // Mostrar o pop-up de edição
  };

  return (
    <>
      <SideBar />
      <section className="containerGeral">
        <div className="tituloGeral">
          <h1>Estoque</h1>
        </div>

        <div className="estoqueCorpo">
          <div className="img-text-container">
            <img
              src="plus.svg"
              alt="img-plus"
              className="img-plusE"
              onClick={handleImageClick}
            />
            <p>Adicionar nova peça</p>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={handleClosePopup}>
                  &times;
                </span>
                <form onSubmit={handleSubmit}>
                  <label className="caixa">
                    Nome da peça:
                    <input
                      className="caixa"
                      type="text"
                      value={nome}
                      onChange={handleNomeChange}
                      required
                    />
                  </label>
                  <label className="caixa">
                    Quantidade:
                    <input
                      className="caixa"
                      type="text"
                      value={quantidade}
                      onChange={handleQuantidadeChange}
                      required
                    />
                  </label>
                  <label className="caixaImg">
                    <img
                      src="/disponivel.svg"
                      alt="Disponível"
                      className={`opcao-imagem ${imagemSelecionada === "/disponivel.svg"
                        ? "selecionada"
                        : ""
                        }`}
                      onClick={() => handleImageSelection("/disponivel.svg")}
                    />
                    <img
                      src="/indisponivel.svg"
                      alt="Indisponível"
                      className={`opcao-imagem ${imagemSelecionada === "/indisponivel.svg"
                        ? "selecionada"
                        : ""
                        }`}
                      onClick={() => handleImageSelection("/indisponivel.svg")}
                    />
                    <img
                      src="/alerta.svg"
                      alt="Alerta"
                      className={`opcao-imagem ${imagemSelecionada === "/alerta.svg" ? "selecionada" : ""
                        }`}
                      onClick={() => handleImageSelection("/alerta.svg")}
                    />
                  </label>
                  <button
                    type="submit"
                    className="botao"
                    onClick={() => {
                      if (editIndex > -1) {
                        editaItem(
                          editIndex,
                          nome,
                          quantidade,
                          imagemSelecionada,
                          1
                        );
                        setShowPopup(false); // Chamando outra função junto com editaItem
                      } else {
                        criarEstoque(nome, quantidade, imagemSelecionada, 1);
                      }
                    }}
                  >
                    {editIndex > -1 ? "Salvar" : "Adicionar"}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="displayed-links">
            {itemEstoque.map((item, index) => (
              <div key={index} className="item-container-geral">
                <div className="img-text-container2">
                  <div className="bntMaiseMenosContainer">
                    <button
                      className="bntMaiseMenos"
                      onClick={() => editQuantidade(item.id, item.quantidade, 1)}
                    >
                      +
                    </button>
                    <p className="fonteDetalheGeral2">{item.quantidade}</p>
                    <button
                      className="bntMaiseMenos"
                      onClick={() => editQuantidade(item.id, item.quantidade, -1)}
                    >
                      -
                    </button>
                  </div>
                  <p
                    className="fonteDetalheGeral"
                    onDoubleClick={() => handleDoubleClick(item, item.id)} //AXIOS EDIT
                    style={{ cursor: "pointer" }}
                  >
                    {item.nome}
                  </p>
                  {item.status && (
                    <img
                      src={item.status}
                      alt="Status"
                      className="imagem-selecionada"
                    />
                  )}
                  <img
                    src="trash.svg"
                    alt="img-trash"
                    className="trashEstoque"
                    onClick={() => deletaItem(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Storage;
