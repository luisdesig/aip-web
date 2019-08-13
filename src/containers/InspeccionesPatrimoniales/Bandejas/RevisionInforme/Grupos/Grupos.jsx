import React from 'react';
import { FieldContainer, TabsForm } from '../../../../../components/Util/util.style';
import Secciones from '../Secciones/Secciones';

const TabPane = TabsForm.TabPane;

export default class Grupos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { groups } = this.props;
    if (!Array.isArray(groups) || groups.length === 0) {
      return null;
    }
    return this.renderLista(groups);
  }

  renderLista = groups => {
    const { informeInspeccion, answers } = this.props;
    return (
      <FieldContainer>
        <TabsForm>
          {groups.map((group, index) => {
            const updateQuestion = response => {
              const { updateQuestion } = this.props;
              updateQuestion({ groupId: group.groupId, ...response });
            };
            return (
              <TabPane tab={group.name} key={`${group.groupId}_${index}`} value={group.groupId}>
                <Secciones
                  informeInspeccion={informeInspeccion}
                  group={group}
                  updateQuestion={updateQuestion}
                  answers={answers.filter(answer => answer.groupId === group.groupId)}
                />
              </TabPane>
            );
          })}
        </TabsForm>
      </FieldContainer>
    );
  };
}
