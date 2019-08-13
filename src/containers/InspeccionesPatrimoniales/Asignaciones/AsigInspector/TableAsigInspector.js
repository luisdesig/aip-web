import React from 'react';
import { Table } from 'antd'
import EditableCell from '../../../../components/Table/editableCell';
import { success, error } from '../../../../components/Messages/Messages'
import { IconWrapper } from '../../../../components/Util/util.style';

class ListAsigInspector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editingKey: '',
            corredores: [],
            selectedRowKeys: [],
            prioridad: '',
            message: true,
            prioridades: []
        };
        this.onCellChange = this.onCellChange.bind(this)
        this.onFocus = this.onFocus.bind(this)
    }
    onFocus = () => {
        const { prioridades, asiginspectornextprioridad, maxprioridad, params } = this.props;
        if (params === 'editar' || params === 'grupal' || params === 'asignar') {
            success(`La prioridad máxima es: ${asiginspectornextprioridad - 1}.`);
        }
        if (params === undefined) {
            success(`La prioridad máxima es: ${maxprioridad - 1} .`);

        }
    }
    onCellChange = async (id, prioridad) => {
        const { asiginspectornextprioridad, params, prioridades } = this.props;
        if (params === 'grupal') {
            if (prioridad < asiginspectornextprioridad) {
                await this.props.ACTIONSELECTEDPRIORIDAD(id, prioridad)
            } else {
                //error('La prioridad no se encuentra en el rango.')
            }
        }
        if (params === 'asignar' && prioridad <= asiginspectornextprioridad) {
            await this.props.ACTIONSELECTEDPRIORIDAD(id, prioridad)
        }
        if (params === 'editar' && prioridad < asiginspectornextprioridad) {
            await this.props.ACTIONSELECTEDPRIORIDAD(id, prioridad)
        }
        if (params === undefined) {
            if (asiginspectornextprioridad <= prioridad && prioridad <= Math.max(...prioridades)) {
                if (prioridades.indexOf(prioridad) < 0) {
                    await this.props.ACTIONSELECTEDPRIORIDAD(id, prioridad)
                } else {
                    error('La prioridad ya se encuentra asignada.')
                }
            } else {
                // error('La prioridad no se encuentra en el rango.')
            }
        }
    }

    onSelect = async (record, selected, selectedRows) => {
        let prioridades = this.props.prioridades
        const { params } = this.props;
        console.log(params)
        const newRecord = record;
        if (selected === true) {
            newRecord.activo.idpactivo = 9
            //newRecord.prioridad = prioridades.length === 0 ? this.props.asiginspectornextprioridad : Math.max.apply(null, prioridades) + 1
            if (params !== 'grupal') {
                newRecord.prioridad = prioridades.length === 0 ? (newRecord.prioridad === "" ? this.props.asiginspectornextprioridad : newRecord.prioridad) : Math.max.apply(null, prioridades) + 1
            }
        } else {
            newRecord.activo.idpactivo = 10
        }
        if (params === 'grupal' || params === 'editar') {
            await this.props.ACTIONCHANGEESTADOINSPECTORGRUPAL(newRecord)
        } else {
            await this.props.ACTIONCHANGEESTADOINSPECTOR(newRecord)
        }
        this.props.onSelect(selectedRows)
    }
    render() {
        const { idezona, params } = this.props;
        const rowSelection = {
            onSelect: this.onSelect,
            getCheckboxProps: record => ({
                checked: record.activo.idpactivo === 10 || record.activo.idpactivo === '10' ? false : true,
                disabled: idezona === 'Seleccione' ? true : false
            })
        };
        const columns = [
            {
                title: 'DNI',
                dataIndex: 'dni',
                width: 'auto',
                sorter: (a, b) => {
                    if (a.dni < b.dni) return -1;
                    if (a.dni > b.dni) return 1;
                    return 0;
                }
            }, {
                title: 'Nombres',
                render: (row, record, text) => {
                    if (params === 'editar') {
                        return `${record.nombres}`
                    } else {
                        return `${record.nombres} ${record.apepaterno} ${record.apematerno}`
                    }
                },
                width: 'auto',
                sorter: (a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }
            }, {
                title: 'Prioridad',
                width: 'auto',
                render: (text, record, row) => {
                    return (<EditableCell
                        id={record.ideinspector}
                        idpactivo={record.activo.idpactivo}
                        prioridad={record.prioridad}
                        onCellChange={this.onCellChange}
                        onFocus={this.onFocus}
                        params={params}
                    />)
                },
                sorter: (a, b) => {
                    if (a.prioridad < b.prioridad) return -1;
                    if (a.prioridad > b.prioridad) return 1;
                    return 0;
                }
            }
        ]

        if (params === 'sinasignar') {
            columns.push({
                title: 'Acción',
                width: 'auto',
                render: (text, record, index) => {
                    return (
                        <div className="icons-acciones">
                            <IconWrapper
                                type="edit"
                                theme="filled"
                                className='edit'
                                onClick={() => this.props.handleEditAsigInspectorFree(record)}
                            />
                        </div>
                    )
                }
            })
        }

        return (
            <div>
                <Table
                    title={() => 'Pendientes'}
                    rowKey='ideinspector'
                    rowSelection={params === 'sinasignar' ? null : rowSelection}
                    columns={columns}
                    size='small'
                    dataSource={this.props.dataSource}
                />
            </div>
        )
    }
}

export default ListAsigInspector;
