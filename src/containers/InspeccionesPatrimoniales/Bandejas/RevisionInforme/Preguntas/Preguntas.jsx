import React from 'react';
import { FieldContainer } from '../../../../../components/Util/util.style';
import Reactotron from 'reactotron-react-js';
import Pregunta from '../Pregunta/Pregunta';

export default class Preguntas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { section } = this.props;
    if (!Array.isArray(section.questions) || section.questions.length === 0) {
      return null;
    }
    return this.renderLista(section.questions);
  }

  renderLista = questions => {
    const { updateQuestion, informeInspeccion, answers } = this.props;

    return (
      <FieldContainer>
        {questions.map((question, i) => {
          return (
            <Pregunta
              key={i}
              question={question}
              informeInspeccion={informeInspeccion}
              updateQuestion={updateQuestion}
              answer={answers.filter(answer => answer.questionId === question.questionId)}
            />
          );
        })}
      </FieldContainer>
    );
  };
}
