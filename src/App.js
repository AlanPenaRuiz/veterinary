import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
//import Cita from './components/Cita';

function App() {
  //Citas local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  //Array citas
  const [citas, guardarCitas] = useState([]);

  //Use effect se ejecuta cuando el componente esta listo o hay cambios[citas]
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //Guardar citas nuevas
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Eliminar cita por ID
  const deleteCita = (id) => {
    const newCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(newCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1> Administracion de pacientes </h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} deleteCita={deleteCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default App;
