import React from 'react';
import { Modal } from '../Modal/Modal';
import { messages } from '../../util/messages';
import PagePanel from '../Page/PanelPage';
import { success, error } from '../../components/Messages/Messages';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  RowForm,
  UploadForm,
  ButtonForm,
  IconWrapper,
} from '../Util/util.style';
import { getBase64 } from '../../util/convert-image';

class FormImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      fileList: [],
    };
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
  };

  onSubmit = async () => {
    if (this.state.fileList.length === 0) {
      error('Seleccione un archivo .xlsx')
    } else {
      const res = await getBase64(this.state.fileList[0]);
      this.props.import({
        file: res,
      });
      this.props.handleModalOff();
    }
  };

  render() {
    const { fileList } = this.state;

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        const fileExt = file.name.substring(file.name.lastIndexOf('.'));
        if (fileExt != '.xlsx') {
          error('Archivo inválido, debe seleccionar un archivo con extensión .xlsx');
          return false;
        }

        if (this.state.fileList.length < 1) {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
        }

        return false;
      },
      fileList,
    };

    const formImport = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={12}>
            Formato de títulos del .xlsx:
          </ColForm>
          {this.props.titulos.map((item, index) => {
            return (
              <ColForm sm={12} lg={6} key={index}>
                {item}
              </ColForm>
            );
          })}
        </RowForm>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={{ span: 8, offset: 8 }}>
                <UploadForm {...props}>
                  <ButtonForm>
                    <IconWrapper type="upload" /> Seleccione el archivo .xlsx
                  </ButtonForm>
                </UploadForm>
              </ColFormLabel>
            </Field>
          </ColForm>
        </RowForm>
      </FieldContainer>
    );
    const ArchivoImport = <PagePanel titulo="Importar archivo" children={formImport} />;
    return (
      <div>
        <Modal
          title="Importación"
          visible={this.props.modal}
          centered={false}
          children={ArchivoImport}
          onCancel={this.props.handleModalOff}
          onOk={this.onSubmit}
          messageTitle={messages.confirmationTitle}
          messageBody={messages.confirmationBdy}
        />
      </div>
    );
  }
}

export default FormImport;
