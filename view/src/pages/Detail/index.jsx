import { useState,useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import './Detail.css';
import SideBar from '../../components/SideBar';
import { editPassword } from '../../queries/user';
import axios from 'axios';

function Detail() {
    const { usuario, matricula, nome, email } = useParams();
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [senhaMatch, setSenhaMatch] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        try {
            var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            let token = cookieValue.jwtToken.toString();
            axios.post("http://localhost:3000/users/token", {
                token: token
            }).then(function(response) {
                if(response.data){
                }else{
                    navigate("/login")
                }
            }).catch(function(error) {
                console.error(error);
            });
        } catch (err) {
            navigate("/login");
        }
        
  },[]);


    const handleAlterarSenha = () => {
        setMostrarPopup(true);
    };

    const fecharPopup = () => {
        setNovaSenha('')
        setConfirmarSenha('')
        setMostrarPopup(false);
        setSenhaMatch(true); // Reinicia o estado para que a mensagem de erro desapareça quando o popup for fechado
    };
;
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
                    <img className="edraDetail" src="/edraV.svg" alt="logo edraV" />
                <div className="conteudo1">
                    <p>Olá {usuario}!</p>
                </div>

                <div className="conteudo2">
                    <p> Nome: {nome} </p>
                        <p> Matrícula: {matricula} </p>
                       <p> E-mail: {email} </p>
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
