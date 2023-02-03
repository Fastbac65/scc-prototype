<Box sx={{ flexGrow: 1 }} m={5} py={{ xs: 3, md: 6 }}>
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {Array.from(Array(3)).map((element, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <Item>xs=2</Item>
      </Grid>
    ))}
  </Grid>
</Box>;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

<Box border={0}>
  <ButtonGroup>
    <Button
      sx={{ fontSize: '12px' }}
      size='small'
      component={RouterLink}
      to='/blog'
      variant='contained'
      color='info'
      endIcon={<KeyboardArrowRight />}
    >
      Blog
    </Button>
    <Button
      sx={{ fontSize: '12px' }}
      size='small'
      component={RouterLink}
      to='/patrol'
      variant='contained'
      color='primary'
      endIcon={<KeyboardArrowRight />}
    >
      Training
    </Button>
  </ButtonGroup>
  <Button sx={{ fontSize: '12px' }} size='small' variant='text' color='success' endIcon={<KeyboardArrowRight />}>
    Yes
  </Button>
  <ButtonGroup sx={{ fontSize: '10px' }}>
    <Button sx={{ fontSize: '10px' }} size='small' variant='outlined' color='error' endIcon={<KeyboardArrowRight />}>
      Yes
    </Button>
    <Button sx={{ fontSize: '10px' }} size='small' variant='outlined' color='warning' endIcon={<KeyboardArrowRight />}>
      Yes
    </Button>
    <Button sx={{ fontSize: '10px' }} size='small' variant='outlined' color='info' endIcon={<KeyboardArrowRight />}>
      Yes
    </Button>
  </ButtonGroup>
</Box>;

{
  /* <Container sx={{border: 1, flexGrow: 1}} pb={1}  maxWidth='100%'> */
}
<Grid container spacing={2} mt={1} justifyContent='space-between'>
  <Grid item xs={12} sm={5} backgroundColor='#f6f6f6' borderRadius={1} boxShadow={2}>
    <Typography variant='body2' color='info.dark'>
      Hello from planet earth.
      <Button variant='contained' color='primary' endIcon={<KeyboardArrowRight />}>
        Yes
      </Button>
    </Typography>
    <Button variant='contained' color='info' endIcon={<KeyboardArrowRight />}>
      Yes
    </Button>
  </Grid>
  <Grid item xs={12} sm={6} backgroundColor='#f6f6f6' display='flex' alignItems='center' borderRadius={1} boxShadow={4}>
    <Typography variant='body2'>
      Hello
      <Button variant='contained' color='info' endIcon={<KeyboardArrowRight />}>
        Yes
      </Button>
    </Typography>
    <MediaCard />
  </Grid>
</Grid>;

<Box sx={{ width: 360 }}>
  <br></br>
  <Paper elevation={4}>
    <List aria-label='main mailbox folders'>
      <ListItemLink to='/' primary='Home' icon={<InboxIcon />} />
      <ListItemLink to='/patrol' primary='Patrol' icon={<DraftsIcon />} />
    </List>
    <Divider />
    <List aria-label='secondary mailbox folders'>
      <ListItemLink to='/booking' primary='Venue Hire' />
      <ListItemLink to='/history' primary='History' />
    </List>
  </Paper>
</Box>;
