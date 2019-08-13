import React from 'react';
import { Table } from 'antd';
import { IconWrapper } from '../../../../components/Util/util.style';


class ListCorredor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            editingKey: '',
            corredores: []
        };
    }
    onSelect = (record, selected) => {
        const newRecord = record;
        if(selected === true){
            newRecord.activo.idpactivo = 9
        }else{
            newRecord.activo.idpactivo = 10
        }
        this.props.onSelect(record)
    }
    render() {
        const { params,ideingeniero } = this.props;
        const rowSelection = {
            onChange: this.onChange,
            onSelect: this.onSelect,
            getCheckboxProps: record => ({
                checked: record.activo.idpactivo === 10 ? false : true,
                disabled: ideingeniero === 'Seleccione' ? true : false
            })
        };

        const columns = [
            {
                title: 'ID',
                dataIndex: 'idecorredor',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.idecorredor < b.idecorredor) return -1;
                    if (a.idecorredor > b.idecorredor) return 1;
                    return 0;
                }
            }, {
                title: 'Número',
                dataIndex:'numdocbroker',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.numdocbroker < b.numdocbroker) return -1;
                    if (a.numdocbroker > b.numdocbroker) return 1;
                    return 0;
                }
            }, {
                title: 'Corredor',
                render: (text, record, row) => {
                        return `${record.nombroker} ${record.apepatbroker} ${record.apematbroker}`
                },
                onFilter: this.props.onFilter,
                width: 'auto',
                sorter: (a, b) => {
                    if (a.nombroker < b.nombroker) return -1;
                    if (a.nombroker > b.nombroker) return 1;
                    return 0;
                }
            }
        ]

        if(params === 'sinasignar'){
            columns.push({
                title: 'Acción',
                width: 'auto',
                render: (text, record, index) => {
                    return (
                        <div className="">
                            <IconWrapper
                                type="edit"
                                theme="filled"
                                className='edit'
                                onClick={() => this.props.handleEditAsigCorredorFree(record)}
                            />
                        </div>
                    )
                }
            })
        }

        return (
            <Table
                title={() => 'Pendientes'}
                rowKey='idecorredor'
                rowSelection={params === 'sinasignar' ? null : rowSelection}
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={3}
            />
        )
    }
}

export default ListCorredor;