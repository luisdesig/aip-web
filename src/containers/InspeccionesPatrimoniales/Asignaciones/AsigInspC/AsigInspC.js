import React from 'react';
import FormAsigInspC from './FormAsigInspC';
import SearchAsigInspC from './SearchAsigInspC';
import ListAsigInspC from './ListAsigInspC';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { messages } from '../../../../util/messages';
import PageTitle from '../../../../components/Page/TitlePage';
import FileImport from '../../../../components/File/import';
import { connect } from 'react-redux';
import {
    STARTACTIONPOST,
    STARTACTIONPUT,
    STARTACTIONDELETE,
    STARTACTIONSEARCH,
    STARTACTIONCORREDORINSPECTOR,
    STARTACTIONCORREDORINSPECTORFREE,
    STARTACTIONGET,
    ACTIONCHANGEESTADOCORREDOR,
    ACTIONASIGNARCORREDOR,
    STARTACTIONPUTGRUPAL,
    CLEANDATA,
    exportAsigInspC,
    importAsigInspC
} from '../../../../redux/AsigInspC/actions';
import {
    SEARCHINGENIEROQA
} from '../../../../redux/Common/filters';
import Table from '../../../../components/Table/Table';

const index = 'Asignación de Inspectores a Corredores';
const indexBuscar = "CONSULTAR INSPECTORES A CORREDORES";
const indexRegistrar = "REGISTRAR INSPECTORES A CORREDORES";
const indexModificar = "MODIFICAR INSPECTORES A CORREDORES";
const indexModificarGrupo = "MODIFICAR EN GRUPO";
const indexAsignar = "CORREDORES SIN INGENIEROS";
const indexEliminar = "ELIMINAR INSPECTORES A CORREDORES";
const indexExportar = "EXPORTAR INSPECTORES A CORREDORES";
const indexImportar = "IMPORTAR INSPECTORES A CORREDORES";

class AsigInspC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAsigInspC: false,
            modalPendiente: false,
            asigInspCEdit: undefined,
            params: undefined,
            id: undefined,
            modalImportar: false,
        };
        this.handleModalOff = this.handleModalOff.bind(this);
        this.handleEditAsigCorredorFree = this.handleEditAsigCorredorFree.bind(this);
        this.exportFile = this.exportFile.bind(this);
    }

    async componentDidMount() {
        await this.props.STARTACTIONSEARCH({
            idecorredorinspector: "",
            numdocbroker: "",
            corredor: "",
            inspector: "",
            idpactivo: ""
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.asiginspectorescorredor.reload !== prevProps.asiginspectorescorredor.reload) {
            this.updateData()
        }
    }
    async updateData() {
        await this.props.STARTACTIONSEARCH({
            idecorredorinspector: "",
            numdocbroker: "",
            corredor: "",
            inspector: "",
            idpactivo: ""
        });
    }
    handleModal = () => {
        this.setState({ modalAsigInspC: true })
    }
    handleModalPendiente = async () => {
        await this.props.STARTACTIONCORREDORINSPECTORFREE()
        this.setState({ modalPendiente: true, params: 'sinasignar' })
    }
    handleModalImportar = () => {
        this.setState({ modalImportar: true })
    }
    handleModalOff = () => {
        this.setState({
            modalAsigInspC: false,
            modalPendiente: false,
            asigInspCEdit: undefined,
            modalImportar: false,
            params: undefined
        })
        this.props.CLEANDATA()
    }
    handleEditAsigInspC = (e) => {
        this.setState({ asigInspCEdit: e, modalAsigInspC: true, params: 'editar' })
    }
    handleModalGrupo = (params) => {
        this.setState({ modalAsigInspC: true, params: params })
    }
    handleDeleteAsigInspC = (e) => {
        showDeleteConfirm(messages.asiginspectorescorredor.title,
            messages.confirmationDelete,
            () => this.props.STARTACTIONDELETE(e));
    }
    handleEditAsigCorredorFree = (e) => {
        this.props.ACTIONASIGNARCORREDOR([e])
        this.setState({ modalAsigInspC: true, params: 'asignar' })
    }
    async exportFile() {
        await this.props.exportAsigInspC();
    };


    render() {
        const { modalAsigInspC, modalPendiente, asigInspCEdit, params, modalImportar } = this.state;
        const {
            asiginspectorescorredor,
            estados,
            ingenierosqas,
            STARTACTIONSEARCH,
            SEARCHINGENIEROQA,
            STARTACTIONCORREDORINSPECTOR,
            STARTACTIONCORREDORINSPECTORFREE,
            STARTACTIONGET,
            ACTIONCHANGEESTADOCORREDOR,
            STARTACTIONPUTGRUPAL,
            importAsigInspC,
            acciones
        } = this.props;
        const dataSource = asiginspectorescorredor.asiginspectorescorredor;

        let buscar = acciones.permisos.indexOf(indexBuscar);
        let agregar = acciones.permisos.indexOf(indexRegistrar);
        let modificar = acciones.permisos.indexOf(indexModificar);
        let grupo = acciones.permisos.indexOf(indexModificarGrupo);
        let asignar = acciones.permisos.indexOf(indexAsignar);
        let eliminar = acciones.permisos.indexOf(indexEliminar);
        let exportar = acciones.permisos.indexOf(indexExportar);
        let importar = acciones.permisos.indexOf(indexImportar);

        const columns = [
            {
                title: 'ID',
                dataIndex: 'idecorredorinspector',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.idecorredorinspector < b.idecorredorinspector) return -1;
                    if (a.idecorredorinspector > b.idecorredorinspector) return 1;
                    return 0;
                }
            }, {
                title: 'Inspector',
                render: (text, record, row) => {
                    return `${record.inspector.nombres} ${record.inspector.apepaterno} ${record.inspector.apematerno}`
                },
                width: 'auto',
                sorter: (a, b) => {
                    if (a.inspector.nombres < b.inspector.nombres) return -1;
                    if (a.inspector.nombres > b.inspector.nombres) return 1;
                    return 0;
                }
            }, {
                title: 'Número Corredor',
                dataIndex: 'corredor.numdocbroker',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.corredor.numdocbroker < b.corredor.numdocbroker) return -1;
                    if (a.corredor.numdocbroker > b.corredor.numdocbroker) return 1;
                    return 0;
                }
            }, {
                title: 'Nombres Corredor',
                render: (text, record, row) => {
                    return `${record.corredor.nombroker} ${record.corredor.apepatbroker} ${record.corredor.apematbroker}`
                },
                width: 'auto',
                sorter: (a, b) => {
                    if (a.corredor.nombroker < b.corredor.nombroker) return -1;
                    if (a.corredor.nombroker > b.corredor.nombroker) return 1;
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
                                onClick={() => this.handleEditAsigInspC(record, 'editar')}
                            />}
                            {eliminar < 0 ? '' : <IconWrapper
                                type="delete"
                                theme="filled"
                                className='delete'
                                onClick={() => this.handleDeleteAsigInspC(record.idecorredorinspector)}
                            />}
                        </div>
                    )
                }
            }
        ]
        return (
            <div className="container">
                <PageTitle titulo={messages.asiginspectorescorredor.title} />
                {buscar < 0 ? '' : <SearchAsigInspC
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    estados={estados}
                />}
                <div className="text-right">
                    {importar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handleModalImportar}>
                        <i className="i-add" />
                        <span>Importar</span>
                    </ButtonForm>}
                    {exportar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.exportFile}>
                        <i className="i-add" />
                        <span>Exportar</span>
                    </ButtonForm>}
                    {grupo < 0 ? '' : <ButtonForm className="btn_secondary" onClick={() => this.handleModalGrupo('grupal')}>
                        <i className="i-add" />
                        <span>Modificar en Grupo</span>
                    </ButtonForm>}
                    {asignar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handleModalPendiente}>
                        <i className="i-add" />
                        <span>Corredores sin Ingenieros</span>
                    </ButtonForm>}
                    {agregar < 0 ? '' : <ButtonForm className="btn_secondary" onClick={this.handleModal}>
                        <i className="i-add" />
                        <span>Añadir Asignación</span>
                    </ButtonForm>}
                </div>
                {
                    modalAsigInspC ? <FormAsigInspC
                        modal={modalAsigInspC}
                        handleModalOff={this.handleModalOff}
                        dataEdit={asigInspCEdit}
                        ingenierosqas={ingenierosqas}
                        messages={messages}
                        params={params}
                        estados={estados}
                        asiginspectorescorredor={asiginspectorescorredor}
                        STARTACTIONPOST={this.props.STARTACTIONPOST}
                        STARTACTIONPUT={this.props.STARTACTIONPUT}
                        SEARCHINGENIEROQA={SEARCHINGENIEROQA}
                        STARTACTIONCORREDORINSPECTOR={STARTACTIONCORREDORINSPECTOR}
                        STARTACTIONCORREDORINSPECTORFREE={STARTACTIONCORREDORINSPECTORFREE}
                        STARTACTIONGET={STARTACTIONGET}
                        ACTIONCHANGEESTADOCORREDOR={ACTIONCHANGEESTADOCORREDOR}
                        STARTACTIONPUTGRUPAL={STARTACTIONPUTGRUPAL}
                    /> : ''
                }
                {
                    modalPendiente ? <ListAsigInspC
                        modal={modalPendiente}
                        dataSource={asiginspectorescorredor.corredoresinspectorfree}
                        params={params}
                        handleModalOff={this.handleModalOff}
                        handleEditAsigCorredorFree={this.handleEditAsigCorredorFree}
                    /> : ''
                }
                {
                    modalImportar ? <FileImport
                        modal={modalImportar}
                        handleModalOff={this.handleModalOff}
                        import={importAsigInspC}
                        titulos={['Id del Inspector', 'Id del Corredor']}
                    /> : ''
                }
                <Table
                    title={messages.asiginspectorescorredor.title}
                    rowKey='idecorredorinspector'
                    scroll={{ x: 'auto' }}
                    columns={columns}
                    dataSource={dataSource}
                    loading={asiginspectorescorredor.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    asiginspectorescorredor: state.asiginspectorescorredor,
    estados: state.common.estados,
    ingenierosqas: state.common.ingenierosqas,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONGET: (data) => dispatch(STARTACTIONGET(data)),
    STARTACTIONPOST: (data) => dispatch(STARTACTIONPOST(data)),
    STARTACTIONDELETE: (id) => dispatch(STARTACTIONDELETE(id)),
    STARTACTIONPUT: (data) => dispatch(STARTACTIONPUT(data)),
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
    SEARCHINGENIEROQA: (text) => dispatch(SEARCHINGENIEROQA(text)),
    STARTACTIONCORREDORINSPECTOR: (data) => dispatch(STARTACTIONCORREDORINSPECTOR(data)),
    STARTACTIONCORREDORINSPECTORFREE: () => dispatch(STARTACTIONCORREDORINSPECTORFREE()),
    ACTIONCHANGEESTADOCORREDOR: (data) => dispatch(ACTIONCHANGEESTADOCORREDOR(data)),
    ACTIONASIGNARCORREDOR: (data) => dispatch(ACTIONASIGNARCORREDOR(data)),
    STARTACTIONPUTGRUPAL: (data) => dispatch(STARTACTIONPUTGRUPAL(data)),
    CLEANDATA: () => dispatch(CLEANDATA()),
    exportAsigInspC: () => dispatch(exportAsigInspC()),
    importAsigInspC: (data) => dispatch(importAsigInspC(data))
})

export default connect(mapPropsState, mapPropsDispatch)(AsigInspC);