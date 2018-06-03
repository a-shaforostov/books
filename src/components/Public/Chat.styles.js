import sheet from '../../assets/sheet.png';

export default {
  chat: {
    height: '100%',
  },
  bot: {
    position: 'absolute',
    top: '-50px',
    left: '-20px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: '100%',
    boxShadow: '2px 4px 13px -2px #000000b3',
  },
  under: {
    backgroundImage: `url(${sheet})`,
    height: '100%',
    position: 'absolute',
    transform: 'rotateZ(-2deg)',
    left: '-43px',
    top: '-19px',
    zIndex: '-1',
    width: '100%',
  },
  top: {
    height: '46px',
    textAlign: 'center',
    lineHeight: '46px',
  },
  interior: {
    flexGrow: '1',
    overflowY: 'auto',
    padding: '0 10px',
  },
  inputRow: {
    width: 'calc(100% + 10px)',
    margin: '10px -5px',
    border: '1px solid brown',
    borderRadius: '3px',
  },
  content: {
    margin: '20px 0 5px',
  },
  contentBot: {
    paddingRight: '15%',
    position: 'relative',
    margin: '20px 0 5px',
  },
  contentGuest: {
    paddingLeft: '15%',
    position: 'relative',
    margin: '20px 0 5px',
  },
  time: {
    position: 'absolute',
    top: '-8px',
    fontSize: '80%',
    padding: '0px 5px',
  },
  timeBot: {
    left: 0,
    backgroundColor: 'aliceblue',
    border: '1px solid lightseagreen',
  },
  timeGuest: {
    left: '15%',
    backgroundColor: 'blanchedalmond',
    border: '1px solid lightcoral',
  },
  text: {
    padding: '15px 10px 10px',
    borderRadius: '7px',
  },
  textBot: {
    backgroundColor: 'aliceblue',
    border: '1px solid lightseagreen',
  },
  textGuest: {
    backgroundColor: 'blanchedalmond',
    border: '1px solid lightcoral',
  },
};
