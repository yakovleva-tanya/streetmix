import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Menu from './Menu'
import KeyboardKey from '../ui/KeyboardKey'
import {
  ICON_MINUS,
  ICON_PLUS,
  ICON_ARROW_RIGHT,
  ICON_ARROW_LEFT
} from '../ui/icons'
import { registerKeypress, deregisterKeypress } from '../app/keypress'
import { trackEvent } from '../app/event_tracking'
import { showDialog } from '../store/actions/dialogs'
import './HelpMenu.scss'

export class HelpMenu extends Component {
  static propTypes = {
    showDialog: PropTypes.func
  }

  componentDidMount () {
    // Set up keyboard shortcuts
    registerKeypress('?', { shiftKey: 'optional' }, () => this.props.showDialog('ABOUT'))
  }

  componentWillUnmount () {
    deregisterKeypress('?', () => this.props.showDialog('ABOUT'))
  }

  handleShow () {
    trackEvent('Interaction', 'Open help menu', null, null, false)
  }

  render () {
    const shiftKey = (
      <KeyboardKey>
        <FormattedMessage id="key.shift" defaultMessage="Shift" />
      </KeyboardKey>
    )

    return (
      <Menu onShow={this.handleShow} {...this.props}>
        <a href="#" onClick={() => this.props.showDialog('ABOUT')}>
          <FormattedMessage id="menu.item.about" defaultMessage="About Streetmix…" />
        </a>
        <a href="#" onClick={() => this.props.showDialog('WHATS_NEW')}>
          <FormattedMessage id="dialogs.whatsnew.heading" defaultMessage="What’s new in Streetmix? [en]&lrm;" />
        </a>
        <div className="help-menu-shortcuts non-touch-only">
          <p>
            <FormattedMessage id="menu.help.keyboard-label" defaultMessage="Keyboard shortcuts:" />
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  <KeyboardKey>
                    <FormattedMessage id="key.backspace" defaultMessage="Backspace" />
                  </KeyboardKey>
                </td>
                <td>
                  <FormattedMessage
                    id="menu.help.remove-instruction"
                    defaultMessage="Remove a segment you’re pointing at"
                  />
                  <br />
                  <FormattedMessage
                    id="menu.help.remove-shift-instruction"
                    defaultMessage="(hold {shiftKey} to remove all)&lrm;"
                    values={{ shiftKey }}
                  />
                </td>
              </tr>
              <tr>
                <td dir="ltr">
                  {/* <FormattedMessage> used with render prop because we pass the translated
                      text to <KeyboardKey> as a string, not as a component */}
                  <FormattedMessage id="key.minus" defaultMessage="Minus">
                    {(label) => <KeyboardKey icon={ICON_MINUS}>{label}</KeyboardKey>}
                  </FormattedMessage>
                  <FormattedMessage id="key.plus" defaultMessage="Plus">
                    {(label) => <KeyboardKey icon={ICON_PLUS}>{label}</KeyboardKey>}
                  </FormattedMessage>
                </td>
                <td>
                  <FormattedMessage
                    id="menu.help.change-instruction"
                    defaultMessage="Change width of a segment you’re pointing at"
                  />
                  <br />
                  <FormattedMessage
                    id="menu.help.change-shift-instruction"
                    defaultMessage="(hold {shiftKey} for more precision)&lrm;"
                    values={{ shiftKey }}
                  />
                </td>
              </tr>
              <tr>
                <td dir="ltr">
                  <FormattedMessage id="key.left-arrow" defaultMessage="Left arrow">
                    {(label) => <KeyboardKey icon={ICON_ARROW_LEFT}>{label}</KeyboardKey>}
                  </FormattedMessage>
                  <FormattedMessage id="key.right-arrow" defaultMessage="Right arrow">
                    {(label) => <KeyboardKey icon={ICON_ARROW_RIGHT}>{label}</KeyboardKey>}
                  </FormattedMessage>
                </td>
                <td>
                  <FormattedMessage
                    id="menu.help.move-instruction"
                    defaultMessage="Move around the street"
                  />
                  <br />
                  <FormattedMessage
                    id="menu.help.move-shift-instruction"
                    defaultMessage="(hold {shiftKey} to jump to edges)&lrm;"
                    values={{ shiftKey }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Menu>
    )
  }
}

const mapDispatchToProps = {
  showDialog
}

export default connect(null, mapDispatchToProps)(HelpMenu)
