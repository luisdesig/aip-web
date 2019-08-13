import React from 'react';
import {
    FieldContainer,
    ColForm,
    RowForm,
    BadgeForm,
    SkeletonForm
} from '../../../../../components/Util/util.style';
import Progress from '../../../../../components/Progress/Progress';
import { scoringLegend } from '../../../../../services/constants';

export default class Grupos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        const { informeInspeccion } = this.props;
        this.props.getScoring({ ideinformeinspeccion: informeInspeccion.ideinformeinspeccion })
    }
    render() {
        const {
            scoring
        } = this.props;
        const {

        } = this.state;
        if (!Array.isArray(scoring.scoring) || scoring.scoring.length === 0) {
            return (<SkeletonForm active />)
        } else {
            return (
                <FieldContainer>
                    <RowForm gutter={18}>
                        <ColForm sm={24} lg={16}>
                            {
                                scoring.scoring.map((item, index) => {
                                    let res = Object.values(item)
                                    return (
                                        res.map((item2, index2) => {
                                            return (
                                                <Progress
                                                    name={item2.name}
                                                    color={item2.scoring.color}
                                                    value={item2.scoring.value}
                                                    key={index2} />
                                            )
                                        })
                                    )

                                })
                            }
                        </ColForm>
                        <ColForm sm={24} lg={8}>
                            <RowForm>Leyenda</RowForm>
                            {
                                scoringLegend.map((item, index) => {
                                    return (
                                        <div style={{ textAlign: 'left', paddingLeft: 50 }} key={index}>
                                            <BadgeForm color={item.color} text={item.description} />
                                        </div>
                                    )
                                })
                            }
                        </ColForm>
                    </RowForm>
                </FieldContainer>
            )
        }
    };
}
