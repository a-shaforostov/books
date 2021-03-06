/**
 * Component. Chat with bot
 * @file
 */

import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import stepElements from './steps';
import QRModal from '../forms/QRModal';

import { Input } from 'semantic-ui-react';

import botImage from '../../assets/bot.png';
import styles from './Chat.styles';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      dialogLength: 0,
    };
    this.myRef = React.createRef();
  }

  handleChange = (e, { value }) => {
    this.setState({ input: value });
  };

  handleKeyUp = (e) => {
    if (e.keyCode !== 13) {
      return;
    }

    const value = this.state.input;
    const step = this.props.currentStep;
    switch (step) {
      case 'startBook':
        this.props.findBooks({ criteria: value });
        break;
      default:
        this.props.justTextStep({ value });
    }
    this.setState({ input: '' });
  };

  scrollToBottom(el, scrollDuration) {
    let saveTop = 0;
    const scrollStep = (el.scrollHeight - el.scrollTop - el.clientHeight) / (scrollDuration / 15);
    const scrollInterval = setInterval(function(){
      if ( el.scrollTop < el.scrollHeight - el.clientHeight - 1 ) {
        if (saveTop <= el.scrollTop) {
          el.scrollTop += scrollStep;
          saveTop = el.scrollTop
        } else {
          // if user scrolls to top
          clearInterval(scrollInterval);
        }
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }

  componentDidUpdate(prevProps) {
    if (this.state.dialogLength !== this.props.dialog.length) {
      if (this.myRef.current) {
        this.scrollToBottom(this.myRef.current, 500);
        this.setState({ dialogLength: this.props.dialog.length });
      }
    }
  };

  componentDidMount() {
    const updateBooksState = () => {
      this.forceUpdate();
    };

    this.interval = setInterval(updateBooksState, 5000);

    if (this.myRef.current)
      this.scrollToBottom(this.myRef.current, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { myPosition, showAllLibsStep, showRegLibsStep, showOneLib, reRenderKey, classes, dialog, stepId, greetStep, stopStep, startBookStep, reserve, reserveBookRequest, books } = this.props;

    return (
      <div className={classes.chat} key={reRenderKey}>
        <div className={classes.bot}>
          <img src={botImage} alt="bot"/>
        </div>
        <div className={classes.under} />
        <div className={classes.wrapper}>
          <div className={classes.top}>Доброго дня! Чим можу допомогти?</div>
          <div className={classes.interior} ref={this.myRef}>
            <div className={classes.content} id="dialogContent">
              {
                dialog.map(message => {
                  return (
                    <div
                      key={message.id}
                      className={classnames({
                        // [classes.content]: true,
                        [classes.contentBot]: message.author === 'bot',
                        [classes.contentGuest]: message.author === 'guest',
                      })}
                    >
                      <div
                        className={classnames({
                          [classes.time]: true,
                          [classes.timeBot]: message.author === 'bot',
                          [classes.timeGuest]: message.author === 'guest',
                        })}
                      >
                        {message.time} {message.author === 'bot' ? 'Бот' : 'Ви'}
                      </div>
                      <div
                        className={classnames({
                          [classes.text]: true,
                          [classes.textBot]: message.author === 'bot',
                          [classes.textGuest]: message.author === 'guest',
                        })}
                      >
                        {
                          message.type
                            ?
                            stepElements[message.type]({
                              signals: {
                                greetStep,
                                stopStep,
                                startBookStep,
                                reserveBookRequest,
                                showAllLibsStep,
                                showRegLibsStep,
                                showOneLib,
                              },
                              isActive: message.id === stepId,
                              data: message.data,
                              books,
                              myPosition,
                            })
                            :
                            message.content
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div>
            <label htmlFor="chatInput"></label>
            <Input
              id="chatInput"
              className={classes.inputRow}
              value={this.state.input}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              placeholder="Введіть текст та натисніть Enter"
              label=">"
              labelPosition="left"
            />
            <QRModal id={reserve.id} name={reserve.name} libName={reserve.libName} />

          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  {
    books: state`data.books`,
    dialog: state`publicModule.dialog`,
    stepId: state`publicModule.currentStepId`,
    currentStep: state`publicModule.currentStep`,
    reserve: state`publicModule.reserve`,
    myPosition: state`publicModule.myPosition`,
    greetStep: signal`publicModule.greetStep`,
    stopStep: signal`publicModule.stopStep`,
    startBookStep: signal`publicModule.startBookStep`,
    findBooks: signal`publicModule.findBooks`,
    justTextStep: signal`publicModule.justTextStep`,
    showAllLibsStep: signal`publicModule.showAllLibsStep`,
    showRegLibsStep: signal`publicModule.showRegLibsStep`,
    showOneLib: signal`publicModule.showOneLib`,
    reserveBookRequest: signal`publicModule.reserveBookRequest`,
  },
  injectSheet(styles)(Chat),
);
