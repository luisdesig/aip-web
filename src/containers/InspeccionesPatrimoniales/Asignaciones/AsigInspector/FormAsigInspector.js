import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import TableAsigInspector from './TableAsigInspector';
import { showConfirm } from '../../../../components/Modal/Utils';
import { error } from '../../../../components/Messages/Messages';
import PagePanel from '../../../../components/Page/PanelPage';
import {
    FieldContainer,
    RowForm,
    ColForm,
    Field,
    ColFormLabel,
    SelectForm,
    InputForm,
} from '../../../../components/Util/util.style';
import { messages } from '../../../../util/messages';

const Option = SelectForm.Option;
const Search = InputForm.Search;

class FormAsigInspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idezona: props.dataEdit ? props.dataEdit.zona.idezona : 'Seleccione',
            codigozona: '',
            inspectores: [],
            indexes: [],
            selectedRows: [],
            text: '',
            searchData: [],
            status: false,
        };
        this.onSelect = this.onSelect.bind(this);
    }
    async componentDidMount() {
        if (this.props.params === 'editar') {
            await this.props.STARTACTIONGET({
                ideprioridadinspector: this.props.dataEdit.ideprioridadinspector,
            });
            await this.props.STARTACTIONINSPECTORNEXTPRIORIDAD(this.props.dataEdit.zona.idezona);
        } else if (this.props.params === undefined) {
            await this.props.STARTACTIONINSPECTOR();
        } else {
        }
    }
    changeZona = async e => {
        await this.props.STARTACTIONINSPECTORNEXTPRIORIDAD(e);
        if (this.props.params === 'grupal') {
            await this.props.STARTACTIONINSPECTORZONA({ idezona: e });
        }
        if (this.props.params === undefined) {
            await this.props.STARTACTIONINSPECTOR();
        }
        if (this.props.params === 'asignar') {
            await this.props.STARTACTIONINSPECTORASIGNAR();
        }
        this.setState({ idezona: e });
    };

    onSelect = selectedRows => {
        this.setState({ selectedRows });
    };

    onSearch = e => {
        const text = e.target.value;
        const newData = this.props.asiginspectores.inspectores.filter(res => {
            var nombres = `${res.nombres} ${res.apepaterno} ${res.apematerno}`;
            return nombres.toLowerCase().indexOf(text.toLowerCase()) >= 0;
        });
        if (e === '') {
            this.setState({ status: false });
        } else {
            this.setState({ searchData: newData, status: true });
        }
    };

    onSubmit = async () => {
        const {
            dataEdit,
            params,
            messages,
            STARTACTIONPUT,
            STARTACTIONPUTGRUPO,
            STARTACTIONPOST,
            handleModalOff,
            asiginspectores,
        } = this.props;
        let newData;
        let data = {
            idezona: this.state.idezona,
        };
        if (params === 'editar') {
            newData = asiginspectores.inspectores[0];
            data.ideprioridadinspector = dataEdit.ideprioridadinspector;
            data.prioridad = newData.prioridad;
            data.activo = newData.activo;
        } else if (params === 'grupal') {
            newData = asiginspectores.inspectores;
            data.inspectores = newData;
        } else {
            newData = asiginspectores.inspectores.filter(res => res.activo.idpactivo === 9);
            data.inspectores = newData;
        }
        if (data.idezona !== 'Seleccione') {
            if (params === undefined || params === 'asignar') {
                console.log(data)
                if (data.inspectores.length !== 0) {
                    showConfirm(
                        messages.asiginspectores.title,
                        messages.confirmationInsert,
                        () => STARTACTIONPOST(data),
                        () => handleModalOff(),
                    );
                } else {
                    error(messages.asiginspectores.validationinspector);
                }
            } else if (params === 'editar') {
                showConfirm(
                    messages.asiginspectores.title,
                    messages.confirmationUpdate,
                    () => STARTACTIONPUT(data),
                    () => handleModalOff(),
                );
            } else {
                let status = true;
                data.inspectores.forEach(element => {
                    let contarprioridades = data.inspectores.filter(res => res.prioridad === element.prioridad)
                    if (contarprioridades.length > 1) {
                        status = false
                    }
                });

                if (data.inspectores.length !== 0) {
                    if (status) {
                        showConfirm(
                            messages.asiginspectores.title,
                            messages.confirmationUpdate,
                            () => STARTACTIONPUTGRUPO(data),
                            () => handleModalOff(),
                        );
                    }
                    else {
                        error(messages.asiginspectores.validationprioridades);
                    }
                } else {
                    error(messages.asiginspectores.validationinspectorgrupo);
                }
            }
        } else {
            error(messages.asiginspectores.validacion);
        }
    };
    render() {
        let dataSource;
        const { idezona, searchData, status } = this.state;
        const {
            modal,
            dataEdit,
            zonas,
            zonasocupadas,
            params,
            handleModalOff,
            asiginspectores,
            ACTIONSELECTEDPRIORIDAD,
            ACTIONCHANGEESTADOINSPECTOR,
            ACTIONCHANGEESTADOINSPECTORGRUPAL,
            ACTIONVALIDARPRIORIDAD
        } = this.props;
        if (status) {
            dataSource = searchData
        } else {
            dataSource = asiginspectores.inspectores;
        }
        const formAsigInspector = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={{ span: 8, offset: 8 }}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Zona:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeZona}
                                    value={idezona}
                                    disabled={params === 'editar' ? true : false}
                                >
                                    {
                                        zonasocupadas.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idezona}>
                                                    {item.nombre}
                                                </Option>
                                            )
                                        })
                                    }
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        )

        const asigInspector = (
            <div>
                <PagePanel titulo='Datos de la zona' children={formAsigInspector} />
                <FieldContainer>
                    {params === 'editar' ? '' : <RowForm gutter={16}>
                        <ColForm sm={24} lg={24}>
                            <Field>
                                <Search
                                    placeholder="Buscar inspector"
                                    onChange={this.onSearch}
                                    style={{ width: 200 }}
                                />
                            </Field>
                        </ColForm>
                    </RowForm>}
                    <RowForm gutter={16}>
                        <ColForm lg={24}>
                            <TableAsigInspector
                                title='Datos del inspector'
                                dataSource={dataSource}
                                onInspectores={this.onInspectores}
                                idezona={idezona}
                                onSelect={this.onSelect}
                                params={params}
                                asiginspectornextprioridad={asiginspectores.asiginspectornextprioridad}
                                maxprioridad={asiginspectores.maxprioridad}
                                prioridades={asiginspectores.prioridades}
                                ACTIONSELECTEDPRIORIDAD={ACTIONSELECTEDPRIORIDAD}
                                ACTIONCHANGEESTADOINSPECTOR={ACTIONCHANGEESTADOINSPECTOR}
                                ACTIONVALIDARPRIORIDAD={ACTIONVALIDARPRIORIDAD}
                                ACTIONCHANGEESTADOINSPECTORGRUPAL={ACTIONCHANGEESTADOINSPECTORGRUPAL}
                            />
                        </ColForm>
                    </RowForm>
                </FieldContainer>
            </div>
        )

        return (
            <Modal
                title={dataEdit ? messages.asiginspectores.actualizar : (params === 'grupal' ? messages.asiginspectores.actualizargrupo : messages.asiginspectores.agregar)}
                visible={modal}
                width='60%'
                centered={false}
                children={asigInspector}
                onCancel={handleModalOff}
                onOk={this.onSubmit}
                messageTitle={messages.confirmationTitle}
                messageBody={messages.confirmationBdy}
            />
        )
    }
}

export default FormAsigInspector;
