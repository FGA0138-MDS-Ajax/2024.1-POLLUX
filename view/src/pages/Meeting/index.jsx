import React, { useState } from "react";
import './Meeting.css';
import SideBar from "../../components/SideBar";
import axios from 'axios';

function Meeting() {
    const [meetings, setMeetings] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentMeetingIndex, setCurrentMeetingIndex] = useState(null);
    const [link, setLink] = useState('');
    const [descricao, setDescricao] = useState('');
    const [links, setLinks] = useState([]);
    let reunioes_existentes;
axios.get("http://127.0.0.1:3000/reuniaos").then(function (response) {
  reunioes_existentes = response.data;
  console.log(reunioes_existentes);
}).catch(function (error) {
  console.error('Erro ao buscar reuniões:', error);
});

    const handleAddMeeting = () => {
        const newMeeting = {
            nome: `Reunião ${meetings.length + 1}`,
            files: [],
            members: [
                { nome: 'Membro 1', matricula: '001', presente: false },
                { nome: 'Membro 2', matricula: '002', presente: false },
                // eh necessario add uma lista c todos os membros
            ]
        };
        setMeetings([...meetings, newMeeting]);
        setLinks([...links, []]); // Adiciona uma nova lista vazia de links para a nova reunião
          
  };

    const handleImageClick = (index) => {
        setCurrentMeetingIndex(index);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setCurrentMeetingIndex(null);
    };

    const handleRemoveFile = (meetingIndex, fileIndex) => {
        const updatedMeetings = [...meetings];
        updatedMeetings[meetingIndex].files.splice(fileIndex, 1);
        setMeetings(updatedMeetings);
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

    return (
        <>
            <SideBar />
            <div className='documentosTitulo'>
                <h1>Reuniões</h1>
                <button onClick={handleAddMeeting} className="botao">Adicionar Reunião</button>
            </div>
            <div className='documentosCorpo'>
                {meetings.map((meeting, meetingIndex) => (
                    <div key={meetingIndex} className="meeting">
                        <h2>{meeting.nome}</h2>
                        <div className='img-text-container'>
                            <img src="plus.svg" alt="img-plus" onClick={() => handleImageClick(meetingIndex)} />
                            <p className='fonte'>Adicionar link do Arquivo</p>
                        </div>
                        <div className="displayed-links">
                            {meeting.files.map((item, fileIndex) => (
                                <div key={fileIndex}>
                                    <div className='img-text-container'>
                                        <img src="trash.svg" alt='img-trash' className='trash' onClick={() => handleRemoveFile(meetingIndex, fileIndex)} />
                                        <p className='fonte2'>
                                            {item.fileName} (Adicionado em: {item.dateAdded})
                                        </p>
                                    </div>
                                </div>
                            ))}
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
                                {meeting.members.map((member, memberIndex) => (
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
                {showPopup && (
                    <div className="popup" >
                        <div className="popup-content">
                            <span className="close" onClick={handleClosePopup}>
                                &times; </span>
                            <form onSubmit={handleSubmit}>
                                <label className='caixa'>
                                    Insira o link:
                                    <input className='caixa'
                                        type="text"
                                        value={link}
                                        onChange={handleLinkChange}
                                        required
                                    />
                                </label>
                                <label className='caixa'>
                                    Descrição:
                                    <input className='caixa'
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
        </>
    );
}

export default Meeting;
