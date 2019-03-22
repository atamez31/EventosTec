import React, { Component } from "react";
import ReactTable from "react-table";
import { database, validateSession } from "../config/config";
import "react-table/react-table.css";

class DataTable extends Component {
  constructor() {
    super();
    this.databaseRef = database.ref("eventos");
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    this.databaseRef.on("value", this.gotData, this.errData);
  }

  getMonth = month => {
    if (month === "01") {
      return "En";
    } else if (month === "02") {
      return "Feb";
    } else if (month === "03") {
      return "Mar";
    } else if (month === "04") {
      return "Abr";
    } else if (month === "05") {
      return "May";
    } else if (month === "06") {
      return "Jun";
    } else if (month === "07") {
      return "Jul";
    } else if (month === "08") {
      return "Agto";
    } else if (month === "09") {
      return "Sept";
    } else if (month === "10") {
      return "Oct";
    } else if (month === "11") {
      return "Nov";
    } else {
      return "Dic";
    }

    return month;
  };
  getFecha = date => {
    const arr = date.split("-");
    return this.getMonth(arr[1]) + " " + arr[2] + " " + arr[0];
  };

  getData() {
    this.databaseRef.once("value").then(snapshot => {
      let dataTable = [];
      const eData = snapshot.val();
      const keys = Object.keys(eData);

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        dataTable.push({
          key: k,
          evento: eData[k].evento,
          participantes: eData[k].participantes,
          tipoEventos: eData[k].tipoEventos,
          ambito: eData[k].ambito,
          discapacidad: eData[k].discapidad,
          fecha: this.getFecha(eData[k].fecha),
          horario: eData[k].horario
        });
      }
      return dataTable;
    });
  }
  // get the data from the firebase and push them out
  gotData = data => {
    let dataTable = [];
    const eData = data.val();
    const keys = Object.keys(eData);

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      dataTable.push({
        key: k,
        evento: eData[k].evento,
        participantes: eData[k].participantes,
        tipoEventos: eData[k].tipoEventos,
        ambito: eData[k].ambito,
        discapacidad: eData[k].discapidad,
        fecha: this.getFecha(eData[k].fecha),
        horario: eData[k].horario
      });
    }
    this.setState({ data: dataTable });
  };
  errData = err => {
    console.log(err);
  };

  handleEdit = r => {
      console.log(r._index);
      console.log(this.state.data[r._index].key);
  };

    handleDelete = r => {
        const index = r._index;
        this.databaseRef.child(this.state.data[index].key).remove();
    }


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
              Header: "Hora",
              accessor: "horario"
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
              accessor: "actions",
              Cell: ({ row }) => (
                <div>
                  <button onClick={e => this.handleEdit(row)}>
                    Editar
                  </button>
                  <button onClick={e => this.handleDelete(row)}>
                    Eliminar
                  </button>
                </div>)
            }
          ]}
          defaultPageSize={4}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default DataTable;
