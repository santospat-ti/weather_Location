import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  /* para o usuário aprovar o uso da localização
  se recusar, levanta a condição de que precisa da localização */
  const [location, setLocation] = useState(false);
  /*guarda os dados que vem da api */
  const [weather, setWeather] = useState(false);

  /*faz a chamada do api */
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }


  /*solicita informações para o browser */
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

/*verifica se o usuário permitiu acesso a localização */
  if (location == false) {
    return (
      <Fragment>
        Favor habilitar a localização no browser.
      </Fragment>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }