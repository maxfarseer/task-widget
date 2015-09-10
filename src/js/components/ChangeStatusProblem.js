import React, { PropTypes, Component } from 'react';

export default class ChangeStatusProblem extends Component {

  render() {
    const {task_id} = this.props;
    const url = `https://redmine.kama.gs/issues/${task_id}`;

    return (
      <div>
        <div>
          Невыполнены условия для перевода статуса.
        </div>
        <div>
          <a href={url} className={'js-change-status'} target='_blank'>Подробнее</a>
        </div>
      </div>
    );
  }
}
