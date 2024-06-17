import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import './Header.css';

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
