import React from 'react';
import { FieldContainer, ColForm, RowFormQ } from '../../../../../components/Util/util.style';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { consultarCategoriasPorInspeccionAction } from '../../../../../redux/Categorias/actions';

class CategoriasInspeccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargandoCategorias: false,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({ cargandoCategorias: nextProps.cargandoInformes });
  }

  async componentDidMount() {
    const { consultarCategoriasPorInspeccionAction, informeInspeccion } = this.props;
    this.setState({ cargandoCategorias: true });
    await consultarCategoriasPorInspeccionAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion,
    });
  }

  render() {
    const { categorias } = this.props;
    if (!Array.isArray(categorias) || categorias.length === 0) {
      const categoriasDummy = [{}, {}, {}, {}, {}, {}];
      return this.renderLista(categoriasDummy);
    }
    return this.renderLista(categorias);
  }

  renderLista = categorias => {
    const { escuchaSeleccionCategoria } = this.props;
    return (
      <FieldContainer>
        <RowFormQ gutter={32}>
          {categorias.map((categoria, index) => {
            const imagen = categoria.imagen ? 'data:image/png;base64,' + categoria.imagen : null;
            return (
              <ColForm span={4} key={index}>
                <Card
                  hoverable
                  key={index}
                  style={{ width: 160, height: 240 }}
                  loading={!categoria.nombre}
                  cover={
                    <img
                      alt={categoria.nombre ? categoria.nombre : ''}
                      src={imagen}
                      onClick={() =>
                        categoria.nombre ? escuchaSeleccionCategoria(categoria) : null
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
                    {categoria.nombre ? categoria.nombre : ''}
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
)(CategoriasInspeccion);
