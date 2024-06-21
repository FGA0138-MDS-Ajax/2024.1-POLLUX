import React, { useState, useEffect } from "react";
import './Meeting.css';
import SideBar from "../../components/SideBar";
import { createMeeting, deleteMeeting, getMeetings } from "../../queries/meetings";
import { useNavigate } from 'react-router-dom';

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
        get()
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
        console.log(listaReunioes);
        setMeetings(listaReunioes.data);
        setIsCollapsed(Array(listaReunioes.data.id).fill(true));
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

    const handleAddMeeting = async (e) => {
        e.preventDefault();
        await criarReuniao(titulo);
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

    const handleSubmitLink = (e) => {
        e.preventDefault();
        if (link.trim() !== '' && descricao.trim() !== '') {
            
            setLinks(updatedLinks);
        }
        setShowPopup(false);
        setLink('');
        setDescricao('');
    };

    const handleRemoveLink = (meetingIndex, linkIndex) => {
        
        setLinks(updatedLinks);
    };

    const handleDoubleClick = (meeting) => {
        setTitulo(meeting.nome);
        setEditTitleIndex(meeting.id);
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

    const handleRemoveMeeting = async (meeting) => {
        try {
            console.log(meeting.id);
            await deleteMeeting(meeting.id);
            await get();
            alert("Reunião removida: " + meeting.nome);
        } catch (error) {
            console.error("Error deleting meeting:", error);
            alert("Erro ao deletar a Reunião!");
        }
    };

    const toggleCollapse = (meetingId) => {
        const updatedCollapseState = [...isCollapsed];
        updatedCollapseState[meetingId] = !updatedCollapseState[meetingId];
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
                                    <button type="submit" className='botao'>{editTitleIndex > -1 ? 'Salvar' : 'Adicionar'}</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                {meetings.map((meeting, index) => (
                    <div key={meeting.id} className="meeting">
                        <h2 onDoubleClick={() => handleDoubleClick(meeting)}>{meeting.nome}</h2>
                        <button onClick={() => toggleCollapse(meeting.id)} className="botao">
                            {isCollapsed[meeting.id] ? 'Mostrar Detalhes' : 'Ocultar Detalhes'}
                        </button>
                        <button onClick={() => handleRemoveMeeting(meeting)} className="botaoRemove">
                            Remover Reunião
                        </button>
                        {!isCollapsed[meeting.id] && (
                            <div>
                                <div className='img-text-container'>
                                    <img src="plus.svg" alt="img-plus" className="bntMeeting" onClick={() => handleImageClick(meetingId)} />
                                    <p className='fonteMeeting'>Adicionar Arquivo</p>
                                </div>
                                <div className="displayed-links">
                                    {links[meeting.id] && links[index].map((link, linkIndex) => (
                                        <div key={linkIndex}>
                                            <p>
                                                <img
                                                    src="trash.svg"
                                                    alt="img-trash"
                                                    className='trash'
                                                    onClick={() => handleRemoveLink(index, linkIndex)}
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
                                        {meeting.members && meeting.members.map((member, memberIndex) => (
                                            <tr key={memberIndex}>
                                                <td>{member.nome}</td>
                                                <td>{member.matricula}</td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={member.presente}
                                                        onChange={() => handlePresenceChange(index, memberIndex)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button onClick={() => handlePresenceChange(index)} className="botaoAdd">
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
                            <form id="formLink" onSubmit={handleSubmitLink}>
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
