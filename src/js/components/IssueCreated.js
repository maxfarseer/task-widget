import React, { PropTypes, Component } from 'react'
import { API_ROOT } from '../constants/Secret'

export default class IssueCreated extends Component {

  render() {
    const { visible, id } = this.props

    return (
      <div className={'stripe-wrapper stripe-wrapper_created ' + (visible ? '' : 'stripe-wrapper_invisible')}>
        <div className='badge badge_success'></div>
        <div className='stripe cf'>
          <div className='stripe__left'>
            <a href={`${API_ROOT}/issues/${id}`} className='stripe__link' target='_blank'>Issue created</a>
          </div>
          <div className='stripe__right'>
            <i
              className='fa fa-close'
              onClick={this.props.onCloseBtnClick}>
            </i>
          </div>
        </div>
      </div>
    )
  }
}

IssueCreated.propTypes = {
  visible: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onCloseBtnClick: PropTypes.func.isRequired
}

