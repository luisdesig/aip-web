import React from 'react';
import Pregunta from '../Pregunta';
import Reactotron from 'reactotron-react-js';

export default class ItemListControl extends React.Component {
  updateQuestion = value => {
    const { updateQuestion, record } = this.props;
    if (record) {
      const answers = (record.answers || []).map(answer => {
        if (answer.questionId === value.questionId) {
          return { ...value };
        }
        return answer;
      });
      updateQuestion({
        index: record.index,
        answers,
      });
    }
  };

  render() {
    const { question, record, onChangeElement, informeInspeccion } = this.props;
    const answers = record ? record.answers : null;

    return (
      <Pregunta
        key={`question_${record.index}_${question.questionId}`}
        onChangeElement={onChangeElement}
        answer={(answers || []).filter(answer => answer.questionId === question.questionId)}
        question={{ ...question, reload: true }}
        updateQuestion={this.updateQuestion}
        informeInspeccion={informeInspeccion}
      />
    );
  }
}
