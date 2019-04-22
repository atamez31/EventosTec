import React, { Component } from "react";
import ReactTable from "react-table";
import { database } from "../config/config";
import "react-table/react-table.css";
import DialogForm from "./dialogForm";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

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
  };

  getFecha = date => {
    const arr = date.split("-");
    return this.getMonth(arr[1]) + ", " + arr[2] + ", " + arr[0];
  };

  getData() {
    this.databaseRef.once("value").then(snapshot => {
      let dataTable = [];
      const eData = snapshot.val();

      if(eData != null)
      {
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
      }
      return dataTable;
    });
  }
  // get the data from the firebase and push them out
  gotData = data => {
    let dataTable = [];
    const eData = data.val();
    if (eData != null) {
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
    }
    this.setState({ data: dataTable });
  };
  errData = err => {
    console.log(err);
  };

    handleDelete = r => {
        if (window.confirm("¿Estás seguro de querer eliminar ese evento?")) {
            const index = r._index;
            this.databaseRef.child(this.state.data[index].key).remove();
        }
    }

  handleSubComponent = r => {
    return (
      <div style={{ padding: "20px" }}>
        {r.original.evento} por {r.original.participantes}
      </div>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={this.props.isSignedIn ? ([
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
                  <DialogForm
                    type={"Edit"}
                    icon={"outlined"}
                    row={row._index}
                    data={this.state.data}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    aria-label="delete"
                    onClick={e => this.handleDelete(row)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              )
            }
          ]) : ([
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
            }
          ])}
          defaultPageSize={4}
          className="-striped -highlight"
          SubComponent={row => {
            return this.handleSubComponent(row);
          }}
        />
        <br />
      </div>
    );
  }
}

export default DataTable;
