'use strict';

import React from 'react';
import request from 'superagent';
import Settings from 'constants/Settings';
// import Icon from 'icon';
import HeaderDropdown from './HeaderDropdown';
import UserOptionsStore from 'stores/UserOptionsStore';
// import AyatActions from 'actions/AyatActions';
import {MenuItem} from 'react-bootstrap';

class ReciterDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    request.get(Settings.url + 'options/audio')
    .end(function(err, res) {
        this.setState({
            options: res.body
        });
    }.bind(this));
  }

  chosenOption(id, e) {
    e.preventDefault();

    this.context.dispatcher
        .getStore(UserOptionsStore).setSingleOption('audio', id);

    // AyatActions.updateAyahs(this.context.dispatcher);
  }

  renderMenu() {
    return this.state.options.map((option) => {
      return (
        <MenuItem eventKey={option.name.english}
                  onClick={this.chosenOption.bind(this, option.id)}
                  key={option.id}>
          {option.name.english}
        </MenuItem>
      );
    });
  }

  render() {
    return (
        <HeaderDropdown linkContent="Reciter" linkIcon="ss-icon ss-highvolume" className="reciter-dropdown">
            {this.renderMenu()}
        </HeaderDropdown>
    );
  }
}

export default ReciterDropdown;
