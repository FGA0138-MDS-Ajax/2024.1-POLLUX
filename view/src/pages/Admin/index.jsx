import React, { useState, useEffect } from "react";
import './Admin.css';
import SideBar from "../../components/SideBar";

function Admin() {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', matricula: '', role_fin: false, role_reu: false, role_doc: false });
    const [selectedMember, setSelectedMember] = useState(null);
    const [editingMember, setEditingMember] = useState({ name: '', password: '', matricula: '', role_fin: false, role_reu: false, role_doc: false });

    useEffect(() => {
        // dados fake
        const dummyMembers = [
            { id: 1, name: 'Membro1', matricula: '12345', role_fin: true, role_reu: false, role_doc: false },
            { id: 2, name: 'Membro2', matricula: '67890', role_fin: false, role_reu: true, role_doc: true }
        ];

        setMembers(dummyMembers);
    }, []);

    const handleNewMemberChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewMember(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddMember = () => {
        if (newMember.name.trim() && newMember.matricula.trim()) {
            const newMemberData = { ...newMember, id: Date.now() };
            setMembers([...members, newMemberData]);
            setNewMember({ name: '', matricula: '', role_fin: false, role_reu: false, role_doc: false });
        } else {
            alert('O espaço não pode ficar em branco.');
        }
    };

    const handleRemoveMember = (index) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
        alert("Membro removido: " + members[index].name);
    };

    const handleEditMember = (member) => {
        setSelectedMember(member);
        setEditingMember({ 
            name: member.name, 
            password: '', 
            matricula: member.matricula, 
            role_fin: member.role_fin, 
            role_reu: member.role_reu, 
            role_doc: member.role_doc 
        });
    };

    const handleUpdateMember = () => {
        const updatedMembers = members.map(member => 
            member.id === selectedMember.id ? editingMember : member
        );
        setMembers(updatedMembers);
        setSelectedMember(null);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setEditingMember(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    return (
        <>
            <SideBar />

            <div className="memberListContainer">
                <h2>Membros</h2>
                <ul>
                    {members.map((member, index) => (
                        <li key={index}>
                            <span onClick={() => handleEditMember(member)}>{member.name} - {member.matricula}</span>
                            <button onClick={() => handleRemoveMember(index)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Nome do Novo Membro"
                    name="name"
                    value={newMember.name}
                    onChange={handleNewMemberChange}
                />
                <input
                    type="text"
                    placeholder="Matrícula do Novo Membro"
                    name="matricula"
                    value={newMember.matricula}
                    onChange={handleNewMemberChange}
                />
                <label>
                    Tela Fin:
                    <input
                        type="checkbox"
                        name="role_fin"
                        checked={newMember.role_fin}
                        onChange={handleNewMemberChange}
                    />
                </label>
                <label>
                    Tela Reu:
                    <input
                        type="checkbox"
                        name="role_reu"
                        checked={newMember.role_reu}
                        onChange={handleNewMemberChange}
                    />
                </label>
                <label>
                    Tela Doc:
                    <input
                        type="checkbox"
                        name="role_doc"
                        checked={newMember.role_doc}
                        onChange={handleNewMemberChange}
                    />
                </label>
                <button onClick={handleAddMember}>Adicionar Membro</button>
            </div>

            {selectedMember && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Editar Membro</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateMember(); }}>
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    name="name"
                                    value={editingMember.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Senha:
                                <input
                                    type="password"
                                    name="password"
                                    value={editingMember.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Matrícula:
                                <input
                                    type="text"
                                    name="matricula"
                                    value={editingMember.matricula}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Tela Fin:
                                <input
                                    type="checkbox"
                                    name="role_fin"
                                    checked={editingMember.role_fin}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Tela Reu:
                                <input
                                    type="checkbox"
                                    name="role_reu"
                                    checked={editingMember.role_reu}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Tela Doc:
                                <input
                                    type="checkbox"
                                    name="role_doc"
                                    checked={editingMember.role_doc}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type="submit">Atualizar</button>
                            <button type="button" onClick={() => setSelectedMember(null)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Admin;
