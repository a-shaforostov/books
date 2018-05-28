import paper from '../assets/white-paper.jpg';

export default {
  list: {
    width: '30%',
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
  book: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent!important',
    cursor: 'pointer',
    paddingTop: '6px!important',
    paddingBottom: '6px!important',
  },
  bookSel: {
    backgroundColor: 'rgba(255,255,255,0.65)!important',
    // backgroundColor: 'white!important',
    fontWeight: '700',
  },
  isbn: {
    fontSize: '87%',
    marginLeft: '21px',
    opacity: '0.7',
  },
  libName: {
    fontFamily: 'Georgia, Arial, sans-serif',
    fontWeight: 700,
  },
  libAddr: {
    color: '#777',
    margin: '5px 0 10px',
  },
  bookName: {
    transform: 'translateX(0px)',
    fontSize: '100%',
    transition: 'all 500ms ease-out',
    width: 'calc(100% - 25px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  bookNameVisible: {
    position: 'absolute',
    width: 'calc(100% - 135px)',
    transform: 'translateX(110px)',
    fontSize: '130%',
    transition: 'all 500ms ease-in',
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
  bookDetails: {
    display: 'flex',
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: 'opacity 500ms ease-out',
  },
  bookDetailsVisible: {
    display: 'flex',
    opacity: 1,
    height: 'auto',
    transition: 'opacity 500ms ease-in',
  },
  bookImage: {
    height: '150px',
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
    fontWeight: 700,
    marginTop: 0,
    transition: 'all 500ms ease-out',
  },
  bookInfoVisible: {
    marginTop: '30px',
    transition: 'all 500ms ease-in',
  },
  bookData: {
    fontWeight: 400,
    marginBottom: '10px',
  },
  row: {
    marginBottom: '4px',
  },
  footer: {
    margin: '10px 0 0px',
  },
  footerButton: {
    cursor: 'pointer',
    marginRight: '20px!important',
    '&.edit:hover': {
      color: 'green',
    },
    '&.delete:hover': {
      color: 'red',
    },
  },
  deleteBookButton: {
    position: 'absolute',
    bottom: '20px',
    right: '10px',
    '&:hover': {
      color: 'red',
    },
  },
  removeBookButton: {
    position: 'absolute',
    bottom: '20px',
    right: '30px',
    '&:hover': {
      color: 'red',
    },
  },
  editBookButton: {
    position: 'absolute',
    bottom: '20px',
    right: '50px',
    '&:hover': {
      color: 'green',
    },
  },
  bigBookButton: {
    marginTop: '5px!important',
    '&.edit:hover': {
      color: 'green',
    },
    '&.remove:hover': {
      color: 'red',
    },
    '&.delete:hover': {
      color: 'red',
    },
  },
  dropPlace: {
    flexGrow: 0,
    padding: '0 20px',
    fontStyle: 'italic',
    textAlign: 'center',
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
  presenceTitle: {
    marginTop: '5px',
  },
  presence: {
    display: 'flex',
    fontSize: '90%',
    fontWeight: '400',
  },
  presenceName: {
    width: '30px',
    paddingRight: '5px',
    textAlign: 'right',
    color: 'green',
    fontWeight: '700',
  },
};
