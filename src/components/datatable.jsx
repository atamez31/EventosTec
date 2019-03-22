import React, { Component } from "react";
import ReactTable from "react-table";
import { database, validateSession } from "../config/config";
import "react-table/react-table.css";

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      //data: makeData
      data: []
    };
    this.databaseRef = database.ref("eventos");
  }

    componentDidMount() {
        this.databaseRef.on("value", this.gotData, this.errData);
    }

    getDate = date => {
        console.log(date);
    }
    // get the data from the firebase and push them out
    gotData = (data) => {
        let dataTable = []
        const eData = data.val();
        const keys = Object.keys(eData);

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            dataTable.push({
                evento: eData[k].evento,
                participantes: eData[k].participantes,
                tipoEventos: eData[k].tipoEventos,
                ambito: eData[k].ambito,
                discapacidad: eData[k].discapidad,
                fecha: eData[k].fecha,
                horario: eData[k].horario
            });
        }
        this.setState({ data: dataTable });
    }
    errData = (err) => {
        console.log(err);
    }
    // gotData() {
    // databaseRef.once("value")
    //   .then(snapshot => {
    //     const dataTable = [];
    //     const data = snapshot.val();
    //     const keys = Object.keys(data);

    //     for (let i = 0; i < keys.length; i++) {
    //       const k = keys[i];
    //       dataTable.push({
    //         evento: data[k].evento,
    //         participantes: data[k].participantes,
    //         tipoEventos: data[k].tipoEventos,
    //         ambito: data[k].ambito,
    //         discapacidad: data[k].discapidad,
    //         fecha: data[k].fecha,
    //         horario: data[k].horario
    //       });
    //     }

    //     return(dataTable);
    //   }
    // }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Evento",
              accessor: "evento" // String-based value accessors!
            },
            {
              Header: "Participantes",
              accessor: "participantes"
            },
            {
              Header: "Fecha",
              accessor: "fecha"
            },
            {
              Header: "Tipo de Evento",
              accessor: "tipoEventos"
            },
            {
              Header: "Discapacidad",
              accessor: "discapacidad"
            },
            {
              Header: "Ámbito", // Custom header components!
              accessor: "ambito"
            },
            {
              Header: "",
              accessor: "actions"
            }
          ]}
          defaultPageSize={this.state.data.length}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default DataTable;
