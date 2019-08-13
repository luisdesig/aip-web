import React from 'react';
import FormAsigZona from './FormAsigZona';
import SearchAsigZona from './SearchAsigZona';
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
    exportAsigZona
} from '../../../../redux/AsigZona/actions';
import { STARTACTIONZONASOCUPADAS } from '../../../../redux/Common/actions';

const index = 'Asignación de Zona por Clasificación de Riesgo';
const indexBuscar = "CONSULTAR ZONA POR CLASIFICACION DE RIESGO";
const indexRegistrar = "REGISTRAR ZONA POR CLASIFICACION DE RIESGO";
const indexModificar = "MODIFICAR ZONA POR CLASIFICACION DE RIESGO";
const indexEliminar = "ELIMINAR ZONA POR CLASIFICACION DE RIESGO";
const indexExportar = "EXPORTAR ZONA POR CLASIFICACION DE RIESGO";

class AsigZona extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAsigZona: false,
            modalDelete: false,
            asigZonaEdit: undefined,
            params: undefined,
            id: undefined,
            loading: false
        };
        this.handleModalOff = this.handleModalOff.bind(this);
        this.exportFile = this.exportFile.bind(this);
    }

    async componentDidMount() {
        await this.props.STARTACTIONZONASOCUPADAS();
        await this.props.STARTACTIONSEARCH({
            ideriesgozona: '',
            ideriesgo: '',
            idezona: '',
            idptipoinspectorasg: '',
            mtominimodeclarado: '',
            mtomaximodeclarado: ''
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.asigzonas.reload !== prevProps.asigzonas.reload) {
            this.updateData()
        }
    }

    async updateData() {
        await this.props.STARTACTIONSEARCH({
            ideriesgozona: '',
            ideriesgo: '',
            idezona: '',
            idptipoinspectorasg: '',
            mtominimodeclarado: '',
            mtomaximodeclarado: ''
        });
    }

    handleModal = () => {
        this.setState({ modalAsigZona: true })
    }

    handleModalOff = () => {
        this.setState({
            modalAsigZona: false,
            modalDelete: false,
            asigZonaEdit: undefined
        })
    }
    handleEditAsigZona = (e) => {
        this.setState({ asigZonaEdit: e, modalAsigZona: true, params: 'editar' })
    }

    handleDeleteAsigZona = (e) => {
        showDeleteConfirm(messages.asigzonas.title,
            messages.confirmationDelete,
            () => this.props.STARTACTIONDELETE(e));
    }
    async exportFile() {
        await this.props.exportAsigZona();
    };

    render() {
        const { modalAsigZona, asigZonaEdit } = this.state;
        const {
            asigzonas,
            zonas,
            zones,
            riesgos,
            estados,
            tiposinspectoresasg,
            STARTACTIONSEARCH,
            STARTACTIONPOST,
            STARTACTIONPUT,
            acciones
        } = this.props;
        const dataSource = asigzonas.asigzonas;

        let buscar = acciones.permisos.indexOf(indexBuscar);
        let agregar = acciones.permisos.indexOf(indexRegistrar);
        let modificar = acciones.permisos.indexOf(indexModificar);
        let eliminar = acciones.permisos.indexOf(indexEliminar);
        let exportar = acciones.permisos.indexOf(indexExportar);

        const columns = [
            {
                title: 'Id',
                dataIndex: 'ideriesgozona',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.ideriesgozona < b.ideriesgozona) return -1;
                    if (a.ideriesgozona > b.ideriesgozona) return 1;
                    return 0;
                }
            }, {
                title: 'Zona Geográfica',
                dataIndex: 'zona.nombre',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.zona.nombre < b.zona.nombre) return -1;
                    if (a.zona.nombre > b.zona.nombre) return 1;
                    return 0;
                }
            }, {
                title: 'Clasificación Riesgo',
                dataIndex: 'riesgo.nombre',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.riesgo.nombre < b.riesgo.nombre) return -1;
                    if (a.riesgo.nombre > b.riesgo.nombre) return 1;
                    return 0;
                }
            }, {
                title: 'Monto Mínimo',
                dataIndex: 'mtominimodeclarado',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.mtominimodeclarado < b.mtominimodeclarado) return -1;
                    if (a.mtominimodeclarado > b.mtominimodeclarado) return 1;
                    return 0;
                }
            }, {
                title: 'Monto Máximo',
                dataIndex: 'mtomaximodeclarado',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.mtomaximodeclarado < b.mtomaximodeclarado) return -1;
                    if (a.mtomaximodeclarado > b.mtomaximodeclarado) return 1;
                    return 0;
                }
            }, {
                title: 'Tipo Inspector',
                dataIndex: 'tipoinspectorasg.value1',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.tipoinspectorasg.value1 < b.tipoinspectorasg.value1) return -1;
                    if (a.tipoinspectorasg.value1 > b.tipoinspectorasg.value1) return 1;
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
                                onClick={() => this.handleEditAsigZona(record)}
                            />}
                            {eliminar < 0 ? '' : <IconWrapper
                                type="delete"
                                theme="filled"
                                className='delete'
                                onClick={() => this.handleDeleteAsigZona(record.ideriesgozona)}
                            />}
                        </div>
                    )
                }
            }
        ]

        return (
            <div className="container">
                <PageTitle titulo={messages.asigzonas.title} />
                {buscar < 0 ? '' : <SearchAsigZona
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    zonas={zonas}
                    riesgos={riesgos}
                    tiposinspectoresasg={tiposinspectoresasg}
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
                    modalAsigZona ? <FormAsigZona
                        modal={modalAsigZona}
                        handleModalOff={this.handleModalOff}
                        dataEdit={asigZonaEdit}
                        zonas={zonas}
                        zones={zones}
                        riesgos={riesgos}
                        messages={messages}
                        tiposinspectoresasg={tiposinspectoresasg}
                        estados={estados}
                        STARTACTIONPOST={STARTACTIONPOST}
                        STARTACTIONPUT={STARTACTIONPUT}
                    /> : ''
                }
                <Table
                    title={messages.asigzonas.title}
                    rowKey='ideriesgozona'
                    scroll={{ x: 'auto' }}
                    dataSource={dataSource}
                    columns={columns}
                    loading={asigzonas.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    asigzonas: state.asigzonas,
    riesgos: state.common.riesgos,
    zonas: state.common.zonasocupadas,
    zones: state.asigzonas.asigzonas,
    estados: state.common.estados,
    tiposinspectoresasg: state.common.tiposinspectoresasg,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONPOST: (data) => dispatch(STARTACTIONPOST(data)),
    STARTACTIONDELETE: (id) => dispatch(STARTACTIONDELETE(id)),
    STARTACTIONPUT: (id, data) => dispatch(STARTACTIONPUT(id, data)),
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
    exportAsigZona: () => dispatch(exportAsigZona()),
    STARTACTIONZONASOCUPADAS: () => dispatch(STARTACTIONZONASOCUPADAS())
})

export default connect(mapPropsState, mapPropsDispatch)(AsigZona);