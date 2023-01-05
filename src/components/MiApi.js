import React, { useState, useEffect, useCallback } from 'react';
import './MiApi.css';

const MiApi = () => {
  const [indicador, setIndicador] = useState({});
  const [moneda, setMoneda] = useState('dolar');
  const [showPrePage, setShowPrePage] = useState(true);
  const [resultados, setResultados] = useState([]); 

  // Envolver la función en useCallback
  const obtenerIndicador = useCallback(async (moneda) => {
    try {
      const response = await fetch(`https://mindicador.cl/api/${moneda}`);
      const data = await response.json();
      setIndicador(data.serie[1]);
      setResultados([data.serie[1]]);
      setTimeout(() => {
        setShowPrePage(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }, []); 

  useEffect(() => {
    obtenerIndicador(moneda);
  }, [moneda, obtenerIndicador]); 

  if (showPrePage) {
    return (
      <div className="pre-page">
        <p>Bienvenido al Banco...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="moneda">Selecciona una Opcion:</label>
        <select
          className="form-control"
          id="moneda"
          value={moneda}
          onChange={(event) => {
              setMoneda(event.target.value);
              obtenerIndicador(event.target.value);
            }}
          >
            <option value="uf">Unidad de Fomento</option>
            <option value="ivp">Indice de Valor Promedio</option>
            <option value="dolar">Dólar</option>
            <option value="dolar_intercambio">Dólar Intercambio</option>
            <option value="euro">Euro</option>
            <option value="ipc">Indice de Precios al Consumidor</option>
            <option value="utm">Unidad Tributaria Mensual</option>
            <option value="imacec">Indice Mensual de Actividad Económica</option>
            <option value="tpm">Tasa Política Monetaria</option>
            <option value="libra_cobre">Libra de Cobre</option>
            <option value="tasa_desempleo">Tasa de Desempleo</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
        </div>
        <div className="resultados">
          {resultados.slice(-2).map((resultado, index) => (
            <div className="resultado" key={index}>
              <p>Consultas:</p>
              <p>Fecha: {resultado.fecha}</p>
              <p>Valor: ${resultado.valor}</p>
            </div>
          ))}
        </div>
        <div className="mi-api card">
          <div className="card-body">
            <h2 className="card-title">Opcion Selecionada a Mostrar</h2>
            <p className="card-text">Fecha: {indicador.fecha}</p>
            <p className="card-text">Valor: ${indicador.valor}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default MiApi;
