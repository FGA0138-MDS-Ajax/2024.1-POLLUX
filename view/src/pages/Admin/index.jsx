import React, { useState } from "react";
import './Admin.css';
import SideBar from "../../components/SideBar";

function Admin() {
    const [membersF, setMembersF] = useState(['Membro Fin1', 'Membro Fin2']);
    const [newMemberF, setNewMemberF] = useState('');

    const [membersD, setMembersD] = useState(['Membro Doc1', 'Membro Doc2']);
    const [newMemberD, setNewMemberD] = useState('');

    const handleNewMemberFChange = (event) => {
        setNewMemberF(event.target.value);
    };

    const handleNewMemberDChange = (event) => {
        setNewMemberD(event.target.value);
    }

    const handleAddMemberF = () => {
        if (newMemberF.trim()) {
            setMembersF([...membersF, newMemberF]);
            console.log("Novo Membro com acesso à tela Financeiro:", newMemberF);  // Log do novo membro no console
            setNewMemberF('');
        } else {    
            alert('O espaço não pode ficar em branco.');
        }
    };

    const handleAddMemberD = () =>{
        if (newMemberD.trim()) {
            setMembersD([...membersD,newMemberD]);
            console.log("Novo membro com acesso total à tela de documentos:", newMemberD);
            setNewMemberD('');
        } else {
            alert('O espaço não pode ficar em branco.')
        }
    }
    
    const handleRemoveMemberF = (index) => {
        const updatedMembers = membersF.filter((_, i) => i !== index);
        setMembersF(updatedMembers);
        console.log("Membro removido:", membersF[index]);  // Log do membro removido no console
        alert("Membro removido: "+  membersF[index])
    };

    const handleRemoveMemberD = (index) => {
        const updatedMembers = membersD.filter((_,i) => i !== index);
        setMembersD(updatedMembers);
        console.log("Membro removido da Tela Documentos: ", membersD[index]);
        alert("Membro removido da Tela Documentos: "+ membersD[index])
    }

    return (
        <>
            <SideBar />
            
            <div className="memberListContainer">
                <h2>Acesso à tela Financeiro</h2>
                <ul>
                    {membersF.map((memberF, index) => (
                        <li key={index}>
                            {memberF}
                            <button onClick={() => handleRemoveMemberF(index)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Novo Membro"
                    value={newMemberF}
                    onChange={handleNewMemberFChange}
                />
                <button onClick={handleAddMemberF}>Adicionar Membro</button>
            </div>
            <div className="memberListContainer">
                <h2>Acesso à tela Documentos</h2>
                <ul>
                    {membersD.map((memberD, index) => (
                        <li key={index}>
                            {memberD}
                            <button onClick={() => handleRemoveMemberD(index)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Novo Membro"
                    value={newMemberD}
                    onChange={handleNewMemberDChange}
                />
                <button onClick={handleAddMemberD}>Adicionar Membro</button>
            </div>
        </>
    )
}

export default Admin;
