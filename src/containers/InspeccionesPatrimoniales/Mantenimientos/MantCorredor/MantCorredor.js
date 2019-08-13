import React from 'react';
import SearchMantCorredor from './SearchMantCorredor';
import Table from '../../../../components/Table/Table';
import PageTitle from '../../../../components/Page/TitlePage';
import { connect } from 'react-redux'
import {
    STARTACTIONSEARCH
} from '../../../../redux/MantCorredor/actions';
import { messages } from '../../../../util/messages';

const index = 'Consulta de Corredores';
const indexBuscar = "CONSULTAR CORREDORES";
const indexRegistrar = "REGISTRAR CORREDORES";
const indexModificar = "MODIFICAR CORREDORES";
const indexEliminar = "ELIMINAR CORREDORES";

class MantCorredor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleModalOff = this.handleModalOff.bind(this);
    }

    async componentDidMount() {
        await this.props.STARTACTIONSEARCH({
            numdocbroker: "",
            numidbrokerref: "",
            nombres: "",
            idpactivo: ""
        });
    }

    handleModal = () => {
        this.setState({ modalMantCorredor: true })
    }

    handleModalOff = () => {
        this.setState({
            modalMantCorredor: false,
            modalDelete: false,
            CorredorEdit: undefined
        })
    }

    render() {
        const { corredores, estados, STARTACTIONSEARCH, acciones } = this.props;
        const dataSource = corredores.corredores;
        let buscar = acciones.permisos.indexOf(indexBuscar)
        const columns = [{
            title: 'ID',
            dataIndex: 'idecorredor',
            width: 'auto',
            sorter: (a, b) => {
                if (a.idecorredor < b.idecorredor) return -1;
                if (a.idecorredor > b.idecorredor) return 1;
                return 0;
            }
        }, {
            title: 'Código AcselX',
            dataIndex: 'numidbrokerref',
            width: 'auto',
            sorter: (a, b) => {
                if (a.numidbrokerref < b.numidbrokerref) return -1;
                if (a.numidbrokerref > b.numidbrokerref) return 1;
                return 0;
            }
        }, {
            title: 'Nro. Documento',
            dataIndex: 'numdocbroker',
            width: 'auto',
            sorter: (a, b) => {
                if (a.numdocbroker < b.numdocbroker) return -1;
                if (a.numdocbroker > b.numdocbroker) return 1;
                return 0;
            }
        }, {
            title: 'Nombres y Apellidos',
            width: 'auto',
            render: (row, record, text) => {
                return <p>{`${record.nombroker + ' ' + record.apepatbroker + ' ' + record.apematbroker}`}</p>
            },
            sorter: (a, b) => {
                if (a.nombroker < b.nombroker) return -1;
                if (a.nombroker > b.nombroker) return 1;
                return 0;
            }
        }, {
            title: 'Estado de Corredor',
            dataIndex: 'activo.value1',
            width: 'auto',
            sorter: (a, b) => {
                if (a.activo.value1 < b.activo.value1) return -1;
                if (a.activo.value1 > b.activo.value1) return 1;
                return 0;
            }
        }]

        return (
            <div className="container">
                <PageTitle titulo={messages.corredor.title} />
                {buscar < 0 ? '' : <SearchMantCorredor
                    STARTACTIONSEARCH={STARTACTIONSEARCH}
                    estados={estados}
                />}
                <Table
                    title='Mantenimiento de corredores'
                    rowKey='ideinspector'
                    columns={columns}
                    dataSource={dataSource}
                    loading={corredores.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    corredores: state.corredores,
    estados: state.common.estados,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data))
})

export default connect(mapPropsState, mapPropsDispatch)(MantCorredor);
