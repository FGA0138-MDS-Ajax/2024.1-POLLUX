import { useEffect, useState } from "react";
import "./Admin.css";
import SideBar from "../../components/SideBar";
import { editUser, getUsers } from "../../queries/user";
import { parseFormData } from "../../utils/parseFormData";


function Admin() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

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
    get();
  }, []);

  const handleRemoveMember = (memberId) => {
    const updatedMembers = members.filter((_, i) => i !== memberId);
    setMembers(updatedMembers);
    alert("Membro removido: " + "");
  };

  const editarUsuario = async (dados) => {
    try {
      await editUser(dados.id, dados)
      await get()
      setSelectedMember(null)
    } catch (error) {
      alert("Erro ao editar o Usuário!")
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
              <span onClick={() => setSelectedMember(member)}>
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
                const dados = parseFormData(new FormData(e.target))
                console.log(dados)
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
                  pattern='[1-9]*'
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
                <legend>Edição de Telas</legend>
                <div>
                  <input
                    type="checkbox"
                    id="telaCalendario"
                    name="checkboxEdiçãoTela"
                    value="calendario"
                  />
                  <label> Calendário </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaEstoque"
                    name="checkboxEdiçãoTela"
                    value="estoque"
                  />
                  <label> Estoque </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaReunioes"
                    name="checkboxEdiçãoTela"
                    value="reunioes"
                  />
                  <label> Reuniões </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaFinanceiro"
                    name="checkboxEdiçãoTela"
                    value="financeiro"
                  />
                  <label> Financeiro </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaDocumentos"
                    name="checkboxEdiçãoTela"
                    value="documentos"
                  />
                  <label> Documentos </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Vizualização de Telas</legend>
                <div>
                  <input
                    type="checkbox"
                    id="telaCalendario"
                    name="checkboxEdiçãoTela"
                    value="calendario"
                    checked
                  />
                  <label> Calendário </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaEstoque"
                    name="checkboxEdiçãoTela"
                    value="estoque"
                    checked
                  />
                  <label> Estoque </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaReunioes"
                    name="checkboxEdiçãoTela"
                    value="reunioes"
                    checked
                  />
                  <label> Reuniões </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaFinanceiro"
                    name="checkboxEdiçãoTela"
                    value="financeiro"
                  />
                  <label> Financeiro </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telaDocumentos"
                    name="checkboxEdiçãoTela"
                    value="documentos"
                    checked
                  />
                  <label> Documentos </label>
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
