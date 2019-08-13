import React from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import { messages } from '../../../../../util/messages';
import { error } from '../../../../../components/Messages/Messages'
import { FieldContainer, ColForm, RowForm, Field, ColFormLabel, InputForm, SelectForm } from '../../../../../components/Util/util.style';
import uuid from 'uuid';

const { TextArea } = InputForm;
const Option = SelectForm.Option;

class ComentarioMedia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: props.dataEdit ? props.dataEdit.comentario : '',
            idegrupopregunta: props.dataEdit ? props.dataEdit.idegrupopregunta : 'Seleccione',
        }
    }
    componentDidMount() {
        const { categoria, ideriesgo, getGrupoPregunta } = this.props;
        let data = {
            idegrupogarantia: categoria,
            ideriesgo: ideriesgo
        }
        getGrupoPregunta(data)
    }
    changeComentario = (e) => {
        this.setState({ comentario: e.target.value })
    }
    changeGrupo = (e) => {
        this.setState({ idegrupopregunta: e })
    }
    onSubmit = () => {
        const { comentario, idegrupopregunta } = this.state;
        const { categoria, dataEdit } = this.props;
        const data = {
            idegrupogarantia: categoria,
            idegrupopregunta: idegrupopregunta,
            comentario: comentario,
            indeliminado: 0,
        }
        if (comentario !== '' && idegrupopregunta !== 'Seleccione') {
            if (dataEdit) {
                data.idemediafototxt = dataEdit.idemediafototxt;
                this.props.updateComentario(data)
            } else {
                data.idemediafototxt = uuid.v1();
                data.editado = true;
                this.props.addComentario(data)
            }
            this.props.handleModalOff()
        } else {
            error('Todos los campos son obligatorios')
        }
    }

    render() {
        const { modal, handleModalOff, medias } = this.props;
        const { comentario, idegrupopregunta } = this.state;
        const formComentario = (
            <FieldContainer>
                <RowForm>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={6}>
                                <label>Grupo</label>
                            </ColFormLabel>
                            <ColForm sm={18}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeGrupo}
                                    value={idegrupopregunta}
                                >
                                    {
                                        medias.combogrupopregunta.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idegrupopregunta}>
                                                    {item.nombre}
                                                </Option>
                                            )
                                        })
                                    }
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={6}>
                                <label>Comentario</label>
                            </ColFormLabel>
                            <ColForm sm={18}>
                                <TextArea
                                    placeholder='Comentario'
                                    value={comentario}
                                    onChange={this.changeComentario}
                                    rows={4}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        )

        return (
            <Modal
                title={'Comentario'}
                visible={modal}
                width='30%'
                centered={false}
                children={formComentario}
                onCancel={handleModalOff}
                onOk={this.onSubmit}
                messageTitle={messages.confirmationTitle}
                messageBody={messages.confirmationBdy}
            />
        )
    }
}

export default ComentarioMedia