import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import SideBar from '../../components/SideBar';
import { editPassword } from '../../queries/user';
import Cookies from 'universal-cookie';
import axios from 'axios'

function Detail() {
    const { usuario, matricula, nome, email } = useParams();
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [senhaMatch, setSenhaMatch] = useState(true);
    const cookies = new Cookies();

    const token = cookies.get('jwtToken');
    axios.post("http://localhost:3000/users/token", {
        token: token
    }).then(function (response) {
        console.log(response.data);
    });


    const handleAlterarSenha = () => {
        setMostrarPopup(true);
    };

    const fecharPopup = () => {
        setNovaSenha('')
        setConfirmarSenha('')
        setMostrarPopup(false);
        setSenhaMatch(true); // Reinicia o estado para que a mensagem de erro desapareça quando o popup for fechado
    };

    const alterarSenha = async (userId, newData) => {
        try {
            await editPassword(userId, newData)
            alert("Senha alterada com sucesso!")
            fecharPopup()
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Verifica se as senhas são iguais
        if (novaSenha === confirmarSenha) {
            // Lógica para enviar a nova senha ao backend e fechar o popup
            /*console.log('Nova senha:', novaSenha);
            console.log('Confirmar senha:', confirmarSenha);
            setNovaSenha('');
            setConfirmarSenha('');
            setMostrarPopup(false);
            setSenhaMatch(true); // Reinicia o estado para que a mensagem de erro desapareça*/
            const IdUsuario = 2 //IMPORTANTE !! É preciso definir o id do usuário logado e mandar pra requisição
            await alterarSenha(IdUsuario, { //Precisa arrumar pra mandar o ID de usuário para alterar o cadastro
                "senha": novaSenha,
            })
        } else {
            setSenhaMatch(false); // Exibe mensagem de erro
        }
    };

    return (
        <>
            <SideBar />
            <section className="containerDetail">
                <div className="edraDetail">
                    <img className="img-edraV" src="/edraV.svg" alt="logo edraV" />
                </div>
                <div className="conteudo1">
                    <p>Olá {usuario}!</p>
                </div>

                <div className="conteudo2">
                    <p>
                        Nome: {nome}
                        <br />
                        Matrícula: {matricula}
                        <br />
                        E-mail: {email}
                    </p>
                </div>

                <div className="conteudo3">
                    <button onClick={handleAlterarSenha}>Alterar senha</button>
                    {mostrarPopup && (
                        <div className="popupContainer">
                            <div className="alterarSenhaPopup">
                                <span className="fecharPopup" onClick={fecharPopup}>&times;</span>
                                <h2>Alterar Senha</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>Nova Senha:</label>
                                    <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                                    <label>Confirmar Senha:</label>
                                    <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                                    {!senhaMatch && <p className="erroSenha">As senhas não coincidem.</p>}
                                    <button type="submit">Salvar</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Detail;
