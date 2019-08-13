import React from 'react';
import FormAsigInspector from './FormAsigInspector';
import SearchAsigInspector from './SearchAsigInspector';
import ListAsigInspector from './ListAsigInspector';
import Table from '../../../../components/Table/Table';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { messages } from '../../../../util/messages';
import PageTitle from '../../../../components/Page/TitlePage';
import { connect } from 'react-redux';
import {
    STARTACTIONGET,
    STARTACTIONPOST,
    STARTACTIONPUT,
    STARTACTIONPUTGRUPO,
    STARTACTIONDELETE,
    STARTACTIONSEARCH,
    STARTACTIONINSPECTOR,
    STARTACTIONINSPECTORFREE,
    STARTACTIONINSPECTORZONA,
    STARTACTIONINSPECTORNEXTPRIORIDAD,
    ACTIONSELECTEDPRIORIDAD,
    ACTIONCHANGEESTADOINSPECTOR,
    ACTIONASIGNARZONA,
    ACTIONVALIDARPRIORIDAD,
    ACTIONCLEANDATA,
    ACTIONCHANGEESTADOINSPECTORGRUPAL,
    STARTACTIONINSPECTORASIGNAR,
    exportAsigInspector
} from '../../../../redux/AsigInspector/actions';
import {
    STARTACTIONZONASOCUPADAS
} from '../../../../redux/Common/actions'

const index = 'Asignación de Inspector y Prioridad por Distribución de Zona';
const indexBuscar = "CONSULTAR INSPECTOR Y PRIORIDAD POR DISTRIBUCION DE ZONA";
const indexRegistrar = "REGISTRAR INSPECTOR Y PRIORIDAD POR DISTRIBUCION DE ZONA";
const indexModificar = "MODIFICAR INSPECTOR Y PRIORIDAD POR DISTRIBUCION DE ZONA";
const indexModificarGrupo = "MODIFICAR EN GRUPO";
const indexAsignar = "INSPECTORES SIN ZONAS";
const indexEliminar = "ELIMINAR INSPECTOR Y PRIORIDAD POR DISTRIBUCION DE ZONA";
const indexExportar = "EXPORTAR INSPECTOR Y PRIORIDAD POR DISTRIBUCION DE ZONA";

class AsigInspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAsigInspector: false,
            asigInspectorEdit: undefined,
            modalPendiente: false,
            params: undefined,
            id: undefined,
        };
        this.handleModalOff = this.handleModalOff.bind(this);
        this.handleEditAsigInspectorFree = this.handleEditAsigInspectorFree.bind(this);
        this.exportFile = this.exportFile.bind(this);
    }

    async componentDidMount() {
        await this.props.STARTACTIONZONASOCUPADAS()
        await this.props.STARTACTIONSEARCH({
            ideprioridadinspector: '',
            dni: '',
            idezona: '',
            nombres: '',
            idpactivo: '',
            prioridad: ''
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.asiginspectores.reload !== prevProps.asiginspectores.reload) {
            this.updateData()
        }
    }
    async updateData() {
        await this.props.STARTACTIONSEARCH({
            ideprioridadinspector: '',
            dni: '',
            idezona: '',
            nombres: '',
            idpactivo: '',
            prioridad: ''
        });
    }
    handleModal = () => {
        this.setState({ modalAsigInspector: true })
    }
    handelModalGrupo = () => {
        this.setState({ modalAsigInspector: true, params: 'grupal' })
    }
    handleModalPendiente = async () => {
        await this.props.STARTACTIONINSPECTORFREE();
        await this.props.STARTACTIONINSPECTOR();
        this.setState({ modalPendiente: true, params: 'sinasignar' })
    }
    handleModalOff = () => {
        this.setState({
            modalAsigInspector: false,
            modalDelete: false,
            modalPendiente: false,
            asigInspectorEdit: undefined,
            params: undefined,
            datasinasignar: []
        })
        this.props.ACTIONCLEANDATA();
    }
    handleEditAsigInspector = (e) => {
        this.setState({ asigInspectorEdit: e, modalAsigInspector: true, params: 'editar' })
    }

    handleDeleteAsigInspector = (e) => {
        showDeleteConfirm(messages.asiginspectores.title,
            messages.confirmationDelete,
            () => this.props.STARTACTIONDELETE(e));
    }

    handleEditAsigInspectorFree = (e) => {
        this.props.ACTIONASIGNARZONA([e])
        this.setState({ modalAsigInspector: true, params: 'asignar' })
    }
    async exportFile() {
        await this.props.exportAsigInspector();
    };

    render() {
        const {
            modalAsigInspector,
            modalPendiente,
            asigInspectorEdit,
            params
        } = this.state;
        const {
            asiginspectores,
            zonas,
            zonasocupadas,
            estados,
            asiginspectornextprioridad,
            STARTACTIONGET,
            STARTACTIONPOST,
            STARTACTIONPUT,
            STARTACTIONPUTGRUPO,
            STARTACTIONSEARCH,
            STARTACTIONINSPECTOR,
            STARTACTIONINSPECTORFREE,
            STARTACTIONINSPECTORZONA,
            STARTACTIONINSPECTORNEXTPRIORIDAD,
            ACTIONSELECTEDPRIORIDAD,
            ACTIONVALIDARPRIORIDAD,
            ACTIONCHANGEESTADOINSPECTOR,
            ACTIONCHANGEESTADOINSPECTORGRUPAL,
            STARTACTIONINSPECTORASIGNAR,
            acciones
        } = this.props;
        const dataSource = asiginspectores.asiginspectores;

        let buscar = acciones.permisos.indexOf(indexBuscar);
        let agregar = acciones.permisos.indexOf(indexRegistrar);
        let modificar = acciones.permisos.indexOf(indexModificar);
        let grupo = acciones.permisos.indexOf(indexModificarGrupo);
        let asignar = acciones.permisos.indexOf(indexAsignar);
        let eliminar = acciones.permisos.indexOf(indexEliminar);
        let exportar = acciones.permisos.indexOf(indexExportar);

        const columns = [
            {
                title: 'ID',
                dataIndex: 'ideprioridadinspector',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.ideprioridadinspector < b.ideprioridadinspector) return -1;
                    if (a.ideprioridadinspector > b.ideprioridadinspector) return 1;
                    return 0;
                }
            }, {
                title: 'Zona',
                dataIndex: 'zona.nombre',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.zona.nombre < b.zona.nombre) return -1;
                    if (a.zona.nombre > b.zona.nombre) return 1;
                    return 0;
                }
            }, {
                title: 'DNI del Inspector',
                dataIndex: 'inspector.dni',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.inspector.dni < b.inspector.dni) return -1;
                    if (a.inspector.dni > b.inspector.dni) return 1;
                    return 0;
                }
            }, {
                title: 'Nombres y Apellidos del Inspector',
                dataIndex: 'inspector.nombres',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.inspector.nombres < b.inspector.nombres) return -1;
                    if (a.inspector.nombres > b.inspector.nombres) return 1;
                    return 0;
                }
            }, {
                title: 'Prioridad',
                dataIndex: 'prioridad',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.prioridad < b.prioridad) return -1;
                    if (a.prioridad > b.prioridad) return 1;
                    return 0;
                }

            }, {
                title: 'Estado',
                dataIndex: 'activo.value1',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.activo.value1 < b.activo.value1) return -1;
                    if (a.activo.value1 > b.activo.value1) return 1;
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
                                onClick={() => this.handleEditAsigInspector(record)}
                            />}
                            {eliminar < 0 ? '' : <IconWrapper
                                type="delete"
                                theme="filled"
                                className='delete'
                                onClick={() => this.handleDeleteAsigInspector(record.ideprioridadinspector)}
                            />}
                        </div>
                    )
                }
            }
        ]
        return (
            <div className="container">
                <PageTitle titulo={messages.asiginspectores.title} />
                {buscar < 0 ? '' : <SearchAsigInspector
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    zonasocupadas={zonasocupadas}
                    estados={estados}
                />}
                <div className="text-right">
                    {exportar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.exportFile}>
                        <i className="i-add" />
                        <span>Exportar</span>
                    </ButtonForm>}
                    {grupo < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handelModalGrupo}>
                        <i className="i-add" />
                        <span>Actualizar en Grupo</span>
                    </ButtonForm>}
                    {asignar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handleModalPendiente}>
                        <i className="i-add" />
                        <span>Inspectores sin Zona</span>
                    </ButtonForm>}
                    {agregar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handleModal}>
                        <i className="i-add" />
                        <span>Añadir Asignación</span>
                    </ButtonForm>}
                </div>
                {
                    modalAsigInspector ? <FormAsigInspector
                        modal={modalAsigInspector}
                        handleModalOff={this.handleModalOff}
                        dataEdit={asigInspectorEdit}
                        messages={messages}
                        zonas={zonas}
                        zonasocupadas={zonasocupadas}
                        params={params}
                        asiginspectornextprioridad={asiginspectornextprioridad}
                        maxprioridad={asiginspectores.maxprioridad}
                        asiginspectores={asiginspectores}
                        STARTACTIONGET={STARTACTIONGET}
                        STARTACTIONPOST={STARTACTIONPOST}
                        STARTACTIONPUT={STARTACTIONPUT}
                        STARTACTIONPUTGRUPO={STARTACTIONPUTGRUPO}
                        STARTACTIONINSPECTOR={STARTACTIONINSPECTOR}
                        STARTACTIONINSPECTORNEXTPRIORIDAD={STARTACTIONINSPECTORNEXTPRIORIDAD}
                        ACTIONSELECTEDPRIORIDAD={ACTIONSELECTEDPRIORIDAD}
                        ACTIONCHANGEESTADOINSPECTOR={ACTIONCHANGEESTADOINSPECTOR}
                        ACTIONCHANGEESTADOINSPECTORGRUPAL={ACTIONCHANGEESTADOINSPECTORGRUPAL}
                        STARTACTIONINSPECTORZONA={STARTACTIONINSPECTORZONA}
                        ACTIONVALIDARPRIORIDAD={ACTIONVALIDARPRIORIDAD}
                        STARTACTIONINSPECTORASIGNAR={STARTACTIONINSPECTORASIGNAR}
                    /> : ''
                }
                {
                    modalPendiente ? <ListAsigInspector
                        modal={modalPendiente}
                        dataSource={asiginspectores.asiginspectoresfree}
                        params={params}
                        handleModalOff={this.handleModalOff}
                        handleEditAsigInspectorFree={this.handleEditAsigInspectorFree}
                    /> : ''
                }
                <Table
                    title={messages.asiginspectores.title}
                    rowKey='ideprioridadinspector'
                    scroll={{ x: 'auto' }}
                    columns={columns}
                    dataSource={dataSource}
                    loading={asiginspectores.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    asiginspectores: state.asiginspectores,
    asiginspectornextprioridad: state.asiginspectores.asiginspectornextprioridad,
    zonas: state.common.zonas,
    zonasocupadas: state.common.zonasocupadas,
    estados: state.common.estados,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONGET: (data) => dispatch(STARTACTIONGET(data)),
    STARTACTIONPOST: (data) => dispatch(STARTACTIONPOST(data)),
    STARTACTIONDELETE: (id) => dispatch(STARTACTIONDELETE(id)),
    STARTACTIONPUT: (data) => dispatch(STARTACTIONPUT(data)),
    STARTACTIONPUTGRUPO: (data) => dispatch(STARTACTIONPUTGRUPO(data)),
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
    STARTACTIONINSPECTOR: () => dispatch(STARTACTIONINSPECTOR()),
    STARTACTIONINSPECTORFREE: () => dispatch(STARTACTIONINSPECTORFREE()),
    STARTACTIONINSPECTORZONA: (data) => dispatch(STARTACTIONINSPECTORZONA(data)),
    STARTACTIONINSPECTORNEXTPRIORIDAD: (id) => dispatch(STARTACTIONINSPECTORNEXTPRIORIDAD(id)),
    ACTIONCHANGEESTADOINSPECTOR: (data) => dispatch(ACTIONCHANGEESTADOINSPECTOR(data)),
    ACTIONCHANGEESTADOINSPECTORGRUPAL: (data) => dispatch(ACTIONCHANGEESTADOINSPECTORGRUPAL(data)),
    ACTIONSELECTEDPRIORIDAD: (id, prioridad) => dispatch(ACTIONSELECTEDPRIORIDAD(id, prioridad)),
    ACTIONASIGNARZONA: (data) => dispatch(ACTIONASIGNARZONA(data)),
    ACTIONVALIDARPRIORIDAD: (prioridad) => dispatch(ACTIONVALIDARPRIORIDAD(prioridad)),
    ACTIONCLEANDATA: () => dispatch(ACTIONCLEANDATA()),
    exportAsigInspector: () => dispatch(exportAsigInspector()),
    STARTACTIONZONASOCUPADAS: () => dispatch(STARTACTIONZONASOCUPADAS()),
    STARTACTIONINSPECTORASIGNAR: () => dispatch(STARTACTIONINSPECTORASIGNAR())
})

export default connect(mapPropsState, mapPropsDispatch)(AsigInspector);
