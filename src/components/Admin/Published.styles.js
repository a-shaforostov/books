import paper from '../../assets/white-paper.jpg';

export default {
  list: {
    width: '100%',
  },
  header: {
    color: 'white!important',
    textShadow: '3px 3px 3px rgba(0,0,0,0.50)',
    marginBottom: '10px!important',
  },
  group: {
    display: 'flex',
    margin: '1em 0 !important',
    backgroundImage: `url(${paper})`,
    height: 'calc(100% - 25px)',
    borderRadius: '0!important',
  },
  interior: {
    overflowX: 'hidden',
    overflowY: 'auto',
    flexGrow: 1,
  },
  interiorEmpty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '2px dotted brown',
  },
  addBook: {
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'all 500ms',
    '&:hover': {
      backgroundColor: '#d4a16387!important',
      transition: 'all 500ms',
    },
  },

};
