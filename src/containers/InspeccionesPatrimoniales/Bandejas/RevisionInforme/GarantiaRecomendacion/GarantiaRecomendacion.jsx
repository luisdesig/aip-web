import React from 'react';
import { FieldContainer, ColForm, RowFormQ } from '../../../../../components/Util/util.style';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { consultarCategoriasPorInspeccionAction } from '../../../../../redux/Categorias/actions';

import imgSeguimiento from '../../../../../images/seguimiento.png';
import imgAgregar from '../../../../../images/agregar.png';

class GarantiaRecomendacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    //this.setState({ cargandoCategorias: nextProps.cargandoInformes });
  }

  componentDidMount() {
    /*const { consultarCategoriasPorInspeccionAction, informeInspeccion } = this.props;
    this.setState({ cargandoCategorias: true });
    consultarCategoriasPorInspeccionAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion,
    });*/
  }

  render() {
    const { escuchaSeleccionSeguimiento,escuchaSeleccionGarantiaRecomendacion } = this.props;
    //const { categorias } = this.props; 
    const opciones = [
    {imagen: imgSeguimiento,
      nombre: 'SEGUIMIENTO',
      accion: escuchaSeleccionSeguimiento
    },
    {imagen:imgAgregar,
      nombre:'GARANTÍAS y RECOMENDACIONES',
      accion: escuchaSeleccionGarantiaRecomendacion
    }];
    return this.renderLista(opciones);
  }

  renderLista = opciones => {
    
    return (
      <FieldContainer>
        <RowFormQ gutter={32}>
          {opciones.map((opcion, index) => {
            const imagen = opcion.imagen;
            return (
              <ColForm span={4} key={index}>
                <Card
                  hoverable
                  key={index}
                  style={{ width: 190, height: 240 }}
                  loading={!opcion.nombre}
                  cover={
                    <img
                      alt={opcion.nombre ? opcion.nombre : ''}
                      src={imagen}
                      onClick={() =>
                        opcion.nombre ? opcion.accion() : null
                      }
                    />
                  }
                >
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: 'red',
                      width: '100%',
                      textAlign: 'center',
                      cursor: 'pointer',
                      wordBreak: 'break-word',
                    }}
                  >
                    {opcion.nombre ? opcion.nombre : ''}
                  </div>
                </Card>
              </ColForm>
            );
          })}
        </RowFormQ>
      </FieldContainer>
    );
  };
}

const mapPropsState = state => ({
  categorias: state.categorias.items,
  cargandoCategorias: state.categorias.cargando,
});

const mapPropsDispatch = dispatch => ({
  consultarCategoriasPorInspeccionAction: payload =>
    dispatch(consultarCategoriasPorInspeccionAction(payload)),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(GarantiaRecomendacion);
