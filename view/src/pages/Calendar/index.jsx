import React from 'react';
import './Calendar.css';
import SideBar from '../../components/SideBar';

function Calendar() {
  return (
    <>
      <SideBar />
      <div id="paginaCalendar">
        <div className='calendarTitulo'>
          <h1>Calendário</h1>
        </div>
        <div className='calendarCorpo'>
          <h2>Bem-vindo ao calendário</h2>
          {/* Adicione aqui o conteúdo do calendário */}
        </div>
      </div>
    </>
  );
}

export default Calendar;

