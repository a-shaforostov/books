import paper from '../../assets/white-paper.jpg';

export default {
  list: {
    width: '50%',
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
  addLibrary: {
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'all 500ms',
    '&:hover': {
      backgroundColor: '#d4a16387!important',
      transition: 'all 500ms',
    },
  },
  library: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
    paddingTop: '6px!important',
    paddingBottom: '6px!important',
    '&:hover': {
      backgroundColor: '#d4a16387!important',
      transition: 'all 500ms',
    }
  },
  librarySel: {
    backgroundColor: '#d4a16387!important',
    fontWeight: '700',
  },
  name: {
    width: '95%',
  },
  interior: {
    overflowX: 'hidden',
    overflowY: 'auto',
    flexGrow: 1,
    margin: '10px',
  },
  '@global .ui.segments:not(.horizontal) .segment:first-child': {
    borderTop: 'none',
    marginTop: '0em',
    bottom: 0,
    marginBottom: 0,
    top: 0,
  },
  '@global .ui.segments .segment': {
    top: 0,
    bottom: 0,
    borderRadius: 0,
    margin: 0,
    width: 'auto',
    boxShadow: 'none',
    border: 'none',
    borderTop: '1px solid rgba(34, 36, 38, 0.15)',
  },
};
