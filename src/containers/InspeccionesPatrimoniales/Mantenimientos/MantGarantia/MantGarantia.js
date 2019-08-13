import React from 'react';
import FormMantGarantia from './FormMantGarantia';
import SearchMantGarantia from './SearchMantGarantia';
import Table from '../../../../components/Table/Table';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { connect } from 'react-redux'
import { messages } from '../../../../util/messages';
import PageTitle from '../../../../components/Page/TitlePage';
import {
    STARTACTIONPOST,
    STARTACTIONPUT,
    STARTACTIONDELETE,
    STARTACTIONSEARCH,
    STARTACTIONGARANTIAPRIORIDAD,
    ACTIONCLENGARANTIASREC
} from '../../../../redux/MantGarantia/actions';
import {
    ACTIONSUBGARANTIA,
    ACTIONCLEANSUBGARANTIA
} from '../../../../redux/Common/filters';

const index = 'Mantenimiento de Garantías y Recomendaciones';
const indexBuscar = "CONSULTAR GARANTIAS Y RECOMENDACIONES";
const indexRegistrar = "REGISTRAR GARANTIAS Y RECOMENDACIONES";
const indexModificar = "MODIFICAR GARANTIAS Y RECOMENDACIONES";
const indexEliminar = "ELIMINAR GARANTIAS Y RECOMENDACIONES";
const indexImportar = "IMPORTAR GARANTIAS Y RECOMENDACIONES";

class MantGarantia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMantGarantia: false,
            modalDelete: false,
            garantiaEdit: undefined,
            params: undefined,
            id: undefined
        }
        this.handleModalOff = this.handleModalOff.bind(this);
        this.handleDeleteGarantia = this.handleDeleteGarantia.bind(this);
    }

    async componentDidMount() {
        await this.props.STARTACTIONSEARCH({
            idegarantiarec: '',
            idegrupogarantia: '',
            idesubgrupogarantia: '',
            titulo: '',
            prioridad: ''
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.garantias.reload !== prevProps.garantias.reload) {
            this.updateData();
        }
    }
    async updateData() {
        await this.props.STARTACTIONSEARCH({
            idegarantiarec: '',
            idegrupogarantia: '',
            idesubgrupogarantia: '',
            titulo: '',
            prioridad: ''
        });
    }
    handleModal = () => {
        this.setState({ modalMantGarantia: true })
    }
    handleEditGarantia = (e, params) => {
        this.setState({ garantiaEdit: e, modalMantGarantia: true, params: params })
    }
    handleModalOff = () => {
        this.props.ACTIONCLENGARANTIASREC()
        this.props.ACTIONCLEANSUBGARANTIA()
        this.setState({
            modalMantGarantia: false,
            modalDelete: false,
            garantiaEdit: undefined
        })
    }

    handleDeleteGarantia = (e) => {
        showDeleteConfirm(messages.garantias.title,
            messages.confirmationDelete,
            () => this.props.STARTACTIONDELETE(e)
        );
    }

    render() {
        const { modalMantGarantia, garantiaEdit, params } = this.state;
        const {
            garantias,
            gruposgarantias,
            subgruposgarantias,
            ACTIONSUBGARANTIA,
            STARTACTIONSEARCH,
            STARTACTIONGARANTIAPRIORIDAD,
            ACTIONCLEANSUBGARANTIA,
            acciones
        } = this.props;

        let buscar = acciones.permisos.indexOf(indexBuscar);
        let agregar = acciones.permisos.indexOf(indexRegistrar);
        let modificar = acciones.permisos.indexOf(indexModificar);
        let eliminar = acciones.permisos.indexOf(indexEliminar);
        let importar = acciones.permisos.indexOf(indexImportar);

        const dataSource = garantias.garantias;
        const columns = [{
            title: 'ID',
            dataIndex: 'idegarantiarec',
            width: 'auto',
            sorter: (a, b) => {
                if (a.idegarantiarec < b.idegarantiarec) return -1;
                if (a.idegarantiarec > b.idegarantiarec) return 1;
                return 0;
            }
        }, {
            title: 'Grupo de Garantía',
            dataIndex: 'grupogarantia.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.grupogarantia.nombre < b.grupogarantia.nombre) return -1;
                if (a.grupogarantia.nombre > b.grupogarantia.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Sub-Grupo de Garantía',
            dataIndex: 'subgrupogarantia.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.subgrupogarantia.nombre < b.subgrupogarantia.nombre) return -1;
                if (a.subgrupogarantia.nombre > b.subgrupogarantia.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Título de la Garantía',
            dataIndex: 'titulo',
            width: 'auto',
            sorter: (a, b) => {
                if (a.titulo < b.titulo) return -1;
                if (a.titulo > b.titulo) return 1;
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
            title: 'Acciones',
            render: (text, record, index) => {
                return (
                    <div className="icons-acciones">
                        {modificar < 0 ? '' : <IconWrapper
                            type="edit"
                            theme="filled"
                            className='edit'
                            onClick={() => this.handleEditGarantia(record, 'editar')}
                        />}
                        {eliminar < 0 ? '' : <IconWrapper
                            type="delete"
                            theme="filled"
                            className='delete'
                            onClick={() => this.handleDeleteGarantia(record.idegarantiarec)}
                        />}
                    </div>
                )
            }
        }]

        return (
            <div className="container">
                <PageTitle titulo={messages.garantias.title} />
                {buscar < 0 ? '' : <SearchMantGarantia
                    handleSubmitGarantia={this.handleSubmitGarantia}
                    handleClearGarantia={this.handleClearGarantia}
                    gruposgarantias={gruposgarantias}
                    subgruposgarantias={subgruposgarantias}
                    ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    ACTIONCLEANSUBGARANTIA={ACTIONCLEANSUBGARANTIA}
                />}
                {agregar < 0 ? '' : <div className="text-right">
                    <ButtonForm className="btn_secondary" onClick={this.handleModal}>
                        <i className="i-add" />
                        <span>Añadir Garantía</span>
                    </ButtonForm>
                </div>}
                {
                    modalMantGarantia ? <FormMantGarantia
                        modal={modalMantGarantia}
                        handleModalOff={this.handleModalOff}
                        dataEdit={garantiaEdit}
                        params={params}
                        garantiaprioridad={garantias.garantiaprioridad}
                        gruposgarantias={gruposgarantias}
                        subgruposgarantias={subgruposgarantias}
                        ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
                        STARTACTIONGARANTIAPRIORIDAD={STARTACTIONGARANTIAPRIORIDAD}
                        STARTACTIONPOST={this.props.STARTACTIONPOST}
                        STARTACTIONPUT={this.props.STARTACTIONPUT}
                    /> : ''
                }
                <Table
                    title={messages.garantias.title}
                    rowKey='idegarantiarec'
                    scroll={{ x: 'auto' }}
                    columns={columns}
                    dataSource={dataSource}
                    loading={garantias.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    garantias: state.garantias,
    gruposgarantias: state.common.gruposgarantias,
    subgruposgarantias: state.common.subgruposgarantias,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONPOST: (data) => dispatch(STARTACTIONPOST(data)),
    STARTACTIONDELETE: (id) => dispatch(STARTACTIONDELETE(id)),
    STARTACTIONPUT: (id, data) => dispatch(STARTACTIONPUT(id, data)),
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
    ACTIONSUBGARANTIA: (id) => dispatch(ACTIONSUBGARANTIA(id)),
    STARTACTIONGARANTIAPRIORIDAD: (id) => dispatch(STARTACTIONGARANTIAPRIORIDAD(id)),
    ACTIONCLENGARANTIASREC: () => dispatch(ACTIONCLENGARANTIASREC()),
    ACTIONCLEANSUBGARANTIA: () => dispatch(ACTIONCLEANSUBGARANTIA())
})

export default connect(mapPropsState, mapPropsDispatch)(MantGarantia);
