import React from 'react';

const JANUARY = 'JANUARY';
const FEBRUARY = 'FEBRUARY';
const MARCH = 'MARCH';
const APRIL = 'APRIL';
const MAY = 'MAY';
const JUNE = 'JUNE';
const JULY = 'JULY';
const AUGUST = 'AUGUST';
const SEPTEMBER = 'SEPTEMBER';
const OCTOBER = 'OCTOBER';
const NOVEMBER = 'NOVEMBER';
const DECEMBER = 'DECEMBER';

class ReporteCamarero extends React.Component {
    constructor() {
        super();

        this.state = {
            url: 'http://127.0.0.1:8080/api/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            reporteCamareros: [],
            reporteCamarerosArray: []
        };

        this.getReporteCamareros = this.getReporteCamareros.bind(this);
        this.generarFormatoReporteCamarero = this.generarFormatoReporteCamarero.bind(this);
        this.generarReporteCamarero = this.generarReporteCamarero.bind(this);
    }

    generarFormatoReporteCamarero(object) {
        if (object !== null) {
            return (
                <React.Fragment>
                    <li key={object.id}>
                        <strong className="label">{object.mes}</strong>
                        <hr />
                        <p><strong className="label">Nombre:</strong>
                            <span className="label"> {object.nombre}</span></p>

                        <p><strong className="label">Apellido:</strong>
                            <span className="label"> {object.apellido}</span></p>

                        <p><strong className="label">Total facturado:</strong>
                            <span className="label"> ${object.totalFacturado}</span></p>
                    </li>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <li>
                        <span className="label">Algo esta pasando</span>
                    </li>
                </React.Fragment>
            );
        }

    }

    async generarReporteCamarero() {
        let reporteCamarerosArray = [];
        if (this.state.reporteCamareros.length > 0) {
            this.state.reporteCamareros.forEach(reporte => {
                let totalFacturado = 0;
                if (reporte.detalleFacturaDTOS !== null) {
                    reporte.detalleFacturaDTOS.forEach(detalle => {
                        totalFacturado += detalle.importe;
                    });
                }
                reporteCamarerosArray.push(
                    {
                        id: reporte.idCamarero,
                        mes: reporte.mes,
                        nombre: reporte.nombreCamarero,
                        apellido: reporte.apellido1Camarero,
                        totalFacturado: totalFacturado
                    }
                );
            });
            await this.setState({
                reporteCamarerosArray: reporteCamarerosArray
            });
        }
    }

    getReporteCamareros() {
        fetch(this.state.url + 'camareros/obtener-reporte-camareros', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    reporteCamareros: data
                });
            })
            .then(() => {
                this.generarReporteCamarero();
            });
    }

    componentDidMount() {
        this.getReporteCamareros();
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                    {this.state.reporteCamarerosArray.length > 0 ?
                        this.state.reporteCamarerosArray.map(object => {
                            switch (object.mes) {
                                case JANUARY:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">ENERO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case FEBRUARY:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">FEBRERO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case MARCH:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">MARZO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case APRIL:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">ABRIL</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case MAY:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">MAYO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case JUNE:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">JUNIO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case JULY:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">JULIO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case AUGUST:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">AGOSTO</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case SEPTEMBER:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">SEPTIEMBRE</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case OCTOBER:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">OCTUBRE</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                                <hr/>
                                        </li>
                                    )
                                case NOVEMBER:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">NOVIEMBRE</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                            <hr />
                                        </li>
                                    )
                                case DECEMBER:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label si-factura">DICIEMBRE</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                            <hr />
                                        </li>
                                    )
                                default:
                                    return (
                                        <li key={object.id}>
                                            <strong className="label no-factura">Este camarero no ha facturado</strong>
                                            <hr />
                                            <p><strong className="label">Nombre:</strong>
                                                <span className="label"> {object.nombre}</span></p>

                                            <p><strong className="label">Apellido:</strong>
                                                <span className="label"> {object.apellido}</span></p>

                                            <p><strong className="label">Total facturado:</strong>
                                                <span className="label"> ${object.totalFacturado}</span></p>
                                            <hr />
                                        </li>
                                    )
                            }
                        }) : <span className="label">Algo esta mal</span>
                    }
                </ul>
            </React.Fragment>
        );
    }
}

export default ReporteCamarero;