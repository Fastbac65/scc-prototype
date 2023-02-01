import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CalendarList from './content/CalendarList';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import daygrid from '@fullcalendar/daygrid';
import { useValue } from './context/ContextProvider';

const CalendarPatrol = () => {
  const [holidays, setHolidays] = useState(true);
  const [important, setImportant] = useState(false);
  const [patrolTraining, setPatrolTraining] = useState(true);
  const [social, setSocial] = useState(false);
  const { theme } = useValue();

  const eventsTest = [
    {
      title: 'Commitee Meeting',
      start: '2023-01-23T19:00:00',
      allDay: 'true',
      discription: 'this is a description',
      extendedProps: {
        status: 'done',
      },
      backgroundColor: 'green',
      borderColor: 'green',
      url: 'https://www.google.com',
    },

    {
      title: 'Sippers',
      start: '2023-01-25T20:00:00',
      discription: 'this is a description',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
      eventColor: 'green',
      textColor: 'green',
    },
    {
      title: 'Cleaning',
      start: '2023-01-25T11:00:00',
      discription: 'this is a description',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: 'orange',
    },
    {
      title: 'Sippers setup',
      start: '2023-01-25T19:00:00',
      discription: 'this is a description',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: 'Wedding Party',
      start: '2023-01-28T19:00:00',
      discription: 'this is a description',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: '21st Birthday Party',
      start: '2023-01-30T19:00:00',
      discription: 'this is a description',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: 'Commitee Meeting',
      start: '2023-02-23T19:00:00',
      extendedProps: {
        status: 'done',
      },
      backgroundColor: 'green',
      borderColor: 'green',
    },
    {
      title: '21st Birthday Party',
      start: '2023-02-25T19:00:00',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: 'Wedding Party',
      start: '2023-02-28T19:00:00',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: '21st Birthday Party',
      start: '2023-02-30T19:00:00',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: 'Commitee Meeting',
      start: '2023-03-23T19:00:00',
      extendedProps: {
        status: 'done',
      },
      backgroundColor: 'green',
      borderColor: 'green',
    },
    {
      title: '21st Birthday Party',
      start: '2023-04-25T19:00:00',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: 'Wedding Party',
      start: '2023-05-28T19:00:00',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
    {
      title: '21st Birthday Party',
      start: '2023-05-30T19:00:00',
      backgroundColor: `${theme.palette.warning.main}`,
      borderColor: `${theme.palette.warning.main}`,
    },
  ];

  const handleChange = (event) => {
    if (event.target.labels[0].innerText.includes('View')) {
      setHolidays(true);
      setImportant(true);
      setPatrolTraining(true);
      setSocial(true);
    } else if (event.target.labels[0].innerText.includes('NSW')) {
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
      {/* <Container maxWidth='lg' sx={{ px: '6px', textAlign: 'center', justifyContent: 'center' }}> */}

      <Box sx={{ display: 'flex', py: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={0} md={3}>
            <Box className='wrapper' sx={{ pt: 1, display: { xs: 'none', sm: 'inline' } }}>
              <FullCalendar
                // plugins={[listPlugin, interactionPlugin, googleCalendarPlugin]}
                plugins={[daygrid]}
                // height={'auto'}
                aspectRatio={0.9}
                googleCalendarApiKey='AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM'
                // events={getCalendarEvents}
                eventSources={[eventsTest]}
                // eventSources={[eventsTest, memoizeGetCalendarEvents]}
                initialView='dayGridMonth'
                // views={{
                //   listMonth: { buttonText: 'month' },
                //   list3Months: { type: 'listMonth', duration: { months: 3 }, buttonText: '3 months' },
                //   listYear: { buttonText: 'Year' },
                // }}
                headerToolbar={{
                  start: 'prev',
                  center: 'title',
                  end: 'next',
                }}
                dayHeaderFormat={{ weekday: 'narrow' }}
                titleFormat={{ month: 'short' }}
                // eventClick={handleEventClick}
                // eventsSet={handleEventSet} // called after events are initialized/added/changed/removed
                // // eventSourceSuccess={handleEventSourceSuccess}
                // eventDidMount={handleEventDidMount}
              />
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
          </Grid>
          <Grid item xs={12} md={9}>
            <CalendarList holidays={holidays} important={important} patrolTraining={patrolTraining} social={social} />
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1 }}></Box>
      </Box>
      {/* </Container> */}
    </>
  );
};

export default CalendarPatrol;
