import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import SideBar from '../../components/SideBar';
import Kanban from '../../components/Kanban';
import axios from 'axios';


const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/eventos');
    //console.log('Resposta da API:', response.data);

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      //console.error('A resposta da API não é um array:', response.data);
      return [];
    }
  } catch (error) {
    //console.error('Erro ao buscar eventos:', error);
    return [];
  }
};



const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);
  const navigate = useNavigate();

  const listMonthEvents = async () => {
    try {
      const response = await fetchEvents();
      //console.log('Eventos obtidos do banco de dados:', response);
  
      if (!Array.isArray(response)) {
        //console.error('Erro: response não é um array');
        return;
      }
  
      // Filtrar eventos para o mês atual
      const monthEvents = response.filter(eventObj => {
        const eventDate = new Date(eventObj.data);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
      });
  
      // Ordenar os eventos pela data e hora
      let eventsList = "";
      monthEvents.forEach(eventObj => {
        eventsList += `<div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${eventObj.nome}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">${eventObj.HoraInicio} - ${eventObj.HoraTermino}</span>
          </div>
          <div class="event-date">
            <span class="event-date">${eventObj.data}</span>
          </div>
        </div>`;
      });
  
      if (eventsList === "") {
        eventsList = `<div class="no-event"><h3>Sem eventos no mês</h3></div>`;
      }
  
      document.querySelector('.events-month').innerHTML = eventsList;
    } catch (error) {
      //console.error('Erro ao buscar eventos:', error);
    }
  };
  

  useEffect(() => {
    document.title = 'Calendário';
    try {
      var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
      let token = cookieValue.jwtToken.toString();
      axios.post("http://localhost:3000/users/token", {
        token: token
      }).then(function(response) {
        if(!(response.data < 0)){
          axios.get("http://localhost:3000/users/"+response.data.id).then(function (resposta){
            if(resposta.data.acesso.acesso_calendar){
            }else{
              navigate("/detail")
            }
          });
        }else{
            navigate("/login")
          }
      }).catch(function(error) {
          //console.error(error);
      });
  } catch (err) {
      navigate("/login");
    }
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEventsArr(JSON.parse(savedEvents));
    }
    initCalendar();
  }, []);

  useEffect(() => {
    initCalendar();
    listMonthEvents();
  }, [month, year, eventsArr]);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
          event = true;
        }
      });
      if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
        setActiveDay(i);
        getActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day ">${i}</div>`;
        }
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }

    document.querySelector('.days').innerHTML = days;
    addListener(); //Isso vaza memória, pra que esse listener?
  };

  const prevMonth = () => {
    setMonth(month - 1 < 0 ? 11 : month - 1);
    setYear(month - 1 < 0 ? year - 1 : year);
  };

  const nextMonth = () => {
    setMonth(month + 1 > 11 ? 0 : month + 1);
    setYear(month + 1 > 11 ? year + 1 : year);
  };

  const addListener = () => {
    document.querySelectorAll('.day').forEach(day => {
      day.addEventListener('click', (e) => {
        const selectedDay = Number(e.target.innerHTML);
        setActiveDay(selectedDay);
        getActiveDay(selectedDay);
        updateEvents(selectedDay);
      });
    });
  };

  const gotoDate = () => {
    const dateInput = document.querySelector('.date-input').value;
    const dateArr = dateInput.split('/');
    if (dateArr.length === 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      setMonth(dateArr[0] - 1);
      setYear(dateArr[1]);
    } else {
      alert('Data Inválida');
    }
  };

  const getActiveDay = (date) => {
    const day = new Date(year, month, date);
    const dayName = weekdays[day.getDay()];
    document.querySelector('.event-day').innerHTML = dayName;
    document.querySelector('.event-date').innerHTML = `${date} ${months[month]} ${year}`;
  };

  const updateEvents = async (date) => {
    try {
      const allEvents = await fetchEvents();
      //console.log('Eventos obtidos do banco de dados:', allEvents);
  
      if (!Array.isArray(allEvents)) {
        //console.error('Erro: allEvents não é um array');
        return;
      }
  
      // Filtrar eventos para a data específica
      const dayEvents = allEvents.filter(eventObj =>
        new Date(eventObj.data).getDate() === date &&
        new Date(eventObj.data).getMonth() === month &&
        new Date(eventObj.data).getFullYear() === year
      );
  
      //console.log('Eventos do dia filtrados:', dayEvents);
  
      let events = "";
      if (dayEvents.length > 0) {
        // Ordenar os eventos por hora
        dayEvents.sort((a, b) => {
          return a.HoraInicio.localeCompare(b.HoraInicio);
        });
        dayEvents.forEach((event) => {
          events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.nome}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.HoraInicio} - ${event.HoraTermino}</span>
              <img src="trash.svg" alt="Excluir" class="delete-event" data-id="${event.id}" />
            </div>
          </div>`;
        });
      } else {
        events = `<div class="no-event"><h3>Sem eventos no dia</h3></div>`;
      }
  
      document.querySelector('.events').innerHTML = events;
      document.querySelectorAll('.delete-event').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const eventId = e.target.getAttribute('data-id');
          deletaEvento(eventId);
        });
      });
    } catch (error) {
      //console.error('Erro ao buscar eventos:', error);
    }
  };

  const saveEvents = () => { //Tem local storage?
    localStorage.setItem('events', JSON.stringify(eventsArr));
  };

  const addEvent = () => {
    const eventTitle = document.querySelector('.event-name').value;
    const eventTimeFrom = document.querySelector('.event-time-from').value;
    const eventTimeTo = document.querySelector('.event-time-to').value;
    const eventDate = document.querySelector('.event-date').innerHTML; 
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
      alert("Formato de hora inválido");
      return;
    }

    const timeFrom = eventTimeFrom;
    const timeTo = eventTimeTo;

    let eventExist = false;
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === activeDay && eventObj.month === month + 1 && eventObj.year === year) {
        eventObj.events.forEach((event) => {
          if (event.title === eventTitle) {
            eventExist = true;
          }
        });
      }
    });

    if (eventExist) {
      alert("Evento já adicionado");
      return;
    }

    const newEvent = { title: eventTitle, time: `${timeFrom} - ${timeTo}` };

    let eventAdded = false;
    const updatedEventsArr = eventsArr.map((item) => {
      if (item.day === activeDay && item.month === month + 1 && item.year === year) {
        item.events.push(newEvent);
        item.events.sort((a, b) => a.time.localeCompare(b.time));
        eventAdded = true;
      }
      return item;
    });

    if (!eventAdded) {
      updatedEventsArr.push({ day: activeDay, month: month + 1, year: year, events: [newEvent] });
    }

    setEventsArr(updatedEventsArr);
    document.querySelector('.add-event-wrapper').classList.remove('active');
    document.querySelector('.event-name').value = "";
    document.querySelector('.event-time-from').value = "";
    document.querySelector('.event-time-to').value = "";
    updateEvents(activeDay);

    const res = {
      nome: eventTitle,
      data: eventDate,
      HoraInicio: timeFrom,
      HoraTermino: eventTimeTo
    }

    axios.post("http://localhost:3000/eventos", res)
    .then(function (response) {
      // Resposta recebida com sucesso
      //console.log("Documento criado com sucesso:", response.data);
      const currentDate = new Date();
      updateEvents(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear())
    })
    .catch(function (error) {
      // Ocorreu um erro ao fazer a solicitação
      //console.error("Erro ao criar documento:", error);
    });

  };

function deletaEvento(id){
  axios.post("http://localhost:3000/eventos/delete",{
    id: id
  });
  updateEvents();
}

  return (
    <>
      <SideBar />
      <div id="paginaCalendar">
        <div className='calendarTitulo'>
          <h1>Calendário</h1>
        </div>
        <div className='calendarCorpo'>
          <div className="container">
            <div className="left">
              <div className="calendar">
                <div className="month">
                  <div className="prev" onClick={prevMonth}><span>&#10094;</span></div>
                  <div className="date">
                    <h1>{months[month]}</h1>
                    <h2>{year}</h2>
                  </div>
                  <div className="next" onClick={nextMonth}><span>&#10095;</span></div>
                </div>
                <div className="weekdays">
                  {weekdays.map(day => (
                    <div key={day}>{day}</div>
                  ))}
                </div>
                <div className="days"></div>
                <div className="goto-today">
                  <div className="goto">
                    <input type="text" placeholder="mm/yyyy" className="date-input" />
                    <button className="goto-btn" onClick={gotoDate}>Ir</button>
                  </div>
                  <button className="today-btn" onClick={() => {
                    setToday(new Date());
                    setMonth(new Date().getMonth());
                    setYear(new Date().getFullYear());
                  }}>Hoje</button>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="today-date">
                <div className="event-day">Dia</div>
                <div className="event-date">Data</div>
              </div>
              <div className="events"></div>
              <div className="add-event">
                <div className="add-event-wrapper">
                  <div className="add-event-header">
                    <span>Adicionar Evento</span>
                    <button className="close" onClick={() => document.querySelector('.add-event-wrapper').classList.remove('active')}><i className="fas fa-times"></i></button>
                  </div>
                  <div className="add-event-body">
                    <input type="text" placeholder="Nome do Evento" className="event-name" />
                    <div className="time">
                      <input type="text" placeholder="Hora de Início" className="event-time-from" />
                      <span>-</span>
                      <input type="text" placeholder="Hora de Término" className="event-time-to" />
                    </div>
                  </div>
                  <div className="add-event-footer">
                    <button className="add-event-btn" onClick={addEvent}>Adicionar Evento</button>
                  </div>
                </div>
                <button className="add-event-btn" onClick={() => document.querySelector('.add-event-wrapper').classList.add('active')}>Adicionar Evento</button>
                <h3 className="event-month-title">Eventos do Mês:</h3>
                <div className="events-month"></div>
              </div>
            </div>
          </div>
        </div>
        <div className='calendarSubTitulo'>
          <h1>Quadro Kanban</h1>
        </div>
      </div>
      <Kanban />
    </>
  );
};

export default Calendar;
