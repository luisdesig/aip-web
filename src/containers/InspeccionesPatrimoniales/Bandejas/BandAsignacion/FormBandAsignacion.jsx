import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { error, success } from '../../../../components/Messages/Messages';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import PagePanel from '../../../../components/Page/PanelPage';
import moment from 'moment';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  RowForm,
  SelectForm,
  CheckboxForm,
  SkeletonForm,
} from '../../../../components/Util/util.style';
import Table from '../../../../components/Table/Table';
import { DatePicker, Card } from 'antd';
const Option = SelectForm.Option;

class FormBandInspeccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomcontacto: props.dataEdit ? props.dataEdit.nomcontacto : '',
      apepatcontacto: props.dataEdit ? props.dataEdit.apepatcontacto : '',
      apematcontacto: props.dataEdit ? props.dataEdit.apematcontacto : '',
      telefono: props.dataEdit ? props.dataEdit.telefono : '',
      celular: props.dataEdit ? props.dataEdit.celular : '',
      email: props.dataEdit ? props.dataEdit.email : '',
      datecalendar: props.dataEdit.fechainspeccion,
      ideriesgogironegocio: props.dataEdit.ideriesgogironegocio,
      ideinspector:
        props.dataEdit.ideprogramacion !== null ? props.dataEdit.ideinspector : 'Seleccione',
      ideingeniero: props.dataEdit.ingeniero.ideingeniero,
      idezona: props.dataEdit.zona.idezona,
      zona: props.dataEdit.zona.nombre,
      ideriesgo: props.dataEdit.riesgo.ideriesgo,
      riesgo: props.dataEdit.riesgo.nombre,
      valordeclarado: props.dataEdit.valordeclarado,
      ideinmueblepoliza: props.dataEdit.ideinmueblepoliza,
    };
  }
  async componentDidMount() {
    const {
      STARTACTIONGET,
      STARTACTIONLISTGIRONEGOCIO,
      STARTACTIONGETINSPECTORES,
      STARTACTIONEDITAGENDA,
      dataEdit,
    } = this.props;
    if (dataEdit.ideprogramacion) {
      await STARTACTIONEDITAGENDA({
        ideinspector: dataEdit.ideinspector,
        fechainspeccion: dataEdit.fechainspeccion,
        horainiprog: dataEdit.horainiprog,
        horafinprog: dataEdit.horafinprog,
      });
    }
    await STARTACTIONGET({
      idesolicitudinspeccion: this.props.dataEdit.idesolicitudinspeccion,
    });
    await STARTACTIONLISTGIRONEGOCIO();
    await STARTACTIONGETINSPECTORES({
      idezona: this.props.dataEdit.zona.idezona,
      ideriesgo: this.props.dataEdit.riesgo.ideriesgo,
      valordeclarado: this.props.dataEdit.valordeclarado,
      datecalendar: null,
    });
  }
  changeContacto = e => {
    const nomcontacto = e.target.value;
    if (nomcontacto.match(/^[-_ ,.'ña-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
      this.setState({ nomcontacto });
    }
  };
  changePaterno = e => {
    const apepatcontacto = e.target.value;
    if (apepatcontacto.match(/^[-_ ,.'ña-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
      this.setState({ apepatcontacto });
    }
  };
  changeMaterno = e => {
    const apematcontacto = e.target.value;
    if (apematcontacto.match(/^[-_ ,.'ña-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
      this.setState({ apematcontacto });
    }
  };
  changePhone = e => {
    const telefono = e.target.value;
    if (telefono.match(/^[- #/()*+0-9]{0,20}$/)) {
      this.setState({ telefono });
    }
  };
  changeMovil = e => {
    const celular = e.target.value;
    if (celular.match(/^[- #/()*+0-9]{0,20}$/)) {
      this.setState({ celular });
    }
  };
  changeEmail = e => {
    this.setState({ email: e.target.value });
  };
  blurEmail = e => {
    const email = e.target.value;
    if (email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
      success('Correo valido');
    } else {
      error('Correo invalido');
      this.setState({ email: '' });
    }
  };
  changeInspector = e => {
    this.setState({ datecalendar: null });
    this.setState({ ideinspector: e });
  };
  changeGiros = e => {
    let riesgo = this.props.giros.find(res => res.ideriesgogironegocio === e);
    this.setState({
      ideriesgogironegocio: e,
      riesgo: riesgo.riesgo.nombre,
      ideinspector: 'Seleccione',
    });
    this.props.STARTACTIONGETINSPECTORES({
      idezona: this.state.idezona,
      ideriesgo: riesgo.riesgo.ideriesgo,
      valordeclarado: this.props.bandejaasignacion.valordeclarado,
      datecalendar: null,
    });
  };

  changeCalendar = (date, dateString) => {
    this.setState({ datecalendar: dateString });
    this.props.STARTACTIONGETAGENDA({
      ideinspector: this.state.ideinspector,
      fechainspeccion: dateString,
    });
  };

  disabledDate(current) {
    // Can not select days before today and today
    return current < moment().startOf('day');
  }
  handleProgramar = e => {
    this.props.ACTIONASIGNARHORA(this.state.ideriesgo, e);
  };
  onSubmit = () => {
    const { bandejaasignacion, agenda, dataEdit } = this.props;
    const {
      nomcontacto,
      apepatcontacto,
      apematcontacto,
      telefono,
      celular,
      email,
      datecalendar,
      ideriesgogironegocio,
      ideinspector,
      ideingeniero,
      fechainspeccion,
      ideinmueblepoliza,
      ideriesgo,
    } = this.state;
    const horainspeccion = agenda.filter(res => res.status === true && res.disabled === false);
    const data = {
      idesolicitudinspeccion: bandejaasignacion.idesolicitudinspeccion,
      ideinmueblepoliza: ideinmueblepoliza,
      ideriesgogironegocio: ideriesgogironegocio,
      ideriesgo: ideriesgo,
      ideinspector: ideinspector,
      ideingeniero: ideingeniero,
      nomcontacto: nomcontacto,
      apepatcontacto: apepatcontacto,
      apematcontacto: apematcontacto,
      telefono: telefono,
      celular: celular,
      email: email,
      fechainspeccion: datecalendar,
      horainiprog: horainspeccion.length === 0 ? '9:00' : horainspeccion[0].horainiprog,
      horafinprog:
        horainspeccion.length === 0
          ? '10:00'
          : horainspeccion[horainspeccion.length - 1].horafinprog,
    };
    if (
      nomcontacto !== '' &&
      apepatcontacto !== '' &&
      apematcontacto !== '' &&
      telefono !== '' &&
      celular !== '' &&
      email !== '' &&
      fechainspeccion !== null &&
      horainspeccion.length !== 0
    ) {
      if (bandejaasignacion.ideprogramacion === '') {
        //agregar
        showConfirm(
          messages.bandejaasignacion.title,
          '¿Esta seguro que desea crear la programacion?',
          () => this.props.STARTACTIONPOST(data),
          () => this.props.handleModalOff(),
        );
      } else {
        data.ideprogramacion = dataEdit.ideprogramacion;
        //editar
        showConfirm(
          messages.bandejaasignacion.title,
          '¿Esta seguro que desea editar la programacion?',
          () => this.props.STARTACTIONPUT(data),
          () => this.props.handleModalOff(),
        );
      }
    } else {
      error(messages.bandejaasignacion.validacion);
    }
  };
  render() {
    const {
      datecalendar,
      ideriesgogironegocio,
      ideinspector,
      ideingeniero,
      nomcontacto,
      apepatcontacto,
      apematcontacto,
      telefono,
      celular,
      email,
      zona,
      riesgo,
      valordeclarado,
    } = this.state;
    const {
      modal,
      bandejaasignacion,
      handleModalOff,
      giros,
      ingenierosqas,
      comboinspectores,
      agenda,
    } = this.props;
    const columns = [
      {
        title: 'Hora',
        dataIndex: 'hora',
        width: 'auto',
        render: (tex, record) => {
          return (
            <div>
              {record.horainiprog} : {record.horafinprog}
            </div>
          );
        },
        sorter: (a, b) => {
          if (a.hora < b.hora) return -1;
          if (a.hora > b.hora) return 1;
          return 0;
        },
      },
      {
        title: 'Código Inspección',
        dataIndex: 'ideprogramacion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.motivo.nombre < b.motivo.nombre) return -1;
          if (a.motivo.nombre > b.motivo.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Dirección',
        dataIndex: 'direccion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.codprod < b.codprod) return -1;
          if (a.codprod > b.codprod) return 1;
          return 0;
        },
      },
      {
        title: 'Zona',
        dataIndex: 'zona',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numpol < b.numpol) return -1;
          if (a.numpol > b.numpol) return 1;
          return 0;
        },
      },
      {
        title: 'Contacto',
        dataIndex: 'contacto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.corredor.nombre < b.corredor.nombre) return -1;
          if (a.corredor.nombre > b.corredor.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Acciones',
        width: 0,
        render: (text, record) => {
          return (
            <div className="icons-acciones">
              <CheckboxForm
                onClick={() => this.handleProgramar(record)}
                disabled={record.disabled}
                checked={record.status}
              />
            </div>
          );
        },
      },
    ];
    const formBandAsignacion = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nombres:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  id="nomcontacto"
                  placeholder="Nombres del Contacto"
                  value={nomcontacto}
                  onChange={this.changeContacto}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ap. Paterno:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  id="apepatcontacto"
                  placeholder="Apellido paterno"
                  value={apepatcontacto}
                  onChange={this.changePaterno}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ap. Materno:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  id="apematcontacto"
                  placeholder="Apellido materno"
                  value={apematcontacto}
                  onChange={this.changeMaterno}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Fijo:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  id="telefono"
                  placeholder="Teléfono Fijo"
                  value={telefono}
                  onChange={this.changePhone}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Móvil:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  id="celular"
                  placeholder="Teléfono Móvil"
                  value={celular}
                  onChange={this.changeMovil}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Correo:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  id="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={this.changeEmail}
                  onBlur={this.blurEmail}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={16}>
            <Field>
              <ColFormLabel sm={5}>
                <label>Giro y Ocupación:</label>
              </ColFormLabel>
              <ColForm sm={19}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeGiros}
                  value={ideriesgogironegocio}
                  placeholder="Seleccione"
                >
                  {giros.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideriesgogironegocio}>
                        {`${item.gironegocio.nombre} / ${item.ocupacion.ocupacion}`}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Inspector:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={ideinspector}
                  onChange={this.changeInspector}
                  placeholder="Seleccione"
                >
                  {comboinspectores.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideinspector}>
                        {item.nombres}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Clasificación de Riesgo:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input placeholder="Clasificación" disabled={true} value={riesgo} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Zona:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input placeholder="Zona" disabled={true} value={zona} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ingeniero QA:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeIngeniero}
                  value={ideingeniero}
                  disabled={true}
                >
                  {ingenierosqas.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideingeniero}>
                        {`${item.nombres} ${item.apepaterno} ${item.apematerno}`}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Valor Declarado:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input placeholder="Valor agregado" disabled={true} defaultValue={valordeclarado} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>C. Estratégica:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  placeholder="Cuenta Estratégica"
                  disabled={true}
                  defaultValue={bandejaasignacion.polizaestrategica}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Calendario:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <DatePicker
                  disabledDate={this.disabledDate}
                  onChange={this.changeCalendar}
                  disabled={ideinspector !== 'Seleccione' ? false : true}
                  value={datecalendar === null ? null : moment(datecalendar, 'YYYY-MM-DD')}
                />
              </ColForm>
            </Field>
          </ColForm>
        </RowForm>
      </FieldContainer>
    );
    const formAsignacion = (
      <div>
        <PagePanel titulo="Datos del contacto" children={formBandAsignacion} />
        <Table
          title={'Agenda del inspector'}
          rowKey="id"
          columns={columns}
          scroll={{ X: '100%' }}
          dataSource={agenda}
          pageSize={5}
        />
      </div>
    );

    return (
      <Modal
        title={'Asignacion del contacto'}
        visible={modal}
        width="80%"
        centered={false}
        children={
          giros.length === 1 ? (
            <SkeletonForm active>
              <Card sm={24} loading={true}></Card>
              <Card sm={24} loading={true}></Card>
            </SkeletonForm>
          ) : (
            formAsignacion
          )
        }
        onCancel={handleModalOff}
        onOk={this.onSubmit}
        messageTitle={messages.confirmationTitle}
        messageBody={messages.confirmationBdy}
      />
    );
  }
}

export default FormBandInspeccion;
