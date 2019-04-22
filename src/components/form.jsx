import React, { Component } from "react";
import { TextField, FlatButton } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { database } from "../config/config";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
class Form extends Component {
  state = {
    evento: "",
    participantes: "",
    fecha: "",
    horario: "",
    ambito: "Escolar",
    discapidad: "Auditiva",
    tipoEventos: "Conferencia"
  };

  getMonth = month => {
    if (month === "En") {
      return "01";
    } else if (month === "Feb") {
      return "02";
    } else if (month === "Mar") {
      return "03";
    } else if (month === "Abr") {
      return "04";
    } else if (month === "May") {
      return "05";
    } else if (month === "Jun") {
      return "06";
    } else if (month === "Jul") {
      return "07";
    } else if (month === "Agto") {
      return "08";
    } else if (month === "Sept") {
      return "09";
    } else if (month === "Oct") {
      return "10";
    } else if (month === "Nov") {
      return "11";
    } else {
      return "12";
    }
  };

  getFecha = fecha => {
    const arrFecha = fecha.split(", ");
    return arrFecha[2] + "-" + this.getMonth(arrFecha[0]) +  "-" + arrFecha[1];
  };
  componentWillMount = () => {
    if (this.props.type === "Edit") {
      const index = this.props.row;
      this.setState(() => ({
        evento: this.props.data[index].evento,
        participantes: this.props.data[index].participantes,
        fecha: this.getFecha(this.props.data[index].fecha),
        horario: this.props.data[index].horario,
        ambito: this.props.data[index].ambito,
        discapidad: this.props.data[index].discapacidad,
        tipoEventos: this.props.data[index].tipoEventos
      }));
    }
  };
  handleNameChange = e => {
    const evento = e.target.value;
    this.setState(() => ({ evento }));
  };

  handleParticipants = e => {
    const participantes = e.target.value;
    this.setState(() => ({ participantes }));
  };

  handleDropDownChange = event => {
    const tipoEventos = event.target.value;
    //value = tipoEventos;
    this.setState(() => {
      return { tipoEventos };
    });
  };

  handleDropDownChangeDiscapacidad = event => {
    const discapidad = event.target.value;
    //value = discapidad
    this.setState(() => {
      return { discapidad };
    });
  };

  handleDropDownChangeAmbito = e => {
    const ambito = e.target.value;
    this.setState(() => {
      return { ambito };
    });
  };

  handleDateChange = e => {
    const fecha = e.target.value;
    this.setState(() => ({ fecha }));
  };

  handleTimeChange = e => {
    const horario = e.target.value;
    this.setState(() => ({ horario }));
  };

  validateForm() {
    if (
      this.state.evento.trim() === "" ||
      this.state.participantes.trim() === "" ||
      this.state.fecha === "" ||
      this.state.horario === ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.validateForm()) {
      if (this.props.type === "Edit") {
        database
          .ref(`eventos`)
          .child(this.props.data[this.props.row].key)
          .update({
            evento: this.state.evento, //"", //eData[k].evento,
            participantes: this.state.participantes, //"", //eData[k].participantes,
            tipoEventos: this.state.tipoEventos, //eData[k].tipoEventos,
            ambito: this.state.ambito, //eData[k].ambito,
            discapidad: this.state.discapidad, //eData[k].discapidad,
            fecha: this.state.fecha, //this.getFecha(eData[k].fecha),
            horario: this.state.horario //eData[k].horario
          });
      } else {
        database
          .ref(`eventos`)
          .push(this.state)
          .then(ref => {
            alert("Evento Creado");
          });
      }
    } else {
      alert("Llena todos los campos");
    }
  };

  tipos = [
    { id: 1, value: "Conferencia" },
    { id: 2, value: "Curso" },
    { id: 3, value: "Seminario" },
    { id: 4, value: "Taller" },
    { id: 5, value: "Diplomado" }
  ];

  ambitos = [
    { id: 1, value: "Escolar" },
    { id: 2, value: "Laboral" },
    { id: 3, value: "Salud" },
    { id: 4, value: "Social" }
  ];

  discapidad = [
    { id: 1, value: "Auditiva" },
    { id: 2, value: "Intelectual" },
    { id: 3, value: "Motriz" },
    { id: 4, value: "Psicosocial" },
    { id: 5, value: "Visual" }
  ];

  render() {
    return (
      <div>
        <form className="container">
          <MuiThemeProvider>
            <div>
              <TextField
                value={this.state.evento}
                onChange={this.handleNameChange}
                floatingLabelText="Nombre del Evento"
                style={{ width: "80%" }}
              />

              <TextField
                multiLine={true}
                value={this.state.participantes}
                onChange={this.handleParticipants}
                floatingLabelText="Participantes"
                style={{ width: "80%" }}
              />
              <br />
              <TextField
                id="fecha"
                label="Fecha"
                type="date"
                value={this.state.fecha}
                onChange={this.handleDateChange}
              />
              <TextField
                id="tiempo"
                style={{ paddingLeft: 10 }}
                type="time"
                label="Hora"
                value={this.state.horario}
                onChange={this.handleTimeChange}
              />
              <br />
              <FormControl>
                <InputLabel htmlFor="tipo">Tipo</InputLabel>
                <Select
                  native
                  value={this.state.tipoEventos}
                  onChange={this.handleDropDownChange}
                >
                  {this.tipos.map(category => {
                    return (
                      <option key={category.id} value={category.value}>
                        {category.value}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <FormControl>
                <InputLabel htmlFor="discapacidad">Discapacidad</InputLabel>
                <Select
                  native
                  value={this.state.discapidad}
                  onChange={this.handleDropDownChangeDiscapacidad}
                >
                  {this.discapidad.map(category => {
                    return (
                      <option key={category.id} value={category.value}>
                        {category.value}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <FormControl>
                <InputLabel htmlFor="ambito">Ámbito</InputLabel>
                <Select
                  native
                  value={this.state.ambito}
                  onChange={this.handleDropDownChangeAmbito}
                >
                  {this.ambitos.map(category => {
                    return (
                      <option key={category.id} value={category.value}>
                        {category.value}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <div style={{ paddingTop: 10 }}>
                <FlatButton
                  label="Confirmar"
                  backgroundColor="lightblue"
                  onClick={this.handleFormSubmit}
                />
              </div>
            </div>
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

export default Form;

/*
<TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        value={this.state.categories}
                        onChange={this.handleChange('currency')}
                        helperText="Please select your currency"
                        margin="normal"
                    >
                        {this.state.categories.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>*/
