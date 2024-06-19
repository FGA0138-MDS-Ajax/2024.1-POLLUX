import React, { useState, useEffect } from "react";
import './Meeting.css';
import SideBar from "../../components/SideBar";
import { createMeeting, getMeetings } from "../../queries/meetings";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Meeting() {
    const [meetings, setMeetings] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [currentMeetingIndex, setCurrentMeetingIndex] = useState(null);
    const [link, setLink] = useState('');
    const [descricao, setDescricao] = useState('');
    const [links, setLinks] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [editTitleIndex, setEditTitleIndex] = useState(-1);
    const [reunioes, setMeet] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        get();
        try {
            var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            let token = cookieValue.jwtToken.toString();
            axios.post("http://localhost:3000/users/token", {
                token: token
            }).then(function(response) {
              if(!(response.data < 0)){
                axios.get("http://localhost:3000/users/"+response.data.id).then(function (resposta){
                  if(resposta.data.acesso.acesso_meetings){
                  }else{
                    navigate("/detail")
                  }
                });
              }else{
                  navigate("/login")
              }
            }).catch(function(error) {
                console.error(error);
            });
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    }, []);

    const getReunioes = async () => {
        try {
          const reunioes = await getMeetings();
          return reunioes;
        } catch (error) {
          alert(JSON.stringify(error));
        }
      };
    
      const get = async () => {
        const listaReunioes = await getReunioes();
        console.log(listaReunioes)
        setMeetings(listaReunioes.data);
      };

    async function criarReuniao(titulo) {
        const userId = 1
        try {
            await createMeeting({
                nome: titulo,
                user_id: userId
            });
            await get()
          } catch (error) {
            alert(JSON.stringify(error));
          }
    }

    const handleAddMeetingClick = () => {
        setShowPopup2(true);
    };

    const handleClosePopup2 = () => {
        setShowPopup2(false);
    };

    const handleTituloChange = (e) => {
        setTitulo(e.target.value);
    };

    const handleAddMeeting = (e) => {
        e.preventDefault();
        const newMeeting = {
            nome: titulo,
            files: [],
            members: [
                { nome: 'Membro 1', matricula: '001', presente: false },
                { nome: 'Membro 2', matricula: '002', presente: false },
                // Add more members as needed
            ]
        };
        setMeetings([...meetings, newMeeting]);
        setLinks([...links, []]); // Adds a new empty list of links for the new meeting
        setTitulo('');
        setShowPopup2(false);
    };

    const handleImageClick = (index) => {
        setCurrentMeetingIndex(index);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setCurrentMeetingIndex(null);
    };

    const handlePresenceChange = (meetingIndex, memberIndex) => {
        const updatedMeetings = [...meetings];
        const member = updatedMeetings[meetingIndex].members[memberIndex];
        member.presente = !member.presente;
        setMeetings(updatedMeetings);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (link.trim() !== '' && descricao.trim() !== '') {
            const updatedLinks = [...links];
            updatedLinks[currentMeetingIndex] = [...updatedLinks[currentMeetingIndex], { descricao, link }];
            setLinks(updatedLinks);
        }
        setShowPopup(false);
        setLink('');
        setDescricao('');
    };

    const handleRemoveLink = (meetingIndex, linkIndex) => {
        const updatedLinks = [...links];
        updatedLinks[meetingIndex].splice(linkIndex, 1);
        setLinks(updatedLinks);
    };

    const handleDoubleClick = (index) => {
        const meeting = meetings[index];
        setTitulo(meeting.nome);
        setEditTitleIndex(index);
        setShowPopup2(true);
    };

    const handleUpdateMeetingTitle = (e) => {
        e.preventDefault();
        const updatedMeetings = [...meetings];
        updatedMeetings[editTitleIndex].nome = titulo;
        setMeetings(updatedMeetings);
        setTitulo('');
        setEditTitleIndex(-1);
        setShowPopup2(false);
    };

    return (
        <>
            <SideBar />
            <section className='containerGeral'>
                <div className='tituloGeral'>
                    <h1>Reuniões</h1>
                    <button onClick={handleAddMeetingClick} className="botao">Adicionar Reunião</button>

                    {showPopup2 && (
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={handleClosePopup2}>
                                    &times;
                                </span>
                                <form onSubmit={editTitleIndex > -1 ? handleUpdateMeetingTitle : handleAddMeeting}>
                                    <label className='caixa'>
                                        Insira o título:
                                        <input
                                            className='caixa'
                                            type="text"
                                            value={titulo}
                                            onChange={handleTituloChange}
                                            required
                                        />
                                    </label>
                                    <button type="submit" onClick={() => criarReuniao(titulo)} className='botao'>{editTitleIndex > -1 ? 'Salvar' : 'Adicionar'}</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div className='reunioeCorpo'>
                    {meetings.map((meeting, meetingIndex) => (
                        <div key={meetingIndex} className="meeting">
                            <h2 onDoubleClick={() => handleDoubleClick(meetingIndex)}>{meeting.nome}</h2>
                            <div className='img-text-container'>
                                <img src="plus.svg" alt="img-plus" className="bntMeeting" onClick={() => handleImageClick(meetingIndex)} />
                                <p className='fonteMeeting'>Adicionar Arquivo</p>
                            </div>
                            <div className="displayed-links">
                                {/*meeting.files.map((item, fileIndex) => (
                                    <div key={fileIndex}>
                                        <div className='img-text-container'>
                                            <img src="trash.svg" alt='img-trash' className='trash' onClick={() => handleRemoveFile(meetingIndex, fileIndex)} />
                                            <p className='fonte2'>
                                                {item.fileName} (Adicionado em: {item.dateAdded})
                                            </p>
                                        </div>
                                    </div>
                                ))*/}
                            </div>
                            <div className="displayed-links">
                                {links[meetingIndex] && links[meetingIndex].map((link, index) => (
                                    <div key={index}>
                                        <p>
                                            <img
                                                src="trash.svg"
                                                alt="img-trash"
                                                className='trash'
                                                onClick={() => handleRemoveLink(meetingIndex, index)}
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
                                    {/*meeting.members.map((member, memberIndex) => (
                                        <tr key={memberIndex}>
                                            <td>{member.nome}</td>
                                            <td>{member.matricula}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={member.presente}
                                                    onChange={() => handlePresenceChange(meetingIndex, memberIndex)}
                                                />
                                            </td>
                                        </tr>
                                    ))*/}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={handleClosePopup}>
                                    &times;
                                </span>
                                <form onSubmit={handleSubmit}>
                                    <label className='caixa'>
                                        Insira o link:
                                        <input
                                            className='caixa'
                                            type="text"
                                            value={link}
                                            onChange={handleLinkChange}
                                            required
                                        />
                                    </label>
                                    <label className='caixa'>
                                        Descrição:
                                        <input
                                            className='caixa'
                                            type="text"
                                            value={descricao}
                                            onChange={handleDescricaoChange}
                                            required
                                        />
                                    </label>
                                    <button type="submit" className='botao'>Adicionar</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Meeting;
