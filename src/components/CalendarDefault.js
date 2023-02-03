import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CalendarList from './content/CalendarList';

import { useState } from 'react';
import CalendarVenueHire from './content/CalendarVenueHire';

const CalendarDefault = () => {
  const [holidays, setHolidays] = useState(true);
  const [important, setImportant] = useState(true);
  // const [patrolTraining, setPatrolTraining] = useState(false);
  const [social, setSocial] = useState(true);

  const handleChange = (event) => {
    if (event.target.labels[0].innerText.includes('View')) {
      setHolidays(true);
      setImportant(true);
      // setPatrolTraining(true);
      setSocial(true);
    } else if (event.target.labels[0].innerText.includes('NSW')) {
      setHolidays(!holidays);
    } else if (event.target.labels[0].innerText.includes('Important')) {
      setImportant(!important);
      // } else if (event.target.labels[0].innerText.includes('Patrol')) {
      //   setPatrolTraining(!patrolTraining);
    } else if (event.target.labels[0].innerText === 'Social Events') {
      setSocial(!social);
    }

    event.target = null;
  };

  return (
    <>
      <Container maxWidth='lg' sx={{ px: '6px', textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', py: 1 }}>
          <Box sx={{ pt: 1, display: { xs: 'none', sm: 'inline' } }}>
            <FormGroup>
              <Typography sx={{ fontWeight: '700', fontSize: '1.25em' }} variant='h5'>
                Filter
              </Typography>
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={holidays && important && social} color='primary' />}
                label='View All'
                disabled={holidays && important && social}
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
              {/* <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={patrolTraining} color='error' />}
                label='Patrol/Training'
              /> */}
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox checked={social} color='warning' />}
                label='Social Events'
              />
            </FormGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <CalendarVenueHire
              holidays={holidays}
              important={important}
              // patrolTraining={patrolTraining}
              social={social}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CalendarDefault;
