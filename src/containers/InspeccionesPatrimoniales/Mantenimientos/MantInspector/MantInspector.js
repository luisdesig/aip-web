import React from 'react';
import SearchMantInspector from './SearchMantInspector';
import FormMantInspector from './FormMantInspector';
import Table from '../../../../components/Table/Table';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { connect } from 'react-redux';
import PageTitle from '../../../../components/Page/TitlePage';
import { messages } from '../../../../util/messages';
import {
    STARTACTIONPOST,
    STARTACTIONGET,
    STARTACTIONPUT,
    STARTACTIONDELETE,
    STARTACTIONSEARCH,
    STARTACTIONSEARCHSUPERVISOR,
    STARTACTIONSEARCHINGENIERO,
    STARTACTIONSEARCHEMPRESA,
    ACTIONCLEANINSPECTOR
} from '../../../../redux/MantInspector/actions';

const index = 'Mantenimiento de Inspectores';
const indexBuscar = "CONSULTAR INSPECTORES";
const indexRegistrar = "REGISTRAR INSPECTORES";
const indexModificar = "MODIFICAR INSPECTORES";
const indexEliminar = "ELIMINAR INSPECTORES";

class MantInspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMantInspector: false,
            modalDelete: false,
            inspectorEdit: undefined,
            params: undefined,
            id: undefined
        }
        this.handleModalOff = this.handleModalOff.bind(this);
        this.handleClearInspector = this.handleClearInspector.bind(this);
        this.handleSubmitInspector = this.handleSubmitInspector.bind(this);
        this.handleDeleteInspector = this.handleDeleteInspector.bind(this);
    }
    async componentDidMount() {
        await this.props.STARTACTIONSEARCH({
            dni: '',
            nombres: '',
            apellidos: '',
            ideriesgo: '',
            idptipoinspector: '',
            idpactivo: ''
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.inspectores.reload !== prevProps.inspectores.reload) {
            this.updateData();
        }
    }
    async updateData() {
        await this.props.STARTACTIONSEARCH({
            dni: '',
            nombres: '',
            apellidos: '',
            ideriesgo: '',
            idptipoinspector: '',
            idpactivo: ''
        });
    }
    handleModal = () => {
        this.setState({ modalMantInspector: true })
    }
    handleModalOff = () => {
        this.setState({ modalMantInspector: false, modalDelete: false, inspectorEdit: undefined })
        this.props.ACTIONCLEANINSPECTOR();
    }
    handleEditInspector = (e, params) => {
        this.setState({ inspectorEdit: e, modalMantInspector: true, params: params })
    }
    handleSubmitInspector = (data) => {
        this.props.STARTACTIONSEARCH(data)
    }
    handleClearInspector = () => {
        this.props.STARTACTIONGET();
    }
    handleDeleteInspector = (e) => {
        showDeleteConfirm(messages.inspector.title,
            messages.confirmationDelete,
            () => this.props.STARTACTIONDELETE({ ideingeniero: e })
        );
    }
    render() {
        const { modalMantInspector, modalDelete, inspectorEdit, params } = this.state;
        const {
            STARTACTIONSEARCH,
            STARTACTIONPOST,
            STARTACTIONPUT,
            STARTACTIONSEARCHEMPRESA,
            STARTACTIONSEARCHINGENIERO,
            STARTACTIONSEARCHSUPERVISOR,
            ACTIONCLEANINSPECTOR,
            common,
            inspectores,
            acciones
        } = this.props;
        const dataSource = this.props.inspectores.inspectores;

        let buscar = acciones.permisos.indexOf(indexBuscar);
        let agregar = acciones.permisos.indexOf(indexRegistrar);
        let modificar = acciones.permisos.indexOf(indexModificar);
        let eliminar = acciones.permisos.indexOf(indexEliminar);

        const columns = [{
            title: 'ID',
            dataIndex: 'ideingeniero',
            width: 'auto',
            sorter: (a, b) => {
                if (a.ideingeniero < b.ideingeniero) return -1;
                if (a.ideingeniero > b.ideingeniero) return 1;
                return 0;
            }
        }, {
            title: 'DNI',
            dataIndex: 'dni',
            width: 'auto',
            sorter: (a, b) => {
                if (a.dni < b.dni) return -1;
                if (a.dni > b.dni) return 1;
                return 0;
            }
        }, {
            title: 'Nombre y Apellidos',
            key: 'nombres',
            width: 'auto',
            render: (text, record, index) => {
                return (
                    <div style={{ width: 200 }}>{record.nombres} {record.apepaterno} {record.apematerno}</div>
                )
            },
            sorter: (a, b) => {
                if (a.nombres < b.nombres) return -1;
                if (a.nombres > b.nombres) return 1;
                return 0;
            }
        }, {
            title: 'Teléfono',
            dataIndex: 'telefono',
            width: 'auto',
            sorter: (a, b) => {
                if (a.telefono < b.telefono) return -1;
                if (a.telefono > b.telefono) return 1;
                return 0;
            }
        }, {
            title: 'Móvil',
            dataIndex: 'celular',
            width: 'auto',
            sorter: (a, b) => {
                if (a.celular < b.celular) return -1;
                if (a.celular > b.celular) return 1;
                return 0;
            }
        }, {
            title: 'Correo',
            dataIndex: 'email',
            width: 'auto',
            sorter: (a, b) => {
                if (a.email < b.email) return -1;
                if (a.email > b.email) return 1;
                return 0;
            }
        }, {
            title: 'Tipo de Inspector',
            width: 'auto',
            dataIndex: 'tipoinspector.value1',
            sorter: (a, b) => {
                if (a.tipoinspector.value1 < b.tipoinspector.value1) return -1;
                if (a.tipoinspector.value1 > b.tipoinspector.value1) return 1;
                return 0;
            }
        }, {
            title: 'Supervisor',
            width: 'auto',
            dataIndex: 'supervisor.nombres',
            sorter: (a, b) => {
                if (a.supervisor.nombre < b.supervisor.nombre) return -1;
                if (a.supervisor.nombre > b.supervisor.nombre) return 1;
                return 0;
            },
            render: (text, record, index) => {
                return (
                    <div style={{ width: 200 }}>{record.supervisor.nombres} {record.supervisor.apepaterno} {record.supervisor.apematerno}</div>
                )
            },
        }, {
            title: 'Correo Supervisor',
            width: 'auto',
            dataIndex: 'supervisor.email',
            sorter: (a, b) => {
                if (a.supervisor.email < b.supervisor.email) return -1;
                if (a.supervisor.email > b.supervisor.email) return 1;
                return 0;
            }
        }, {
            title: 'Telf. Supervisor',
            width: 'auto',
            dataIndex: 'supervisor.telefono',
            sorter: (a, b) => {
                if (a.supervisor.telefono < b.supervisor.telefono) return -1;
                if (a.supervisor.telefono > b.supervisor.telefono) return 1;
                return 0;
            }
        }, {
            title: 'Lugar de Trabajo',
            width: 'auto',
            dataIndex: 'supervisor.lugartrabajo',
            sorter: (a, b) => {
                if (a.supervisorEmp.lugartrabajo < b.supervisorEmp.lugartrabajo) return -1;
                if (a.supervisorEmp.lugartrabajo > b.supervisorEmp.lugartrabajo) return 1;
                return 0;
            }
        }, {
            title: 'Supervisor Empresa',
            width: 'auto',
            dataIndex: 'supervisorEmp.nombres',
            sorter: (a, b) => {
                if (a.supervisorEmp.nombres < b.supervisorEmp.nombres) return -1;
                if (a.supervisorEmp.nombres > b.supervisorEmp.nombres) return 1;
                return 0;
            }
        }, {
            title: 'Referencia Externa',
            width: 'auto',
            dataIndex: 'supervisorEmp.rfrexterna',
            sorter: (a, b) => {
                if (a.supervisorEmp.rfrexterna < b.supervisorEmp.rfrexterna) return -1;
                if (a.supervisorEmp.rfrexterna > b.supervisorEmp.rfrexterna) return 1;
                return 0;
            }
        }, {
            title: 'Lugar de Trabajo',
            width: 'auto',
            dataIndex: 'supervisorEmp.lugartrabajo',
            sorter: (a, b) => {
                if (a.supervisorEmp.lugartrabajo < b.supervisorEmp.lugartrabajo) return -1;
                if (a.supervisorEmp.lugartrabajo > b.supervisorEmp.lugartrabajo) return 1;
                return 0;
            }
        }, {
            title: 'Correo Supervisor Empresa',
            width: 'auto',
            dataIndex: 'supervisorEmp.email',
            sorter: (a, b) => {
                if (a.supervisorEmp.email < b.supervisorEmp.email) return -1;
                if (a.supervisorEmp.email > b.supervisorEmp.email) return 1;
                return 0;
            }
        }, {
            title: 'Clasificación de Riesgo',
            width: 'auto',
            dataIndex: 'riesgos.nombre',
            sorter: (a, b) => {
                if (a.riesgos.nombre < b.riesgos.nombre) return -1;
                if (a.riesgos.nombre > b.riesgos.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Estado',
            width: 'auto',
            dataIndex: 'activo.value1',
            sorter: (a, b) => {
                if (a.activo.value1 < b.activo.value1) return -1;
                if (a.activo.value1 > b.activo.value1) return 1;
                return 0;
            }
        }, {
            title: 'Sede',
            width: 'auto',
            dataIndex: 'sede.value1',
            sorter: (a, b) => {
                if (a.sede.value1 < b.sede.value1) return -1;
                if (a.sede.value1 > b.sede.value1) return 1;
                return 0;
            }
        }, {
            title: 'Acciones',
            width: 140,
            render: (text, record, index) => {
                return (
                    <div className="icons-acciones">
                        {modificar < 0 ? '' : <IconWrapper
                            type="edit"
                            theme="filled"
                            className='edit'
                            onClick={() => this.handleEditInspector(record, 'editar')}
                        />}
                        {eliminar < 0 ? '' : <IconWrapper
                            type="delete"
                            theme="filled"
                            className='delete'
                            onClick={() => this.handleDeleteInspector(record.ideingeniero)}
                        />}
                    </div>
                )
            }
        }]
        return (
            <div className="container">
                <PageTitle titulo={messages.inspector.title} />
                {buscar < 0 ? '' : <SearchMantInspector
                    handleSubmitInspector={this.handleSubmitInspector}
                    handleClearInspector={this.handleClearInspector}
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    common={common}
                />}
                {agregar < 0 ? '' : <div className="text-right">
                    <ButtonForm className="btn_secondary" onClick={this.handleModal}>
                        <i className="i-add" />
                        <span>Añadir Inspector</span>
                    </ButtonForm>
                </div>}
                {
                    modalMantInspector ? <FormMantInspector
                        modal={modalMantInspector}
                        handleModalOff={this.handleModalOff}
                        dataEdit={inspectorEdit}
                        params={params}
                        common={common}
                        inspectores={inspectores}
                        STARTACTIONPOST={STARTACTIONPOST}
                        STARTACTIONPUT={STARTACTIONPUT}
                        STARTACTIONSEARCHEMPRESA={STARTACTIONSEARCHEMPRESA}
                        STARTACTIONSEARCHINGENIERO={STARTACTIONSEARCHINGENIERO}
                        STARTACTIONSEARCHSUPERVISOR={STARTACTIONSEARCHSUPERVISOR}
                        ACTIONCLEANINSPECTOR={ACTIONCLEANINSPECTOR}
                    /> : ''
                }
                <Table
                    title={messages.inspector.title}
                    rowKey='ideingeniero'
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: 1600 }}
                    loading={false}
                    pageSize={10}
                    loading={inspectores.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    inspectores: state.inspectores,
    common: state.common,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONPOST: (data) => dispatch(STARTACTIONPOST(data)),
    STARTACTIONGET: () => dispatch(STARTACTIONGET()),
    STARTACTIONDELETE: (data) => dispatch(STARTACTIONDELETE(data)),
    STARTACTIONPUT: (data) => dispatch(STARTACTIONPUT(data)),
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
    STARTACTIONSEARCHINGENIERO: (data) => dispatch(STARTACTIONSEARCHINGENIERO(data)),
    STARTACTIONSEARCHEMPRESA: (data) => dispatch(STARTACTIONSEARCHEMPRESA(data)),
    ACTIONCLEANINSPECTOR: (data) => dispatch(ACTIONCLEANINSPECTOR(data)),
    STARTACTIONSEARCHSUPERVISOR: (data) => dispatch(STARTACTIONSEARCHSUPERVISOR(data))
})

export default connect(mapPropsState, mapPropsDispatch)(MantInspector);