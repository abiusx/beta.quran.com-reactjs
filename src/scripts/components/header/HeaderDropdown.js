import React from 'react';
import $ from 'jquery';
import {DropdownMenu} from 'react-bootstrap';
import classNames from 'classnames';

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDropdownClick(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });

    // When the dropdown is open, monitor clicks to close
    $(document).on('click.dropdownOpen', (e) => {
      if ($(React.findDOMNode(this)).has(e.target).length === 0) {
        this.setState({
            open: false
        });
        $(document).off('click.dropdownOpen');
      }
    });
  }

  render() {

    var classes = classNames({
      'open': this.state.open,
      'col-md-2': true,
      'col-xs-10': true,
      'dropdown': true,
      'dropdownChange': true,
      'full-height': true,
      'text-left': true,
      'border-right': true
    }) + ' ' + this.props.className;

    return (
      <div className={classes} dropdown>
        <a className="dropdown-toggle" onClick={this.handleDropdownClick.bind(this)}>
          <i className={this.props.linkIcon}/> {this.props.linkContent}
          {this.state.open ?
            <i className="ss-icon ss-directup pull-right"/> :
            <i className="ss-icon ss-dropdown pull-right"/>
          }
        </a>
        <DropdownMenu
                ref="menu"
                aria-labelledby={this.props.id}
                pullRight={this.props.pullRight}
                key={1}>
                {this.props.children}
              </DropdownMenu>
      </div>
    );
  }
}

export default HeaderDropdown;
