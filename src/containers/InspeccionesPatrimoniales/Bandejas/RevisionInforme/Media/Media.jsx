import React from 'react';
import {
  FieldContainer,
  RowForm,
  ColForm,
  DividerForm,
  ButtonForm,
  IconWrapper
} from '../../../../../components/Util/util.style';
import { Skeleton } from 'antd';
import ImageMedia from '../../../../../components/Image/Image';
import ComentarioMedia from '../../../../../components/Comentario/Comentario';
import { MediaContainer } from '../../../../../components/Media/Media.style';

export default class Grupos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargandoCategorias: false,
      categorias: {},
      previewVisible: false,
      previewImage: '',
      modalComentario: false,
      idegrupogarantia: '',
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModalOff = this.handleModalOff.bind(this);
  }
  componentWillReceiveProps(nextProps) { }
  async componentDidMount() {
    await this.props.STARTACTIONGETMEDIA({ ideinformeinspeccion: this.props.informeInspeccion.ideinformeinspeccion });
  }
  handleComentario = e => {
    console.log(e);
    const result = this.state.categorias;
    for (const key in result) {
      if (e === key) {
        console.log('ya exite');
      } else {
        console.log('no existe');
      }
    }
  };
  renderUpload = index => {
    return <ButtonForm onClick={() => this.handleComentario(index)} />;
  };
  renderImagesCategoria = index => {
    return <div>{this.renderUpload(index)}</div>;
  };
  handleDelete = e => {
    this.props.deleteImage(e)
  };
  handleView = e => {
    this.setState({ previewVisible: true, previewImage: e });
  };
  handelCloseView = () => {
    this.setState({ previewVisible: false });
  };
  handleModal = e => {
    this.setState({ modalComentario: true, idegrupogarantia: e.ideCategoria });
  };
  handleModalOff = () => {
    this.setState({ modalComentario: false });
  };
  handleEditComentario = (res) => {
    this.props.handeEditComentario(res)
  }
  onSubmit = () => {
    const { medias, informeInspeccion } = this.props;
    const data = {
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion,
      imagenes: medias.imagenes.filter(res => res.editado === true),
      comentarios: medias.comentarios.filter(res => res.editado === true)
    }
    this.props.STARTACTIONPOSTMEDIA(data)
  }
  render() {
    const { categorias, medias, escuchaSeleccionMedia, handleView } = this.props;
    if (!Array.isArray(medias.comentarios)) {
      return (
        <Skeleton active />
      )
    } else {
      const imagenes = medias.imagenes;
      const comentarios = medias.comentarios;
      return (
        <div>
          <RowForm>
            {
              categorias.map((item, index) => {
                return (
                  <div key={index}>
                    <ColForm sm={12} lg={12}>
                      <FieldContainer key={index}>
                        <RowForm style={{ textAlign: 'left', color: '#f0353b !important' }}>
                          <h5 className='titulo' style={{ color: '#f0353b' }}>{item.nombre}</h5>
                        </RowForm>
                        <RowForm>
                          <MediaContainer>
                            {imagenes.map((res, index) => {
                              if (res.idegrupogarantia === item.ideCategoria && res.indeliminado === 0) {
                                return (
                                  <ImageMedia
                                    image={res.imageninspector}
                                    handleDelete={() => this.handleDelete(res.idemediafototxt)}
                                    handleView={() => handleView(res.imageninspector)}
                                  />
                                );
                              }
                            })}
                            {comentarios.map((res, index) => {
                              if (res.idegrupogarantia === item.ideCategoria && res.indeliminado === 0) {
                                return <ComentarioMedia
                                  handleEdit={() => this.handleEditComentario(res)}
                                  handleDelete={() => this.props.deleteComentario(res.idemediafototxt)}
                                />;
                              }
                            })}
                            <IconWrapper
                              style={{ color: '#f0353b' }}
                              type="plus-circle"
                              className='agregar'
                              onClick={() => escuchaSeleccionMedia(item.ideCategoria)} />
                          </MediaContainer>
                        </RowForm>
                        <DividerForm />
                      </FieldContainer>
                    </ColForm>
                  </div>
                );
              })
            }
          </RowForm>
          <RowForm>
            <ButtonForm onClick={this.onSubmit} style={{ color: '#FFFFFF', background: '#f0353b' }}>Guardar</ButtonForm>
          </RowForm>
        </div>
      )
    }
  }
}
