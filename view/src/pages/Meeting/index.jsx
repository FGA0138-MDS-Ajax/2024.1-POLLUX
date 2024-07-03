import React, { useState, useEffect } from "react";
import "./Meeting.css";
import SideBar from "../../components/SideBar";
import {
  createLink,
  createMeeting,
  deleteMeeting,
  destroyLink,
  editMeeting,
  getMeetings,
  savePresence,
} from "../../queries/meetings";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Meeting() {
  // Estados locais para gerenciar reuniões, popups, índice de reunião atual,
  // links, descrição, título editado, e estado de colapso dos detalhes de cada reunião.
  const [meetings, setMeetings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [currentMeetingIndex, setCurrentMeetingIndex] = useState(null);
  const [link, setLink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [links, setLinks] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [editTitleIndex, setEditTitleIndex] = useState(-1);
  const [isCollapsed, setIsCollapsed] = useState([]);

  const navigate = useNavigate();

  // Configura o título da página e carrega as reuniões ao montar o componente.

  useEffect(() => {
    document.title = "Reuniões";
    get();
    setIsCollapsed(Array(meetings.length).fill(true));
  }, []);

  // Função assíncrona para obter as reuniões da API.

  const getReunioes = async () => {
    try {
      const reunioes = await getMeetings();
      return reunioes;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  // Função para obter e definir a lista de reuniões ao montar o componente.

  const get = async () => {
    const listaReunioes = await getReunioes();
    setMeetings(listaReunioes.data);
  };

  // Função assíncrona para criar uma nova reunião.

  async function criarReuniao(titulo) {
    const userId = 1;
    try {
      await createMeeting({
        nome: titulo,
        user_id: userId,
      });
      await get();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  // Manipuladores de eventos para interação com o popup de adicionar reunião.

  const handleAddMeetingClick = () => {
    setShowPopup2(true);
  };

  // Fechar popup.

  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  // Mudança de título

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  // Submissão do formulário para adicionar ou editar título de reunião.

  const handleAddMeeting = (e) => {
    e.preventDefault();
    const newMeeting = {
      nome: titulo,
      files: [],
      members: [],
    };
    setMeetings([...meetings, newMeeting]);
    setLinks([...links, []]); // Adds a new empty list of links for the new meeting
    setIsCollapsed([...isCollapsed, true]); // Add the new meeting as collapsed
    setTitulo("");
    setShowPopup2(false);
  };

  // Manipulador de clique na imagem para abrir o popup de adicionar link.

  const handleImageClick = (meetingId) => {
    setCurrentMeetingIndex(meetingId);
    setShowPopup(true);
  };

  // Fechar o pop up

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentMeetingIndex(null);
  };

  // Funções para manipular a presença dos membros em uma reunião.

  const handlePresenceChange = (meetingIndex, memberIndex) => {
    const updatedMeetings = [...meetings];
    const member = updatedMeetings[meetingIndex].reunioes_usuarios[memberIndex];
    member.present = !member.present;
    setMeetings(updatedMeetings);
  };

  // Manipuladores de mudança de link para adicionar novo link.

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  // Manipuladores de mudança de descrição para adicionar novo link.

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  // Submissão do formulário para adicionar novo link à reunião.

  const handleSubmitLink = async (e) => {
    e.preventDefault();
    if (link.trim() !== "" && descricao.trim() !== "") {
      try {
        await createLink(currentMeetingIndex, {
          reunioes_link: {
            link: link,
            descricao: descricao,
          },
        });
        await get();
      } catch (error) {
        console.error("Error creating link:", error);
        alert("Erro ao criar o link!");
      }
    }
    setShowPopup(false);
    setLink("");
    setDescricao("");
  };

  // Função para remover um link de uma reunião.

  const handleRemoveLink = async (meetingIndex, linkIndex) => {
    try {
      await destroyLink(meetingIndex, linkIndex);
      await get();
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Erro ao deletar o link!");
    }
  };

  // Manipulador de duplo clique no título da reunião para editar.

  const handleDoubleClick = (index) => {
    const meeting = meetings[index];
    setTitulo(meeting.nome);
    setEditTitleIndex(index);
    setShowPopup2(true);
  };

  // Submissão do formulário para editar o título de uma reunião.

  const handleUpdateMeetingTitle = async (e) => {
    e.preventDefault();
    try {
      await editMeeting(editTitleIndex, { nome: titulo });
      await get();
    } catch (error) {
      console.error("Error editing meeting:", error);
      alert("Erro ao editar a Reunião!");
    }
    setTitulo("");
    setEditTitleIndex(-1);
    setShowPopup2(false);
  };

  // Função para remover uma reunião.

  const handleRemoveMeeting = async (meeting) => {
    try {
      await deleteMeeting(meeting.id);
      await get();
    } catch (error) {
      console.error("Error deleting meeting:", error);
      alert("Erro ao deletar a Reunião!");
    }
  };

  // Atualizar o status da pesença

  const updatePresenceStatus = async (meetingIndex) => {
    const updatedMeeting = meetings[meetingIndex];
    const formatedData = updatedMeeting.reunioes_usuarios.map((r_user) => {
      return {
        user_id: r_user.user_id,
        present: r_user.present,
      };
    });
    try {
      await savePresence(updatedMeeting.id, { user: formatedData });
      await get();
    } catch (error) {
      console.error("Error updating presence:", error);
      alert("Erro ao atualizar a presença!");
    }
  };

  // Atualizar as presenças

  const handleSavePresence = async (meetingIndex) => {
    await updatePresenceStatus(meetingIndex);
  };

  // Função para alternar o estado de colapso dos detalhes de uma reunião.

  const toggleCollapse = (index) => {
    const updatedCollapseState = [...isCollapsed];
    updatedCollapseState[index] = !updatedCollapseState[index];
    setIsCollapsed(updatedCollapseState);
  };

  return (
    <>
      <SideBar />
      <section className="containerGeral">
        <div className="tituloGeral">
          <h1>Reuniões</h1>
          <button onClick={handleAddMeetingClick} className="botao">
            Adicionar Reunião
          </button>
          {showPopup2 && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={handleClosePopup2}>
                  &times;
                </span>
                <form
                  onSubmit={
                    editTitleIndex > -1
                      ? handleUpdateMeetingTitle
                      : handleAddMeeting
                  }
                >
                  <label className="caixa">
                    Insira o título:
                    <input
                      className="caixa"
                      type="text"
                      value={titulo}
                      onChange={handleTituloChange}
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    onClick={() => criarReuniao(titulo)}
                    className="botao"
                  >
                    {editTitleIndex > -1 ? "Salvar" : "Adicionar"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        {meetings.map((meeting, index) => (
          <div key={meeting.id} className="meeting">
            <h2 onDoubleClick={() => handleDoubleClick(meeting)}>
              {meeting.nome}
            </h2>
            <button onClick={() => toggleCollapse(index)} className="botao">
              {isCollapsed[index] ? "Mostrar Detalhes" : "Ocultar Detalhes"}
            </button>
            <img
              src="trash.svg"
              alt="img-trash"
              className="trash"
              onClick={() => handleRemoveMeeting(meeting)}
            ></img>

            {!isCollapsed[index] && (
              <div>
                <div className="img-text-container">
                  <img
                    src="plus.svg"
                    alt="img-plus"
                    className="bntMeeting"
                    onClick={() => handleImageClick(meeting.id)}
                  />
                  <p className="fonteMeeting">Adicionar Arquivo</p>
                </div>
                <div className="displayed-links">
                  {meeting.reunioes_links &&
                    meeting.reunioes_links.map((link, linkIndex) => (
                      <div key={link.id}>
                        <p>
                          <img
                            src="trash.svg"
                            alt="img-trash"
                            className="trash"
                            onClick={() =>
                              handleRemoveLink(meeting.id, link.id)
                            }
                          />
                          <a href={link.link}>{link.descricao}</a>
                        </p>
                      </div>
                    ))}
                </div>
                <table className="presence-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Matrícula</th>
                      <th>Presença</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meeting.reunioes_usuarios &&
                      meeting.reunioes_usuarios.map((member, memberIndex) => (
                        <tr key={member.id}>
                          <td>{member.user.nome}</td>
                          <td>{member.user.matricula}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={member.present}
                              onChange={() =>
                                handlePresenceChange(index, memberIndex)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  onClick={() => handleSavePresence(index)}
                  className="botaoAdd"
                >
                  Salvar Presença
                </button>
              </div>
            )}
          </div>
        ))}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <form onSubmit={handleSubmitLink}>
                <label className="caixa">
                  Insira o link:
                  <input
                    className="caixa"
                    type="text"
                    value={link}
                    onChange={handleLinkChange}
                    required
                  />
                </label>
                <label className="caixa">
                  Descrição:
                  <input
                    className="caixa"
                    type="text"
                    value={descricao}
                    onChange={handleDescricaoChange}
                    required
                  />
                </label>
                <button type="submit" className="botao">
                  Adicionar
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Meeting;
