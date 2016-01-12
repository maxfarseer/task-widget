import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router'
import { bindActionCreators } from 'redux';
import * as WidgetActions from '../actions/WidgetActions';

import Widget from '../components/Widget';

class MainPage extends Component {
  render() {
    const { dispatch, widget, user } = this.props;
    return (
      <div>
        <Widget actions={this.props.actions} widget={widget} user={user} />
      </div>
    )
  }
}

MainPage.propTypes = {
  widget: PropTypes.object,
  user: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    widget: state.app.widget,
    user: state.app.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
