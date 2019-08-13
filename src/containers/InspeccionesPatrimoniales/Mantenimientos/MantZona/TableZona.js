import React from 'react';
import Table from '../../../../components/Table/Table';
import { IconWrapper } from '../../../../components/Util/util.style';

const ListZona = (props) => {
    const columns = [
        {
            title: 'ID Zona',
            dataIndex: 'ideubigeozona',
            width: 'auto',
            sorter: (a, b) => {
                if (a.ideubigeozona < b.ideubigeozona) return -1;
                if (a.ideubigeozona > b.ideubigeozona) return 1;
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
            title: 'País',
            dataIndex: 'pais.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.pais.nombre < b.pais.nombre) return -1;
                if (a.pais.nombre > b.pais.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Departamento',
            dataIndex: 'departamento.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.departamento.nombreubigeo < b.departamento.nombreubigeo) return -1;
                if (a.departamento.nombreubigeo > b.departamento.nombreubigeo) return 1;
                return 0;
            }
        }, {
            title: 'Provincia',
            dataIndex: 'provincia.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.provincia.nombreubigeo < b.provincia.nombreubigeo) return -1;
                if (a.provincia.nombreubigeo > b.provincia.nombreubigeo) return 1;
                return 0;
            }
        }, {
            title: 'Distrito',
            dataIndex: 'distrito.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.distrito.nombreubigeo < b.distrito.nombreubigeo) return -1;
                if (a.distrito.nombreubigeo > b.distrito.nombreubigeo) return 1;
                return 0;
            }
        }, {
            title: 'Acciones',
            render: (text, record, index) => {
                if (props.params) {
                    if (props.params === 'editar' || props.params === 'asignarzona') {
                        return 'Sin acciones'
                    } else {
                        return (<IconWrapper
                            type="edit"
                            theme="filled"
                            className='edit'
                            onClick={() => props.handleAsignarZona(record,'asignarzona')}
                        />)
                    }

                } else {
                    return (<IconWrapper
                        type="delete"
                        theme="filled"
                        className='delete'
                        onClick={() => props.ACTIONDELETECURRENTZONA(record.ideubigeozona)}
                    />)
                }
            }
        }
    ]
    return (
        <Table
            title='Pendientes'
            rowKey='ideubigeo'
            columns={columns}
            dataSource={props.dataSource}
            loading={props.dataSource.length === 0 && props.params === 'sinasignar' ? true : false}
        />
    )
}

export default ListZona;