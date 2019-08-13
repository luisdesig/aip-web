import React from 'react';
import Table from '../../../../components/Table/Table';
import { IconWrapper } from '../../../../components/Util/util.style';

function checked(record){
    const valordeclarado = record.valordeclarado;
    const riesgo = record.zona.idezona;
    if(valordeclarado <= 100000){
        return true
    }else if(valordeclarado <= 250000 && riesgo === 3){
        return true
    
    }else if(valordeclarado <= 1000000 && (riesgo === 1 || riesgo === 2)){
        return true
    }else{
        return false
    }
    
}

const ListInmuebles = (props) => {
    const rowSelection = {
        onChange: props.onChange,
        onSelect: props.onSelect,
        getCheckboxProps: record => ({
            disabled: checked(record)
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
            dataIndex: 'Distrito.nombre',
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
            dataIndex: 'Responsable.nombre',
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
            rowSelection={rowSelection}
            columns={columns}
            dataSource={props.dataSource}
        />
    )
}

export default ListInmuebles;