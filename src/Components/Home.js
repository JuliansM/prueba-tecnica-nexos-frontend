import React from 'react'
import { Alert } from 'react-bootstrap';
import './Home.css'
import ReporteCamarero from './ReporteCamarero';
import ReporteCliente from './ReporteCliente';

class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            idCliente: '',
            idCamarero: '',
            idCocinero: '',
            idMesa: 0,
            clientes: [],
            camareros: [],
            mesas: [],
            descripcionPlato: '',
            cocineros: [],
            valorPlato: 0,
            url: 'http://127.0.0.1:8080/api/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            detalleFactura: [],
            esFacturacion: false,
            esReporteCamareros: false,
            esReporteClientes: false,
            reporteClientes: [],
            totalFacturaCamarero: 0,
            isError: false,
            isSuccess: false
        };

        this.changeHandle = this.changeHandle.bind(this);
        this.crearFactura = this.crearFactura.bind(this);
        this.reporteCamareros = this.reporteCamareros.bind(this);
        this.reporteClientes = this.reporteClientes.bind(this);
        this.changeClienteHandle = this.changeClienteHandle.bind(this);
        this.changeCamareroHandle = this.changeCamareroHandle.bind(this);
        this.changeMesaHandle = this.changeMesaHandle.bind(this);
        this.changeDescripcionPlatoHandle = this.changeDescripcionPlatoHandle.bind(this);
        this.changeCocineroHandle = this.changeCocineroHandle.bind(this);
        this.changeValorPlatoHandle = this.changeValorPlatoHandle.bind(this);
        this.addDetalleFactura = this.addDetalleFactura.bind(this);
        this.validateDetalleFactura = this.validateDetalleFactura.bind(this);
        this.dismissDetalleFactura = this.dismissDetalleFactura.bind(this);
        this.saveFactura = this.saveFactura.bind(this);
        this.getReporteClientes = this.getReporteClientes.bind(this);
    }

    async crearFactura() {
        await this.setState({
            esFacturacion: true,
            esReporteCamareros: false,
            esReporteClientes: false,
            isError: false,
            isSuccess: false
        });
    }

    async reporteCamareros() {
        await this.setState({
            esFacturacion: false,
            esReporteCamareros: true,
            esReporteClientes: false,
            isError: false,
            isSuccess: false
        });
    }

    async reporteClientes() {
        await this.setState({
            esFacturacion: false,
            esReporteCamareros: false,
            esReporteClientes: true,
            isError: false,
            isSuccess: false
        });
        this.getReporteClientes();
    }

    getClientes() {
        fetch(this.state.url + 'clientes', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    clientes: data
                });
            });
    }

    getCamareros() {
        fetch(this.state.url + 'camareros', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    camareros: data
                });
            });
    }

    getMesas() {
        fetch(this.state.url + 'mesas', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    mesas: data
                });
            });
    }

    getCocineros() {
        fetch(this.state.url + 'cocineros', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cocineros: data
                });
            });
    }

    dismissDetalleFactura(e) {
        e.preventDefault();
        if (this.state.detalleFactura.length > 0) {
            this.state.detalleFactura.splice((this.state.detalleFactura.length - 1), 1);
            this.setState({
                detalleFactura: this.state.detalleFactura
            });
        }
    }

    addDetalleFactura(e) {
        e.preventDefault();
        if (this.validateDetalleFactura()) {
            let detail = {
                idCocinero: this.state.idCocinero,
                plato: this.state.descripcionPlato,
                importe: this.state.valorPlato
            };
            this.state.detalleFactura.push(detail);
            this.setState({
                idCocinero: '',
                descripcionPlato: '',
                valorPlato: 0
            });
        }
    }

    validateDetalleFactura() {
        let isValid = true;
        if (this.state.idCocinero === '' || this.state.idCocinero === null || this.state.idCocinero === undefined) {
            isValid = false;
        }
        if (this.state.descripcionPlato === '' || this.state.descripcionPlato === null || this.state.descripcionPlato === undefined) {
            isValid = false;
        }
        if (this.state.valorPlato <= 0) {
            isValid = false;
        }
        return isValid;
    }

    saveFactura(e) {
        e.preventDefault();
        if (this.state.idCliente !== '' && this.state.idCamarero !== '' && this.state.idMesa > 0) {
            if (this.state.detalleFactura.length > 0) {
                const dataForm = {
                    detalleFacturas: this.state.detalleFactura,
                    idCamarero: this.state.idCamarero,
                    idCliente: this.state.idCliente,
                    idMesa: this.state.idMesa
                };

                fetch(this.state.url + 'facturas/registrar-factura', {
                    'mode': 'cors',
                    method: 'post',
                    body: JSON.stringify(dataForm),
                    headers: this.state.headers
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.idFactura !== null) {
                            this.setState({
                                isSuccess: true,
                                isError: false,
                                idCliente: '',
                                idCamarero: '',
                                idMesa: 0,
                                detalleFactura: []
                            });
                        } else {
                            this.setState({
                                isSuccess: false,
                                isError: true
                            });
                        }
                    });
            }
        }
    }

    getReporteClientes() {
        fetch(this.state.url + 'clientes/obtener-reporte-clientes', {
            'mode': 'cors',
            headers: this.state.headers
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    reporteClientes: data
                });
            });
    }

    changeHandle(e) { }

    async changeClienteHandle(e) {
        await this.setState({ idCliente: e.target.value });
    }

    async changeCamareroHandle(e) {
        await this.setState({ idCamarero: e.target.value });
    }

    async changeMesaHandle(e) {
        await this.setState({ idMesa: e.target.value });
    }

    async changeDescripcionPlatoHandle(e) {
        await this.setState({ descripcionPlato: e.target.value });
    }

    async changeCocineroHandle(e) {
        await this.setState({ idCocinero: e.target.value });
    }

    async changeValorPlatoHandle(e) {
        await this.setState({ valorPlato: e.target.value });
    }

    componentDidMount() {
        this.getClientes();
        this.getCamareros();
        this.getMesas();
        this.getCocineros();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <br />
                            <h3 className="text-center text-warning">Restaurante - La Mejor Cocina</h3><br />
                            <div align="center" className="mb-5">
                                <button className="btn btn-success mr-1" onClick={this.crearFactura}>Crear factura</button>
                                <button className="btn btn-dark mr-1" onClick={this.reporteCamareros}>Reporte de camareros</button>
                                <button className="btn btn-dark" onClick={this.reporteClientes}>Reporte de clientes</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            {
                                this.state.isError ?
                                    <Alert variant="danger">
                                        Error interno: no se pudo crear la factura, contacte al administrador.
                                </Alert> : <span></span>
                            }
                            {
                                this.state.isSuccess ?
                                    <Alert variant="success">
                                        La factura ha sido creada exitosamente.
                                </Alert> : <span></span>
                            }
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                    {
                        this.state.esFacturacion ?
                            <div className="row">
                                <div className="col-sm-12 pb-5 mb-5">
                                    <form onChange={this.changeHandle}>
                                        <div className="row">
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-4">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="subtitle text-info">Información general venta</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <label className="label">Cliente: </label>
                                                            <select className="form-control input" value={this.state.idCliente} onChange={this.changeClienteHandle}>
                                                                <option>Seleccione...</option>
                                                                {this.state.clientes.length > 0 ? this.state.clientes.map(cliente => {
                                                                    if (cliente.idCliente !== undefined) {
                                                                        return (
                                                                            <option key={cliente.idCliente} value={cliente.idCliente}>
                                                                                {cliente.idCliente}-{cliente.nombre + ' ' + cliente.apellido1}
                                                                            </option>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                }) : <option></option>}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="label">Camarero: </label>
                                                            <select className="form-control input" value={this.state.idCamarero} onChange={this.changeCamareroHandle}>
                                                                <option>Seleccione...</option>
                                                                {this.state.camareros.length > 0 ? this.state.camareros.map(camarero => {
                                                                    if (camarero.idCamarero !== undefined) {
                                                                        return (
                                                                            <option key={camarero.idCamarero} value={camarero.idCamarero}>
                                                                                {camarero.idCamarero} - {camarero.nombre + ' ' + camarero.apellido1}
                                                                            </option>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                }) : <option></option>}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="label">Mesa: </label>
                                                            <select className="form-control input" value={this.state.idMesa} onChange={this.changeMesaHandle}>
                                                                <option>Seleccione...</option>
                                                                {this.state.mesas.length > 0 ? this.state.mesas.map(mesa => {
                                                                    if (mesa.idMesa !== undefined) {
                                                                        return (
                                                                            <option key={mesa.idMesa} value={mesa.idMesa}>
                                                                                {mesa.idMesa} - {mesa.ubicacion}
                                                                            </option>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                }) : <option></option>}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer">
                                                        <button onClick={this.saveFactura} className="btn btn-dark btn-block">
                                                            Guardar factura
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="subtitle text-info">Agregar detalle de venta</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <label className="label">Cocinero: </label>
                                                            <select className="form-control input" value={this.state.idCocinero} onChange={this.changeCocineroHandle}>
                                                                <option>Seleccione...</option>
                                                                {this.state.cocineros.length > 0 ? this.state.cocineros.map(cocinero => {
                                                                    if (cocinero.idCocinero) {
                                                                        return (
                                                                            <option key={cocinero.idCocinero} value={cocinero.idCocinero}>
                                                                                {cocinero.idCocinero} - {cocinero.nombre + ' ' + cocinero.apellido1}
                                                                            </option>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                }) : <option></option>}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="label">Descripción plato: </label>
                                                            <input className="form-control input" type="text" placeholder="Descripción plato"
                                                                value={this.state.descripcionPlato} onChange={this.changeDescripcionPlatoHandle} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="label">Valor plato: </label>
                                                            <input className="form-control input" value={this.state.valorPlato} onChange={this.changeValorPlatoHandle} type="number" placeholder="Valor plato" />
                                                        </div>
                                                    </div>
                                                    <div className="card-footer">
                                                        <button onClick={this.addDetalleFactura} className="btn btn-info mr-2">
                                                            Agregar ({this.state.detalleFactura.length})
                                                        </button>
                                                        <button onClick={this.dismissDetalleFactura} className="btn btn-danger">
                                                            <span className="text-detail-button">-</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-2"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            : <span></span>
                    }
                    {
                        this.state.esReporteCamareros ?
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="subtitle text-info">Reporte de camareros</h4>
                                        </div>
                                        <div className="card-body">
                                            <ReporteCamarero />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                            : <span></span>
                    }
                    {
                        this.state.esReporteClientes ?
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="subtitle text-info">Reporte de clientes</h4>
                                        </div>
                                        <div className="card-body">
                                            <ReporteCliente />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                            : <span></span>
                    }
                </div>
            </React.Fragment >
        );
    }
}

export default Home;