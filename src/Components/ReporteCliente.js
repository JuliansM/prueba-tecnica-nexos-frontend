import React from 'react';

class ReporteCliente extends React.Component {

    constructor() {
        super();

        this.state = {
            url: 'http://127.0.0.1:8080/api/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            reporteClientes: []
        }
    }

    getReporteClientes() {
        fetch(this.state.url + 'clientes/obtener-reporte-clientes', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    reporteClientes: data
                });
            });
    }

    componentDidMount() {
        this.getReporteClientes();
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                    {
                        this.state.reporteClientes.length > 0 ? this.state.reporteClientes.map(reporte => {
                            return (
                                <li key={reporte.idCliente}>
                                    <hr />
                                    <p><strong className="label">Identificación:</strong>
                                        <span className="label"> {reporte.idCliente}</span></p>

                                    <p><strong className="label">Nombre:</strong>
                                        <span className="label"> {reporte.nombreCliente}</span></p>

                                    <p><strong className="label">Primer apellido:</strong>
                                        <span className="label"> {reporte.apellido1Cliente}</span></p>

                                    <p><strong className="label">Segundo apellido:</strong>
                                        <span className="label"> {reporte.apellido2Cliente}</span></p>

                                    <p><strong className="label">Valor total gastado:</strong>
                                        <span className="label"> ${reporte.valorTotalGastado}</span></p>
                                    <hr />
                                </li>
                            )
                        }) : <span></span>
                    }
                </ul>
            </React.Fragment>
        );
    }
}

export default ReporteCliente;