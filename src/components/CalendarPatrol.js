import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import CalendarList from './content/CalendarList';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygrid from '@fullcalendar/daygrid';
import { useValue } from './context/ContextProvider';

const CalendarPatrol = () => {
  const [holidays, setHolidays] = useState(true);
  const [important, setImportant] = useState(false);
  const [patrolTraining, setPatrolTraining] = useState(true);
  const [social, setSocial] = useState(false);
  const { theme, allCalEvents } = useValue();

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
  const googleCalColors = [
    `${theme.palette.info.main}`,
    `${theme.palette.secondary.main}`,
    `${theme.palette.error.main}`,
    `${theme.palette.success.main}`,
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
      <Box sx={{ display: 'flex', py: 1 }}>
        <Box sx={{ minWidth: 250, mx: 2, pt: 1, display: { xs: 'none', sm: 'inline' } }}>
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
          <Box
            className='wrapper'
            sx={{
              mt: 2,
              p: 1,
              background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.1)',
              borderRadius: 2,
            }}
          >
            <FullCalendar
              // plugins={[listPlugin, interactionPlugin, googleCalendarPlugin]}
              plugins={[daygrid]}
              firstDay={1}
              // height={'auto'}
              aspectRatio={0.74}
              // googleCalendarApiKey='AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM'
              // events={calEvents}
              eventSources={[eventsTest, allCalEvents.current]}
              // eventSources={[eventsTest, memoizeGetCalendarEvents]}
              initialView='dayGridMonth'
              headerToolbar={{
                start: 'prev',
                center: 'title',
                end: 'next',
              }}
              dayHeaderFormat={{ weekday: 'narrow' }}
              titleFormat={{ month: 'short', year: 'numeric' }}
              // eventClick={handleEventClick}
              // eventsSet={handleEventSet} // called after events are initialized/added/changed/removed
              // // eventSourceSuccess={handleEventSourceSuccess}
              // eventDidMount={handleEventDidMount}
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <CalendarList holidays={holidays} important={important} patrolTraining={patrolTraining} social={social} />
        </Box>
      </Box>
    </>
  );
};

export default CalendarPatrol;

// useEffect(() => {
//   getCalendarEvents(googleCalColors, setCalEvents);
//   console.log('getting cals');
// }, []);

// async function getCalendarEvents(successCallback) {
//   const googleCalColors = [
//     `${theme.palette.info.main}`,
//     `${theme.palette.secondary.main}`,
//     `${theme.palette.error.main}`,
//     `${theme.palette.success.main}`,
//   ];

//   const googleCalIds = [
//     '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com',
//     'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com',
//     'fastbac65@gmail.com',
//     'jcog90oln2bbrgi9kgrie57q93gr74fn@import.calendar.google.com',
//   ];

//   const start = encodeURIComponent(new Date().toISOString());
//   // const end = encodeURIComponent(info.endStr);
//   // little util to get a date 9months from now
//   const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
//   const addMonths = (input, months) => {
//     const date = new Date(input);
//     date.setDate(1);
//     date.setMonth(date.getMonth() + months);
//     date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth() + 1)));
//     return date;
//   };

//   const newEndDate = encodeURIComponent(addMonths(new Date(), 12).toISOString());

//   var allGetEvents = [];
//   var allEvents = [];
//   var getPromises = [];

//   googleCalIds.forEach((calendarId) => {
//     const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&timeMin=${start}&timeMax=${newEndDate}&singleEvents=true&maxResults=999`;
//     try {
//       getPromises.push(axios.get(url));
//     } catch (error) {
//       console.log(error.message);
//       // failureCallback(new Error(error.message || 'Something went wrong.'));
//     }
//   });
//   allGetEvents = await Promise.all(getPromises);

//   allGetEvents.forEach((response, indx) => {
//     var events = [];

//     if (response.status === 200) {
//       events = response.data.items.map((event) => ({
//         //
//         id: event?.id,
//         title: event?.summary,
//         location: event?.location,
//         description: event?.description,
//         start: event.start?.dateTime || event.start?.date,
//         end: event.end?.dateTime || event.end?.date,
//         created: event?.created,
//         creator: event?.creator,
//         borderColor: googleCalColors[indx],
//         backgroundColor: googleCalColors[indx],
//       }));
//       allEvents = [...allEvents, ...events];
//     }
//   });

//   console.log(allEvents);
//   successCallback([...allEvents]);
// }
