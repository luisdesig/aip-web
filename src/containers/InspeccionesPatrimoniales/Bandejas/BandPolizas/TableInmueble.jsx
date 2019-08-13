import React from 'react';
import Table from '../../../../components/Table/Table';

const ListInmuebles = (props) => {
    const rowSelection = {
        onChange: props.onChange,
        onSelect: props.onSelect,
        getCheckboxProps: record => ({
            disabled: record.disabled,
            checked: record.checked
        })
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ideinmueblepoliza',
            width: 'auto',
            sorter: (a, b) => {
                if (a.ideubigeozona < b.ideubigeozona) return -1;
                if (a.ideubigeozona > b.ideubigeozona) return 1;
                return 0;
            }
        }, {
            title: 'Dirección',
            dataIndex: 'direccion',
            width: 500,
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
            title: 'Valor Inmueble',
            dataIndex: 'valordeclarado',
            width: 'auto',
            sorter: (a, b) => {
                if (a.distrito.nombreubigeo < b.distrito.nombreubigeo) return -1;
                if (a.distrito.nombreubigeo > b.distrito.nombreubigeo) return 1;
                return 0;
            }
        }, {
            title: 'Estado',
            dataIndex: 'estado.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.distrito.nombreubigeo < b.distrito.nombreubigeo) return -1;
                if (a.distrito.nombreubigeo > b.distrito.nombreubigeo) return 1;
                return 0;
            }
        }, {
            title: 'Responsable',
            dataIndex: 'ingeniero',
            width: 'auto',
            sorter: (a, b) => {
                if (a.distrito.nombreubigeo < b.distrito.nombreubigeo) return -1;
                if (a.distrito.nombreubigeo > b.distrito.nombreubigeo) return 1;
                return 0;
            }
        }
    ]
    return (
        <Table
            title='Inmuebles'
            rowKey='ideinmueblepoliza'
            scroll={{x: 'auto'}}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={props.dataSource}
            pageSize={3}
        />
    )
}

export default ListInmuebles;