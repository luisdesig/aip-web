import React from 'react';
import { Popover, Button } from 'antd';
import { Contenedor } from '../Pregunta.style';

export default class PopoverControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  showPopover() {
    this.setState({ isVisible: true });
  }

  closePopover() {
    this.setState({ isVisible: false });
  }

  handleVisibleChange = isVisible => {
    this.setState({ isVisible });
  };

  render() {
    const { isVisible } = this.state;
    const { imageInfo } = this.props;

    if (!imageInfo) {
      return null;
    }

    return (
      <Contenedor>
        <Popover
          content={
            <img
              style={{
                resizeMode: 'contain',
              }}
              src={`data:image/png;base64,${imageInfo}`}
            />
          }
          title="Imagen Informativa"
          trigger="click"
          visible={isVisible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="danger" shape="circle" icon="picture" />
        </Popover>
      </Contenedor>
    );
  }
}
