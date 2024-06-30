import { useEffect, useState } from "react";
import "./Admin.css";
import SideBar from "../../components/SideBar";
import { deleteUser, editUser, getUsers } from "../../queries/user";
import { parseFormData } from "../../utils/parseFormData";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  const getUsuarios = async () => {
    try {
      const usuarios = await getUsers();
      return usuarios;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const get = async () => {
    const listaUsuarios = await getUsuarios();
    setMembers(listaUsuarios.data);
  };

  useEffect(() => {
    document.title = 'Gerenciamento de membros';
    try {
      var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
      let token = cookieValue.jwtToken.toString();
      axios.post("http://localhost:3000/users/token", {
        token: token
      }).then(function(response) {
        if(!(response.data < 0)){
          axios.get("http://localhost:3000/users/"+response.data.id).then(function (resposta){
            if(resposta.data.acesso.acesso_admin){
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
      navigate("/login");
    }
    get();
    
  }, []);

  const handleRemoveMember = async (memberId) => {
    try {
      await deleteUser(memberId)
      await get();
      setSelectedMember(null);
    } catch (error) {
      alert("Erro ao deletar o Usuário!");
    }
    setMembers(updatedMembers);
    alert("Membro removido: " + "");
  };

  const editarUsuario = async (dados) => {
    console.log(dados)
    try {
      await editUser(dados.id, {
        nome: dados.nome,
        matricula: dados.matricula,
        email: dados.email,
        senha: dados.senha,
        acesso: {
          acesso_documents: dados.acesso_documents?? false,
          acesso_meetings: dados.acesso_meetings?? false,
          acesso_calendar: dados.acesso_calendar?? false,
          acesso_finance: dados.acesso_finance?? false,
          acesso_admin: dados.acesso_admin?? false,
        }
      });
      await get();
      setSelectedMember(null);
    } catch (error) {
      alert("Erro ao editar o Usuário!");
    }
  };
  return (
    <>
      <SideBar />

      <div className="memberListContainer">
        <h2>Membros</h2>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <span
                onClick={() => {
                  setSelectedMember(member);
                  console.log(member)
                }}
              >
                {member.nome} - {member.matricula}
              </span>
              <button onClick={() => handleRemoveMember(member.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
        <a href="/createAccount">
          <button type="button"> Adicionar Membro </button>
        </a>
      </div>

      {selectedMember && (
        <div className="popup">
          <div className="popup-content">
            <h3>Editar Membro</h3>
            <form
              id="formAdmin"
              onSubmit={(e) => {
                e.preventDefault();
                const dados = parseFormData(new FormData(e.target));
                editarUsuario(dados);
              }}
            >
              <input
                hidden
                type="text"
                name="id"
                defaultValue={selectedMember.id}
              />
              <label>
                Matrícula:
                <input
                  type="text"
                  name="matricula"
                  defaultValue={selectedMember.matricula}
                  required
                  maxLength={9}
                  pattern="[0-9]+"
                />
              </label>
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  defaultValue={selectedMember.nome}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedMember.email}
                  required
                />
              </label>
              <fieldset>
                <legend>Acessos</legend>
                <div>
                  <input
                    type="checkbox"
                    name="acesso_documents"
                    defaultChecked={selectedMember.acesso["acesso_documents"] ?? false}
                    value={true}
                  />
                  <label> Documentos </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="acesso_meetings"
                    defaultChecked={selectedMember.acesso["acesso_meetings"] ?? false}
                    value={true}
                  />
                  <label> Reuniões </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="acesso_calendar"
                    defaultChecked={selectedMember.acesso["acesso_calendar"] ?? false}
                    value={true}
                  />
                  <label> Calendário </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="acesso_finance"
                    defaultChecked={selectedMember.acesso["acesso_finance"] ?? false}
                    value={true}
                  />
                  <label> Financeiro </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="acesso_admin"
                    defaultChecked={selectedMember.acesso["acesso_admin"] ?? false}
                    value={true}
                  />
                  <label> Tela Admin </label>
                </div>
              </fieldset>
              <button type="submit">Atualizar</button>
              <button type="button" onClick={() => setSelectedMember(null)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
