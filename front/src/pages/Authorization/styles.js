export default {
  page: {
    backgroundColor: 'background.default',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    py: {
      xs: '60px',
      md: '100px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '450px',
    p: 4,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flexGrow: 1,
    mt: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}
