import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import PagePanel from '../../../../components/Page/PanelPage';
import TableZona from './TableZona';
import { error } from '../../../../components/Messages/Messages';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm
} from '../../../../components/Util/util.style';

const Option = SelectForm.Option;

const errorx = (param) => {
    if (param === 'existe') {
        error('El ubigeo seleccionado ya existe, o se encuentra dentro de un grupo.');
    } else {
        error('Mínimo a seleccionar es el país.');
    }
};

class FormMantZona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idezona: props.dataEdit ? (props.params === 'asignarzona' ? 'Seleccione' : props.dataEdit.zona.idezona) : 'Seleccione',
            idedepartamento: 'Todos',
            ideprovincia: 'Todos',
            idedistrito: 'Todos',
            idepais: 'Todos',
            ideubigeo: '',
            ubigeos: props.dataEdit ? (
                props.params === 'asignarzona' ?
                    [{ idepais: props.dataEdit.pais.idepais, ubigeo: props.dataEdit.ideubigeo }] :
                    [props.dataEdit.ideubigeo]) : [],
            dataSource: [],
            base: [],
            ERROR: []
        }
    }
    changeZona = (e) => {
        if (this.props.dataEdit) {
            this.setState({
                idezona: e
            })
        } else {
            this.setState({
                idezona: e,
                idedepartamento: 'Todos',
                ideprovincia: 'Todos',
                idedistrito: 'Todos',
                idepais: 'Todos',
                ideubigeo: '',
                ubigeos: []
            })
        }
        this.props.ACTIONCLEANZONAS();
    }
    changePais = (e) => {
        this.props.ACTIONSELECTDEPARTAMENTO(e)
        this.setState({ idepais: e, ideubigeo: e, idedepartamento: 'Todos', ideprovincia: 'Todos', idedistrito: 'Todos' })
    }
    changeDepartamento = (e) => {
        this.props.ACTIONSELECTPROVINCIA(e);
        this.setState({ idedepartamento: e, ideubigeo: e, ideprovincia: 'Todos' })
    }
    changeProvincia = (e) => {
        this.props.ACTIONSELECTDISTRITO(e);
        this.setState({ ideprovincia: e, ideubigeo: e, idedistrito: 'Todos' })
    }
    changeDistrito = (e) => {
        this.setState({ idedistrito: e, ideubigeo: e })
    }

    handleConfirmation = () => {
        this.setState({ modalConfimation: true })
    }
    handleModalOff = () => {
        this.setState({ modalConfimation: false })
    }

    cleanUbigeo = () => {
        this.setState({
            idedepartamento: 'Todos',
            ideprovincia: 'Todos',
            idedistrito: 'Todos',
            idepais: 'Todos',
        })
    }

    addUbigeo = () => {
        const {
            idezona,
            idepais,
            idedepartamento,
            ideprovincia,
            idedistrito,
            ubigeos,
            ideubigeo,
            base,
        } = this.state;
        const {
            paises,
            departamentos,
            provincias,
            distritos,
            zonasgeograficascurrent
        } = this.props;
        let data = {
            ideubigeo: ideubigeo,
            idezona: idezona,
            idepais: idepais,
            idedepartamento: idedepartamento,
            ideprovincia: ideprovincia,
            idedistrito: idedistrito
        }
        if (idepais !== 'Todos') {
            if (ubigeos.indexOf(ideubigeo) < 0) {
                if (zonasgeograficascurrent.length > 0) {
                    //Nivel de pais
                    const res = zonasgeograficascurrent.find(res => res.departamento.nombre == 'Todos' && res.pais.idepais === idepais)
                    if (res === undefined) {
                        const res = zonasgeograficascurrent.find(res => res.provincia.nombre == 'Todos' && res.departamento.ideubigeo === idedepartamento)
                        if (res === undefined) {
                            const res = zonasgeograficascurrent.find(res => res.distrito.nombre == 'Todos' && res.provincia.ideubigeo === ideprovincia)
                            if (res === undefined) {
                                ubigeos.push({
                                    idepais: this.state.idepais,
                                    ubigeo: this.state.ideubigeo
                                })
                                //ubigeos.push(this.state.ideubigeo);
                                this.props.ACTIONREGISTERZONA(data);
                                this.setState({ ubigeos })
                                this.cleanUbigeo();
                            } else {
                                errorx('existe')
                            }
                        } else {
                            errorx('existe')
                        }
                    } else {
                        errorx('existe')
                    }
                } else {
                    ubigeos.push({
                        idepais: this.state.idepais,
                        ubigeo: this.state.ideubigeo
                    })
                    //ubigeos.push(this.state.ideubigeo);
                    this.props.ACTIONREGISTERZONA(data);
                    this.setState({ ubigeos })
                    this.cleanUbigeo();
                }
            } else {
                errorx('existe')
            }
        } else {
            errorx(null)
        }
    }
    addZonaG = (data) => {
        this.props.STARTACTIONPOST(data);
        this.validateUbigeo();
    }
    validateUbigeo = () => {
        if (this.props.zonaErroAdd) {
            return error('el ubigueo ya existe');
        }
    }
    onSubmit = () => {
        const { zonas, dataEdit, params } = this.props;
        let zona = zonas.find(res => res.idezona === this.state.idezona);
        let data = {
            idezona: params === 'editar' ? zona : this.state.idezona,
            ubigeos: this.state.ubigeos
        }
        if (data.ubigeos.length !== 0 && data.idezona !== 'Seleccione') {
            if (params === 'editar') {
                showConfirm(messages.zonasgeograficas.title,
                    messages.confirmationUpdate,
                    () => this.props.STARTACTIONPUT(dataEdit.ideubigeozona, data),
                    () => this.props.handleModalOff()
                );
            } else {
                showConfirm(messages.zonasgeograficas.title,
                    messages.confirmationInsert,
                    () => this.props.STARTACTIONPOST(data),
                    () => this.props.handleModalOff()
                );
            }
        } else {
            error(messages.zonasgeograficas.validacion)
        }
    }
    render() {
        var dataSourceEdit = []
        const {
            idezona,
            idepais,
            idedepartamento,
            ideprovincia,
            idedistrito
        } = this.state;
        const {
            params,
            dataEdit,
            modal,
            handleModalOff,
            zonasgeograficascurrent,
            zonas,
            paises,
            departamentos,
            provincias,
            distritos
        } = this.props;
        if (dataEdit) {
            dataSourceEdit.push(dataEdit)
        }
        const formMantZona = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={{ span: 24 }} lg={{ span: 8, offset: 8 }}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Nombre de la Zona:</label>
                            </ColFormLabel>
                            <ColForm sm={8} lg={12}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeZona}
                                    value={idezona}
                                >
                                    {
                                        zonas.map((item, index) => {
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
                {
                    dataEdit ? '' :
                        <RowForm gutter={16}>
                            <ColForm sm={12} lg={6}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>País:</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changePais}
                                            value={idepais}
                                        >
                                            {paises.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.idepais}>
                                                        {item.nombre}
                                                    </Option>
                                                )
                                            })}
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                            <ColForm sm={12} lg={6}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Departamento:</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changeDepartamento}
                                            value={idedepartamento}
                                        >
                                            {departamentos.map((item, index2) => {
                                                return (
                                                    <Option key={index2} value={item.ideubigeo}>
                                                        {item.nombre}
                                                    </Option>
                                                )
                                            })}
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                            <ColForm sm={12} lg={6}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Provincia:</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changeProvincia}
                                            value={ideprovincia}
                                        >
                                            {provincias.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.ideubigeo}>
                                                        {item.nombre}
                                                    </Option>
                                                )
                                            })}
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                            <ColForm sm={12} lg={6}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Distrito:</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changeDistrito}
                                            value={idedistrito}
                                        >
                                            {distritos.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.ideubigeo}>
                                                        {item.nombre}
                                                    </Option>
                                                )
                                            })}
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                        </RowForm>
                }
                {
                    dataEdit ? '' : <RowForm gutter={16}>
                        <ColForm sm={{ span: 4, offset: 10 }} lg={{ span: 8, offset: 8 }}>
                            <button
                                className="btn-cta-search"
                                onClick={this.addUbigeo}
                            >
                                Agregar
                                </button>
                        </ColForm>
                    </RowForm>
                }

            </FieldContainer>
        )

        const mantZona = (
            <div>
                <PagePanel titulo='Datos de la zona' children={formMantZona} />
                <TableZona
                    ACTIONDELETECURRENTZONA={this.props.ACTIONDELETECURRENTZONA}
                    params={params}
                    dataSource={params === 'editar' || params === 'asignarzona' ? dataSourceEdit : zonasgeograficascurrent}
                />
            </div>
        )


        return (
            <div>
                <Modal
                    title={dataEdit && params !== 'sinasignar' ? messages.zonasgeograficas.actualizar : messages.zonasgeograficas.agregar}
                    width={'80%'}
                    visible={modal}
                    centered={false}
                    children={mantZona}
                    onCancel={handleModalOff}
                    onOk={this.onSubmit}
                    messageTitle={messages.confirmationTitle}
                    messageBody={messages.confirmationBdy}
                />
            </div>
        )
    }
}

export default FormMantZona;