import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CalendarList from './content/CalendarList';

import { useState } from 'react';
const Test = () => {
  const [holidays, setHolidays] = useState(true);
  const [important, setImportant] = useState(true);
  const [patrolTraining, setPatrolTraining] = useState(true);
  const [social, setSocial] = useState(true);

  const handleChange = (event) => {
    console.log('clicked', event.target.labels[0].innerText);
    console.log('clicked', event.target.labels[0].innerText);
    console.log(event.target.labels[0].innerText === 'NSW Holidays');

    if (event.target.labels[0].innerText.includes('View')) {
      setHolidays(true);
      setImportant(true);
      setPatrolTraining(true);
      setSocial(true);
    } else if (event.target.labels[0].innerText.includes('NSW')) {
      // } else if (event.target.labels[0].innerText.includes === 'NSW Holidays') {
      console.log('clicked hols');
      setHolidays(!holidays);
    } else if (event.target.labels[0].innerText.includes('Important')) {
      setImportant(!important);
    } else if (event.target.labels[0].innerText.includes('Patrol')) {
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
          <Box sx={{ pt: 1, display: { xs: 'none', md: 'inline' } }}>
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
