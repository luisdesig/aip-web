import React from 'react';
import Table from '../Table/Table';
import { IconWrapper, ButtonForm } from '../Util/util.style';

const ListGarantias = (props) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'idegarantiarec',
            width: 'auto',
            sorter: (a, b) => {
                if (a.idegarantiarec < b.idegarantiarec) return -1;
                if (a.idegarantiarec > b.idegarantiarec) return 1;
                return 0;
            }
        }, {
            title: 'Grupo garantía',
            dataIndex: 'grupogarantia.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.garantia.nombre < b.garantia.nombre) return -1;
                if (a.garantia.nombre > b.garantia.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Sub-Grupo garantía',
            dataIndex: 'subgrupogarantia.nombre',
            width: 'auto',
            sorter: (a, b) => {
                if (a.subgarantia.nombre < b.subgarantia.nombre) return -1;
                if (a.subgarantia.nombre > b.subgarantia.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Garantías',
            dataIndex: 'titulo',
            width: 'auto',
            sorter: (a, b) => {
                if (a.pais.nombre < b.pais.nombre) return -1;
                if (a.pais.nombre > b.pais.nombre) return 1;
                return 0;
            }
        }, {
            title: 'Acciones',
            width: 0,
            render: (text, record, index) => {
                return (
                    <div className="icons-acciones">
                        <IconWrapper
                            type="delete"
                            theme="filled"
                            className='edit'
                            onClick={() => props.handleDeleteGarantia(record.idegarantiarec)}
                        />
                    </div>
                )
            }
        }
    ]
    return (
        <Table
            title='Garantías'
            rowKey='idegarantiarec'
            scroll={{x: 'auto'}}
            columns={columns}
            dataSource={props.dataSource}
            pageSize={3}
        />
    )
}

export default ListGarantias;