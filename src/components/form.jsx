import React, { Component } from 'react';
import { TextField, DropDownMenu, FlatButton, MenuItem } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./header";
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
    //console.log(tipoEventos, this.state.tipoEventos);
    this.setState(() => {
      return { discapidad };
    });
  };
  
    handleDropDownChangeAmbito = e => {
        console.log(this.state.ambito);
        const ambito = e.target.value;
        this.setState(() => {
            return { ambito };
        });
    };

  handleDateChange = e => {
    const fecha = e.target.value;
    console.log(fecha);
    this.setState(() => ({ fecha }));
  };

  handleTimeChange = e => {
    const horario = e.target.value;
    this.setState(() => ({ horario }));
  };
  
    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        // if (this.validateForm()) {
        //     // Create firebase order and redirect to /app/deliver
        //     database.ref(`orders`).push(this.state).then((ref) => {
        //         customHistory.push('/app/deliver');
        //     });

        // } else {
        //     alert('Please check your order, remember that the minimum tip is of $5');
        // }

    }
    

  tipos = ["Conferencia", "Curso", "Diplomado", "Seminario", "Taller"];
  ambitos = ["Escolar", "Laboral", "Salud", "Social"];
  discapidad = ["Auditiva", "Intelectual", "Motriz", "Psicosocial", "Visual"];

  
  render() {
      
    return (
      <div>
        {/* <Header /> */}
        <form className="container">
          <MuiThemeProvider>
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
              //style={{ width: "100%" }}
              id='fecha'
              label="Fecha"
              type="date"
              value={this.state.fecha}
              onChange={this.handleDateChange}
            />
            <TextField
              id='tiempo'
              style={{paddingLeft:10}}
              type="time"
              label="Hora"
              value={this.state.horario}
              onChange={this.handleTimeChange}
            />
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
                    <option value={category}>{category}</option>
                  );
                })}
              </Select>
            </FormControl>
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
                      <option value={category}>{category}</option>
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
                      <option value={category}>{category}</option>
                  );
                })}
              </Select>
            </FormControl>
            <div style={{paddingTop:10}}>
                <FlatButton label="Crear Evento" backgroundColor="lightblue" onClick={this.handleFormSubmit}></FlatButton>
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