import React from 'react';
import FormClasRiesgo from './FormClasRiesgo';
import SearchClasRiesgo from './SearchClasRiesgo';
import Table from '../../../../components/Table/Table';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { messages } from '../../../../util/messages';
import PageTitle from '../../../../components/Page/TitlePage';
import { connect } from 'react-redux';
import {
    STARTACTIONPOST,
    STARTACTIONPUT,
    STARTACTIONDELETE,
    STARTACTIONSEARCH,
    exportClasRiesgo
} from '../../../../redux/ClasRiesgo/actions';
import {
    ACTIONOCUPACION
} from '../../../../redux/Common/filters';
import {
    MINERO
} from '../../../../services/constants';

const index = 'Clasificación de Riesgo por Giros de Negocio';
const indexBuscar = "CONSULTAR CLASIFICACION DE RIESGO POR GIRO DE NEGOCIO";
const indexRegistrar = "REGISTRAR CLASIFICACION DE RIESGO POR GIRO DE NEGOCIO";
const indexModificar = "MODIFICAR CLASIFICACION DE RIESGO POR GIRO DE NEGOCIO";
const indexEliminar = "ELIMINAR CLASIFICACION DE RIESGO POR GIRO DE NEGOCIO";
const indexExportar = "EXPORTAR CLASIFICACION DE RIESGO POR GIRO DE NEGOCIO";


class ClasRiesgo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalClasRiesgo: false,
            clasRiegoEdit: undefined,
            params: undefined,
            id: undefined,
        };
        this.handleModalOff = this.handleModalOff.bind(this);
        this.exportFile = this.exportFile.bind(this);
    }

    async componentDidMount() {
        await this.props.STARTACTIONSEARCH({
            idegironegocio: "",
            ideocupacion: "",
            ideriesgo: "",
            idptipogironegocio: "",
            idpestasignacion: "",
            indminera: ""
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clasriesgos.reload !== prevProps.clasriesgos.reload) {
            this.updateData();
        }
    }

    async updateData() {
        await this.props.STARTACTIONSEARCH({
            idegironegocio: "",
            ideocupacion: "",
            ideriesgo: "",
            idptipogironegocio: "",
            idpestasignacion: "",
            indminera: ""
        });
    }

    handleModal = () => {
        this.setState({ modalClasRiesgo: true })
    }

    handleModalOff = () => {
        this.setState({
            modalClasRiesgo: false,
            modalDelete: false,
            clasRiegoEdit: undefined
        })
    }
    handleEditClasRiesgo = (e, params) => {
        this.setState({ clasRiegoEdit: e, modalClasRiesgo: true, params: params })
    }

    handleDeleteClasRiesgo = (e) => {
        showDeleteConfirm(messages.clasriesgo.title,
            messages.confirmationDelete,
            () => this.props.STARTACTIONDELETE(e));
    }
    async exportFile() {
        await this.props.exportClasRiesgo();
    };

    render() {
        const { modalClasRiesgo, clasRiegoEdit } = this.state;
        const {
            clasriesgos,
            girosnegocios,
            ocupaciones,
            riesgos,
            tiposgironegocios,
            estadosgiro,
            STARTACTIONSEARCH,
            ACTIONOCUPACION,
            acciones
        } = this.props;
        const dataSource = clasriesgos.clasriesgos;

        let buscar = acciones.permisos.indexOf(indexBuscar);
        let agregar = acciones.permisos.indexOf(indexRegistrar);
        let modificar = acciones.permisos.indexOf(indexModificar);
        let eliminar = acciones.permisos.indexOf(indexEliminar);
        let exportar = acciones.permisos.indexOf(indexExportar);

        const columns = [
            {
                title: 'ID',
                dataIndex: 'ideriesgogironegocio',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.ideriesgogironegocio < b.ideriesgogironegocio) return -1;
                    if (a.ideriesgogironegocio > b.ideriesgogironegocio) return 1;
                    return 0;
                }
            }, {
                title: 'Giro de Negocio',
                dataIndex: 'gironegocio.nombre',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.gironegocio.nombre < b.gironegocio.nombre) return -1;
                    if (a.gironegocio.nombre > b.gironegocio.nombre) return 1;
                    return 0;
                }
            }, {
                title: 'Ocupación',
                dataIndex: 'ocupacion.ocupacion',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.ocupacion.ocupacion < b.ocupacion.ocupacion) return -1;
                    if (a.ocupacion.ocupacion > b.ocupacion.ocupacion) return 1;
                    return 0;
                }
            }, {
                title: 'Tipo de Giro',
                dataIndex: 'tipogironegocio.value1',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.tipogironegocio.value1 < b.tipogironegocio.value1) return -1;
                    if (a.tipogironegocio.value1 > b.tipogironegocio.value1) return 1;
                    return 0;
                }
            }, {
                title: 'Clasificación de Riesgo',
                dataIndex: 'riesgo.nombre',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.riesgo.nombre < b.riesgo.nombre) return -1;
                    if (a.riesgo.nombre > b.riesgo.nombre) return 1;
                    return 0;
                }
            }, {
                title: 'Estado',
                dataIndex: 'estasignacion.value1',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.estasignacion.value1 < b.estasignacion.value1) return -1;
                    if (a.estasignacion.value1 > b.estasignacion.value1) return 1;
                    return 0;
                }
            }, {
                title: 'Minería',
                width: 'auto',
                render: (row, record, text) => {
                    if (record.indminera === 0) {
                        return 'No'
                    } else {
                        return 'Si'
                    }
                },
                sorter: (a, b) => {
                    if (a.indminera < b.indminera) return -1;
                    if (a.indminera > b.indminera) return 1;
                    return 0;
                }
            }, {
                title: 'Acciones',
                width: 100,
                render: (text, record, index) => {
                    return (
                        <div className="icons-acciones">
                            {modificar < 0 ? '' : <IconWrapper
                                type="edit"
                                theme="filled"
                                className='edit'
                                onClick={() => this.handleEditClasRiesgo(record)}
                            />}
                            {eliminar < 0 ? '' : <IconWrapper
                                type="delete"
                                theme="filled"
                                className='delete'
                                onClick={() => this.handleDeleteClasRiesgo(record.ideriesgogironegocio)}
                            />}
                        </div>
                    )
                }
            }
        ]

        return (
            <div className="container">
                <PageTitle titulo={messages.clasriesgo.title} />
                {buscar < 0 ? '' : <SearchClasRiesgo
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    ACTIONOCUPACION={ACTIONOCUPACION}
                    girosnegocios={girosnegocios}
                    ocupaciones={ocupaciones}
                    minero={MINERO}
                    riesgos={riesgos}
                    tiposgironegocios={tiposgironegocios}
                    estadosgiro={estadosgiro}
                />}
                <div className="text-right">
                    {exportar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.exportFile}>
                        <i className="i-add" />
                        <span>Exportar</span>
                    </ButtonForm>}
                    {agregar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handleModal}>
                        <i className="i-add" />
                        <span>Añadir Asignación</span>
                    </ButtonForm>}
                </div>
                {
                    modalClasRiesgo ? <FormClasRiesgo
                        modal={modalClasRiesgo}
                        handleModalOff={this.handleModalOff}
                        dataEdit={clasRiegoEdit}
                        girosnegocios={girosnegocios}
                        ocupaciones={ocupaciones}
                        minero={MINERO}
                        riesgos={riesgos}
                        tiposgironegocios={tiposgironegocios}
                        estadosgiro={estadosgiro}
                        ACTIONOCUPACION={ACTIONOCUPACION}
                        STARTACTIONPOST={this.props.STARTACTIONPOST}
                        STARTACTIONPUT={this.props.STARTACTIONPUT}
                        messages={messages}
                    /> : ''
                }
                <Table
                    title={messages.clasriesgo.title}
                    rowKey='ideriesgogironegocio'
                    scroll={{ x: 'auto' }}
                    columns={columns}
                    dataSource={dataSource}
                    loading={clasriesgos.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    clasriesgos: state.clasriesgos,
    girosnegocios: state.common.girosnegocios,
    ocupaciones: state.common.ocupaciones,
    riesgos: state.common.riesgos,
    tiposgironegocios: state.common.tiposgironegocios,
    estadosgiro: state.common.estadosgiro,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONPOST: (data) => dispatch(STARTACTIONPOST(data)),
    STARTACTIONDELETE: (id) => dispatch(STARTACTIONDELETE(id)),
    STARTACTIONPUT: (id, data) => dispatch(STARTACTIONPUT(id, data)),
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
    ACTIONOCUPACION: (id) => dispatch(ACTIONOCUPACION(id)),
    exportClasRiesgo: () => dispatch(exportClasRiesgo())
})

export default connect(mapPropsState, mapPropsDispatch)(ClasRiesgo);