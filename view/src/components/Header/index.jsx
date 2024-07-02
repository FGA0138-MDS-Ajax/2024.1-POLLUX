/* 
   Este componente representa o cabeçalho (header) da aplicação, exibindo o logotipo da EDRA, 
   o qual redireciona para a página de Login, um menu de navegação com links âncora para seções 
   específicas da página. Além disso, inclui um efeito de rolagem suave para as seções referenciadas 
   pelos links âncora. e por último um icon da Unb.
*/

import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import './Header.css';

// Efeito de useEffect para adicionar e remover event listeners

function Header() {
    useEffect(() => {
        const headerLinks = document.querySelectorAll('.linksHeader');

        headerLinks.forEach(link => {
            link.addEventListener('click', scrollToSection);
        });

        return () => {
            headerLinks.forEach(link => {
                link.removeEventListener('click', scrollToSection);
            });
        };
    }, []);

    // Função para rolar suavemente até a seção correspondente ao link âncora clicado

    const scrollToSection = (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        const yOffset = -80; // Adjust as needed
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <header className='containerHeader'>
            <Link to="/login" >
                <img src="edraV.svg" alt="edraV" className='logoEdraHeader' />
            </Link>
            <nav className='navHeader'>
                <a href='#quemSomos' className='linksHeader'>
                    Quem somos
                </a>
                <a href='#nossosDrones' className='linksHeader'>
                    Nossos drones
                </a>
                <a href='#processoSeletivo' className='linksHeader'>
                    Processo Seletivo
                </a>
                <a href='#eventosCompeticoes' className='linksHeader'>
                    Eventos e competições
                </a>
            </nav>
            <img src="iconUnb.svg" alt="iconUnb" className='iconUnb' />
        </header>
    );
}

export default Header;
