import React, { Component } from 'react';
import ReactTable from "react-table"; 
import { database, validateSession } from "../config/config";
import "react-table/react-table.css";


class DataTable extends Component {
    constructor() {
        super();
        this.state = {
            //data: makeData()
            data: []
        };
        console.log("consss");
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts() {
        console.log("hola");
        let databaseRef = database.ref('eventos')
        databaseRef.once('value').then((snapshot) => {
            const data = this.snapshotToArray(
              snapshot.val()
            );
            console.log(data);
            console.log("hola2");
            this.setState({ data });
        })
    }

    
    render() {
        const { data } = this.state;
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={[{
                        Header: 'Evento',
                        accessor: 'evento' // String-based value accessors!
                    }, {
                        Header: 'Participantes',
                        accessor: 'participantes',
                    }, {
                        Header: 'Fecha',
                        accessor: 'fecha'
                    }, {
                        Header: "Tipo de Evento",
                        accessor: "tipoEventos"
                    },{
                        Header: 'Discapacidad',
                        accessor: 'discapacidad'
                    },
                    {
                        Header: "Ámbito", // Custom header components!
                        accessor: 'ambito'
                    }, {
                        Header: "",
                        accessor:"actions"
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