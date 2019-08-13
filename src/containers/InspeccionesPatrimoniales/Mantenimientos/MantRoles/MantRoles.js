import React from 'react';
import SearchMantRoles from './SearchMantRoles';
import Table from '../../../../components/Table/Table';
import PageTitle from '../../../../components/Page/TitlePage';
import { connect } from 'react-redux'
import {
    STARTSEARCHROLES
} from '../../../../redux/MantRoles/actions';
import { messages } from '../../../../util/messages';

const index = 'Consulta de Roles - Usuario';
const indexBuscar = "CONSULTAR ROLES - USUARIO";
const indexRegistrar = "REGISTRAR ROLES - USUARIO";
const indexModificar = "MODIFICAR ROLES - USUARIO";
const indexEliminar = "ELIMINAR ROLES - USUARIO";

class MantRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.STARTSEARCHROLES({
            usuario: "",
            nombres: "",
            idpactivo: ""
        });
    }
    render() {
        const { STARTSEARCHROLES, roles, estadousuario, acciones } = this.props;
        let dataSource = roles.usuariosroles;
        let buscar = acciones.permisos.indexOf(indexBuscar);
        const columns = [{
            title: 'Usuario',
            dataIndex: 'usuario',
            width: 'auto',
            sorter: (a, b) => {
                if (a.usuario < b.usuario) return -1;
                if (a.usuario > b.usuario) return 1;
                return 0;
            }
        }, {
            title: 'Nombres',
            render: (text, record, row) => {
                return `${record.nombre} ${record.apepat} ${record.apemat}`
            },
            width: 'auto',
            sorter: (a, b) => {
                console.log(a, b)
                if (a.nombre < b.nombre) return -1;
                if (a.nombre > b.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Rol',
            dataIndex: 'rol',
            width: 'auto',
            sorter: (a, b) => {
                if (a.rol < b.rol) return -1;
                if (a.rol > b.rol) return 1;
                return 0;
            }
        }, {
            title: 'Estado',
            dataIndex: 'activo',
            width: 'auto',
            sorter: (a, b) => {
                if (a.activo < b.activo) return -1;
                if (a.activo > b.activo) return 1;
                return 0;
            }
        }]

        return (
            <div className="container">
                <PageTitle titulo={messages.roles.title} />
                {buscar < 0 ? '' : <SearchMantRoles
                    STARTSEARCHROLES={STARTSEARCHROLES}
                    estadousuario={estadousuario}
                />}
                <Table
                    title={messages.roles.title}
                    rowKey='idrol'
                    columns={columns}
                    dataSource={dataSource}
                    loading={roles.loading}
                />
            </div>
        )
    }
}

const mapPropsState = (state) => ({
    roles: state.roles,
    estadousuario: state.common.estadousuario,
    acciones: state.auth.acciones.find(res => res.nombre === index)
})

const mapPropsDispatch = (dispatch) => ({
    STARTSEARCHROLES: (data) => dispatch(STARTSEARCHROLES(data))
})

export default connect(mapPropsState, mapPropsDispatch)(MantRoles);
