import { Box, CardMedia, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CalendarList, { deletedEv } from './content/CalendarList';

import { useValue } from './context/ContextProvider';

import scc1 from '../static/imgs/scc-fb-grp.jpeg';
import insta from '../static/imgs/Instagram-logo-small.png';
import { useRef, useState } from 'react';

const Test = () => {
  const [holidays, setHolidays] = useState(true);
  const [important, setImportant] = useState(true);
  const [patrolTraining, setPatrolTraining] = useState(true);
  const [social, setSocial] = useState(true);

  const handleChange = (event) => {
    if (event.target.labels[0].innerText === 'View All') {
      setHolidays(true);
      setImportant(true);
      setPatrolTraining(true);
      setSocial(true);
    } else if (event.target.labels[0].innerText === 'NSW Holidays') {
      setHolidays(!holidays);
    } else if (event.target.labels[0].innerText === 'Important Dates') {
      setImportant(!important);
    } else if (event.target.labels[0].innerText === 'Patrol/Training') {
      setPatrolTraining(!patrolTraining);
    } else if (event.target.labels[0].innerText === 'Social Events') {
      setSocial(!social);
    }

    event.target = null;
  };

  return (
    <>
      <Container maxWidth='lg' sx={{ px: '6px', textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', my: 3 }}>
          <Box sx={{ pt: 1 }}>
            <FormGroup>
              <Typography sx={{ fontWeight: '700', fontSize: '1.25em' }} variant='h5'>
                Filter
              </Typography>
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={holidays && important && patrolTraining && social} color='primary' />}
                label='View All'
                disabled={holidays && important && patrolTraining && social}
              />
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={holidays} color='info' />}
                label='NSW Holidays'
              />
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={important} color='success' />}
                label='Important Dates'
              />
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={patrolTraining} color='error' />}
                label='Patrol/Training'
              />
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={social} color='warning' />}
                label='Social Events'
              />
            </FormGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <CalendarList holidays={holidays} important={important} patrolTraining={patrolTraining} social={social} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Test;
