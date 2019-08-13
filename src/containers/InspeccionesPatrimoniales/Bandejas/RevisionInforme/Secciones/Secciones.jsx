import React from 'react';
import { FieldContainer } from '../../../../../components/Util/util.style';
import { Card, Row, Col } from 'antd';
import _ from 'lodash';
import Preguntas from '../Preguntas/Preguntas';

const { Meta } = Card;

export default class Secciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargandoCategorias: false,
      ideCategoria: null,
    };
  }

  render() {
    const { group } = this.props;
    if (!Array.isArray(group.sections) || group.sections.length === 0) {
      return null;
    }
    return this.renderLista(group.sections);
  }

  renderLista = sections => {
    const { informeInspeccion, answers } = this.props;
    const sectionsRows = _.chunk(sections, 2);

    return (
      <FieldContainer>
        {sectionsRows.map((sectionRow, i) => {
          return (
            <Row gutter={16} key={i}>
              {sectionRow.map((section, j) => {
                const updateQuestion = response => {
                  const { updateQuestion } = this.props;
                  updateQuestion({ sectionId: section.sectionId, ...response });
                };
                return (
                  <Col style={{ marginBottom: 5 }} key={j} span={12}>
                    <Card key={j} style={{}}>
                      <Meta title={`${section.name}`} description={`${section.name}`} />
                      <Preguntas
                        informeInspeccion={informeInspeccion}
                        updateQuestion={updateQuestion}
                        answers={answers.filter(answer => answer.sectionId === section.sectionId)}
                        section={section}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </FieldContainer>
    );
  };
}
