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
    const [isCollapsed, setIsCollapsed] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await get();
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (meetings.length > 0) {
            setIsCollapsed(Array(meetings.length).fill(true));
        }
    }, [meetings]);

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
        console.log(listaReunioes);
        setMeetings(listaReunioes.data);
    };

    async function criarReuniao(titulo) {
        const userId = 1;
        try {
            await createMeeting({
                nome: titulo,
                user_id: userId
            });
            await get();
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
            members: []
        };
        setMeetings([...meetings, newMeeting]);
        setLinks([...links, []]); // Adds a new empty list of links for the new meeting
        setIsCollapsed([...isCollapsed, true]); // Add the new meeting as collapsed
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

    const handleRemoveMeeting = (meetingIndex) => {
        const updatedMeetings = [...meetings];
        updatedMeetings.splice(meetingIndex, 1);
        setMeetings(updatedMeetings);
        setIsCollapsed(isCollapsed.filter((_, i) => i !== meetingIndex));
    };

    const toggleCollapse = (meetingIndex) => {
        const updatedCollapseState = [...isCollapsed];
        updatedCollapseState[meetingIndex] = !updatedCollapseState[meetingIndex];
        setIsCollapsed(updatedCollapseState);
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
                {meetings.map((meeting, meetingIndex) => (
                    <div key={meetingIndex} className="meeting">
                        <h2 onDoubleClick={() => handleDoubleClick(meetingIndex)}>{meeting.nome}</h2>
                        
                        <button onClick={() => toggleCollapse(meetingIndex)} className="botao">
                            {isCollapsed[meetingIndex] ? 'Mostrar Detalhes' : 'Ocultar Detalhes'}
                        </button>
                        <button onClick={() => handleRemoveMeeting(meetingIndex)} className="botaoRemove"> 
                            Remover Reunião
                        </button>
                        {!isCollapsed[meetingIndex] && (
                            <div>
                                <div className='img-text-container'>
                                    <img src="plus.svg" alt="img-plus" className="bntMeeting" onClick={() => handleImageClick(meetingIndex)} />
                                    <p className='fonteMeeting'>Adicionar Arquivo</p>
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
                        )}
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
            </section>
        </>
    );
}

export default Meeting;
