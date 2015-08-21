import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WidgetActions from '../actions/WidgetActions';

import Widget from '../components/Widget';

class MainPage extends Component {
  render() {
    const { dispatch, widget } = this.props;
    const actions = bindActionCreators(WidgetActions, dispatch);
    return (
      <div>
        <Widget actions={actions} widget={widget} />
      </div>
    )
  }
}

function select(state) {
  return {
    widget: state.widget
  };
}

export default connect(select)(MainPage);
