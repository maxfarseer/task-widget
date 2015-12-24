import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router'
import { bindActionCreators } from 'redux';
import * as WidgetActions from '../actions/WidgetActions';

import Widget from '../components/Widget';

class MainPage extends Component {
  render() {
    const { dispatch, widget, user } = this.props;
    const actions = bindActionCreators(WidgetActions, dispatch);
    return (
      <div>
        <Widget actions={actions} widget={widget} user={user} />
      </div>
    )
  }
}

function select(state) {
  return {
    widget: state.app.widget,
    user: state.app.user
  };
}

export default connect(select)(MainPage);
