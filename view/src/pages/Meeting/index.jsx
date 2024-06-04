import React, { useState } from "react";
import './Meeting.css';
import SideBar from "../../components/SideBar";

function Meeting() {
    const [meetings, setMeetings] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentMeetingIndex, setCurrentMeetingIndex] = useState(null);

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
    };

    const handleImageClick = (index) => {
        setCurrentMeetingIndex(index);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setCurrentMeetingIndex(null);
    };

    const handleFileChange = (e) => {
        const updatedMeetings = [...meetings];
        updatedMeetings[currentMeetingIndex].file = e.target.files[0];
        updatedMeetings[currentMeetingIndex].fileName = e.target.files[0].name;
        setMeetings(updatedMeetings);
    };

    const handleFileSubmit = (e) => {
        e.preventDefault();
        const updatedMeetings = [...meetings];
        const currentMeeting = updatedMeetings[currentMeetingIndex];
        if (currentMeeting.file && currentMeeting.fileName.trim() !== '') {
            const dateAdded = new Date().toLocaleDateString();
            currentMeeting.files.push({ file: currentMeeting.file, fileName: currentMeeting.fileName, dateAdded });
        }
        setShowPopup(false);
        setMeetings(updatedMeetings);
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
                            <p className='fonte'>Adicionar Arquivo</p>
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
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={handleClosePopup}>&times;</span>
                            <form onSubmit={handleFileSubmit}>
                                <label className='caixa'>
                                    Nome do Arquivo:
                                    <input
                                        className='caixa'
                                        type="text"
                                        value={meetings[currentMeetingIndex]?.fileName || ''}
                                        onChange={(e) => {
                                            const updatedMeetings = [...meetings];
                                            updatedMeetings[currentMeetingIndex].fileName = e.target.value;
                                            setMeetings(updatedMeetings);
                                        }}
                                        required
                                    />
                                </label>
                                <label className='caixa'>
                                    Selecionar Arquivo:
                                    <input  
                                        className='caixa'
                                        type="file"
                                        onChange={handleFileChange}
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
