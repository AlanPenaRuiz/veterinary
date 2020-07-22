import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
  //State citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  const [error, setError] = useState(false);

  //Funcion actualizar imput
  const handleChange = (e) => {
    //console.log(e.target.value);
    setCita({
      ...cita, //spread operator
      [e.target.name]: e.target.value,
    });
  };

  //extraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Submit
  const submitCita = (e) => {
    e.preventDefault(); //evita el metodo get
    //validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      //console.log("error");
      setError(true);
      return;
    }

    //Eliminar error
    setError(false);
    //ID
    cita.id = uuid();
    //Crear cita
    crearCita(cita);
    //Reset form
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre  Dueño de la mascota"
          onChange={handleChange}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleChange}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};
//PropType check is a function
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario;
