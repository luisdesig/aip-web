import React from 'react';
import SearchBandPolizas from './SearchBandPolizas';
import FormBandPolizas from './FormBandPolizas';
import Table from '../../../../components/Table/Table';
import PageTitle from '../../../../components/Page/TitlePage';
import { IconWrapper } from '../../../../components/Util/util.style';
import { connect } from 'react-redux';
import { messages } from '../../../../util/messages';
import {
  STARTACTIONSEARCH,
  STARTACTIONGET,
  STARTACTIONPOST,
  ACTIONCHANGEESTADO,
  ACTIONREGISTERGARANTIA,
  ACTIONDELETEGARANTIA,
  ACTIONCLEAN
} from '../../../../redux/BandPoliza/actions';
import {
  STARTACTIONGETSUBGARANTIA,
  ACTIONCLEANINMUEBLES,
} from '../../../../redux/MantGarantia/actions';
import { ACTIONSUBGARANTIA } from '../../../../redux/Common/filters';

const index = 'Pólizas por Renovar';
const indexBuscar = "CONSULTAR POLIZAS POR RENOVAR";
const indexRegistrar = "CREAR SOLICITUDES DE  POLIZAS POR RENOVAR";
const indexModificar = "MODIFICAR POLIZAS POR RENOVAR";
const indexEliminar = "CERRAR INSPECCIONES DE  POLIZAS POR RENOVAR";

class BandPolizas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMantBandPolizas: false,
      modalImportar: false,
      bandPolizasEdit: undefined,
      params: undefined,
      id: undefined,
      modalGarantia: false,
    };
    this.handleModalOff = this.handleModalOff.bind(this);
    this.handleModalGarantia = this.handleModalGarantia.bind(this);
    this.handleModalGarantiaOff = this.handleModalGarantiaOff.bind(this);
  }

  componentDidMount() {
    this.props.STARTACTIONSEARCH({
      codprod: '',
      numpol: '',
      numren: '',
      nombrecorredor: '',
      numdocbroker: '',
      nomcliente: '',
      numdoccliente: '',
      rangedate: ''
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.bandpolizas.reload != prevProps.bandpolizas.reload) {
      return this.props.STARTACTIONSEARCH({
        codprod: '',
        numpol: '',
        numren: '',
        nombrecorredor: '',
        numdocbroker: '',
        nomcliente: '',
        numdoccliente: '',
        rangedate: ''
      });
    }
  }
  updateData() {
    this.props.STARTACTIONSEARCH();
  }
  handleModal = () => {
    this.setState({ modalMantBandPolizas: true });
  };
  handleModalGarantia = () => {
    this.setState({ modalGarantia: true });
  };
  handleModalOff = () => {
    this.setState({ modalMantBandPolizas: false, modalGarantia: false });
    this.props.ACTIONCLEAN();
  };
  handleModalGarantiaOff = () => {
    this.setState({ modalGarantia: false });
  };
  handleEditBandPolizas = (e, params) => {
    this.setState({ BandPolizasEdit: e, modalMantBandPolizas: true, params: 'editar' });
  };

  render() {
    const { modalMantBandPolizas, BandPolizasEdit, params, modalGarantia } = this.state;
    const {
      bandpolizas,
      gruposgarantias,
      subgruposgarantias,
      STARTACTIONSEARCH,
      STARTACTIONGET,
      STARTACTIONPOST,
      ACTIONSUBGARANTIA,
      ACTIONREGISTERGARANTIA,
      ACTIONDELETEGARANTIA,
      inmueblegarantias,
      STARTACTIONGETSUBGARANTIA,
      ACTIONCHANGEESTADO,
      ACTIONCLEANINMUEBLES,
      acciones
    } = this.props;

    let buscar = acciones.permisos.indexOf(indexBuscar);
    let agregar = acciones.permisos.indexOf(indexRegistrar);
    let modificar = acciones.permisos.indexOf(indexModificar);
    let eliminar = acciones.permisos.indexOf(indexEliminar);

    const dataSource = bandpolizas.polizasrenovar;
    const columns = [
      {
        title: 'Código Producto',
        dataIndex: 'codprod',
        width: 'auto',
        sorter: (a, b) => {
          console.log(a, b);
          if (a.codprod < b.codprod) return -1;
          if (a.codprod > b.codprod) return 1;
          return 0;
        },
      },
      {
        title: 'Número de Póliza',
        dataIndex: 'numpol',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numpol < b.numpol) return -1;
          if (a.numpol > b.numpol) return 1;
          return 0;
        },
      },
      {
        title: 'Número de Renovación',
        dataIndex: 'numren',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numren < b.numren) return -1;
          if (a.numren > b.numren) return 1;
          return 0;
        },
      },
      {
        title: 'Corredor',
        dataIndex: 'nombrecorredor',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nombrecorredor < b.nombrecorredor) return -1;
          if (a.nombrecorredor > b.nombrecorredor) return 1;
          return 0;
        },
      },
      {
        title: 'RUC',
        dataIndex: 'numdocbroker',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numdocbroker < b.numdocbroker) return -1;
          if (a.numdocbroker > b.numdocbroker) return 1;
          return 0;
        },
      },
      {
        title: 'Nombre Cliente',
        dataIndex: 'nomcliente',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nomcliente < b.nomcliente) return -1;
          if (a.nomcliente > b.nomcliente) return 1;
          return 0;
        },
      },
      {
        title: 'DNI',
        dataIndex: 'numdoccliente',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numdoccliente < b.numdoccliente) return -1;
          if (a.numdoccliente > b.numdoccliente) return 1;
          return 0;
        },
      },
      {
        title: 'Fecha Fin Vigencia',
        dataIndex: 'fechafinvig',
        width: 'auto',
        sorter: (a, b) => {
          if (a.fechafinvig < b.fechafinvig) return -1;
          if (a.fechafinvig > b.fechafinvig) return 1;
          return 0;
        },
      },
      {
        title: 'Indicador Fronting',
        dataIndex: 'indreafacfronting',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ID < b.ID) return -1;
          if (a.ID > b.ID) return 1;
          return 0;
        },
      },
      {
        title: 'Acciones',
        width: 0,
        render: (text, record, index) => {
          return (
            <div className="icons-acciones">
              {indexRegistrar < 0 ? '' : <IconWrapper
                type="edit"
                theme="filled"
                className="edit"
                onClick={() => this.handleEditBandPolizas(record)}
              />}
            </div>
          );
        },
      },
    ];

    return (
      <div className="container">
        <PageTitle titulo={messages.bandejapolizarenovar.title} />
        {buscar < 0 ? '' : <SearchBandPolizas STARTACTIONSEARCH={STARTACTIONSEARCH} />}
        <Table
          title={messages.bandejapolizarenovar.title}
          rowKey="idepolizaacuerdo"
          columns={columns}
          scroll={{ x: '100%' }}
          dataSource={dataSource}
          pageSize={3}
          loading={bandpolizas.loading}
        />
        {modalMantBandPolizas ? (
          <FormBandPolizas
            modal={modalMantBandPolizas}
            modalGarantia={modalGarantia}
            handleModalGarantia={this.handleModalGarantia}
            handleModalOff={this.handleModalOff}
            handleModalGarantiaOff={this.handleModalGarantiaOff}
            dataEdit={BandPolizasEdit}
            bandpolizas={bandpolizas}
            params={params}
            STARTACTIONGET={STARTACTIONGET}
            STARTACTIONPOST={STARTACTIONPOST}
            gruposgarantias={gruposgarantias}
            subgruposgarantias={subgruposgarantias}
            ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
            STARTACTIONGETSUBGARANTIA={STARTACTIONGETSUBGARANTIA}
            inmueblegarantias={inmueblegarantias}
            ACTIONCHANGEESTADO={ACTIONCHANGEESTADO}
            ACTIONCLEANINMUEBLES={ACTIONCLEANINMUEBLES}
            ACTIONREGISTERGARANTIA={ACTIONREGISTERGARANTIA}
            ACTIONDELETEGARANTIA={ACTIONDELETEGARANTIA}
          />
        ) : (
            ''
          )}
      </div>
    );
  }
}

const mapPropsState = state => ({
  bandpolizas: state.bandpolizas,
  inmueblegarantias: state.garantias.inmueblegarantias,
  gruposgarantias: state.common.gruposgarantias,
  subgruposgarantias: state.common.subgruposgarantias,
  acciones: state.auth.acciones.find(res => res.nombre === index)
});

const mapPropsDispatch = dispatch => ({
  STARTACTIONSEARCH: data => dispatch(STARTACTIONSEARCH(data)),
  STARTACTIONGET: data => dispatch(STARTACTIONGET(data)),
  STARTACTIONPOST: data => dispatch(STARTACTIONPOST(data)),
  ACTIONSUBGARANTIA: id => dispatch(ACTIONSUBGARANTIA(id)),
  ACTIONCHANGEESTADO: data => dispatch(ACTIONCHANGEESTADO(data)),
  STARTACTIONGETSUBGARANTIA: data => dispatch(STARTACTIONGETSUBGARANTIA(data)),
  ACTIONREGISTERGARANTIA: data => dispatch(ACTIONREGISTERGARANTIA(data)),
  ACTIONDELETEGARANTIA: id => dispatch(ACTIONDELETEGARANTIA(id)),
  ACTIONCLEANINMUEBLES: () => dispatch(ACTIONCLEANINMUEBLES()),
  ACTIONCLEAN: () => dispatch(ACTIONCLEAN()),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(BandPolizas);
