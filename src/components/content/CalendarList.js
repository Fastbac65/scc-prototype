import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import { Box } from '@mui/system';
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useValue } from '../context/ContextProvider';
import axios from 'axios';

//sample google cal url https://www.googleapis.com/calendar/v3/calendars/fastbac65%40gmail.com/events?key=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&timeMin=2023-01-01T00%3A00%3A00%2B11%3A00&timeMax=2023-02-01T00%3A00%3A00%2B11%3A00&singleEvents=true&maxResults=9999

export const getCalendarEvents = (googleCalColors) => async (info, successCallback, failureCallback) => {
  const googleCalIds = [
    '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com',
    'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com',
    'fastbac65@gmail.com',
  ];

  const start = encodeURIComponent(info.startStr);
  const end = encodeURIComponent(info.endStr);

  var allGetEvents = [];
  var allEvents = [];
  var getPromises = [];

  googleCalIds.forEach((calendarId) => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&timeMin=${start}&timeMax=${end}&singleEvents=true&maxResults=999`;
    try {
      getPromises.push(axios.get(url));
    } catch (error) {
      console.log(error.message);
      failureCallback(new Error(error.message || 'Something went wrong.'));
    }
  });
  allGetEvents = await Promise.all(getPromises);

  allGetEvents.forEach((response, indx) => {
    var events = [];

    if (response.status === 200) {
      events = response.data.items.map((event) => ({
        //
        id: event?.id,
        title: event?.summary,
        location: event?.location,
        description: event?.description,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
        created: event?.created,
        creator: event?.creator,
        borderColor: googleCalColors[indx],
      }));
      allEvents = [...allEvents, ...events];
    }
  });

  console.log(allEvents);
  successCallback(allEvents);
};

// const CalendarList = () => {
const CalendarList = ({ holidays, important, patrolTraining, social }) => {
  const { theme } = useValue();

  const googleCalColors = [
    `${theme.palette.info.main}`,
    `${theme.palette.success.main}`,
    `${theme.palette.error.main}`,
  ];
  const allEvents = useRef([]); // Will be a copy of all events so we can filter

  // responsive workaround for buttons on the FC header
  const [endStr, setEndStr] = useState('');
  const [startStr, setStartStr] = useState('');
  // const screenWidth = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1400 };  //  for some reason the app is still using default breakpoints
  const screenWidth = { xs: 0, sm: 700, md: 900, lg: 1200 }; // sm default is 600  but I'm using 700 to fit filter in

  // to stop FC rerendering and re-fetching events everytime a state change occurs on the page
  const memoizeGetCalendarEvents = useMemo(() => {
    return getCalendarEvents(googleCalColors);
  }, []);

  const googleCalIds = [
    '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com',
    'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com',
    'fastbac65@gmail.com',
  ];

  useEffect(() => {
    console.log('useEffect');

    if (!holidays) {
      allEvents.current.forEach((event) => {
        // if (event?.borderColor === `${theme.palette.info.main}`) {
        if (event?.extendedProps?.creator?.email === '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com') {
          event.setProp('display', 'none');
        }
      });
    } else if (holidays) {
      allEvents.current.forEach((event) => {
        // if (event?.borderColor === `${theme.palette.info.main}`) {
        if (event?.extendedProps?.creator?.email === '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com') {
          event.setProp('display', 'auto');
        }
      });
    }
  }, [holidays]);

  useEffect(() => {
    console.log('useEffect');

    if (!important) {
      allEvents.current.forEach((event) => {
        if (event?.extendedProps?.creator?.email === 'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com') {
          // if (event.borderColor === `${theme.palette.success.main}`) {
          event.setProp('display', 'none');
        }
      });
    } else if (important) {
      allEvents.current.forEach((event) => {
        if (event?.extendedProps?.creator?.email === 'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com') {
          // if (event.borderColor === `${theme.palette.success.main}`) {
          event.setProp('display', 'auto');
        }
      });
    }
  }, [important]);

  useEffect(() => {
    if (!patrolTraining) {
      allEvents.current.forEach((event) => {
        // if (event.borderColor === `${theme.palette.error.main}`) {
        if (event?.extendedProps?.creator?.email === 'fastbac65@gmail.com') {
          event.setProp('display', 'none');
        }
      });
    } else if (patrolTraining) {
      allEvents.current.forEach((event) => {
        // if (event.borderColor === `${theme.palette.error.main}`) {
        if (event?.extendedProps?.creator?.email === 'fastbac65@gmail.com') {
          event.setProp('display', 'auto');
        }
      });
    }
  }, [patrolTraining]);

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

  function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setTimeout(() => {
          setSize(window.innerWidth);
          if (window.innerWidth < screenWidth.sm) {
            setStartStr('');
            setEndStr('prev,next');
          } else {
            setStartStr('listMonth,list3Months');
            setEndStr('today prev,next');
          }
        }, 500);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  var winWidth = useWindowSize(); // dynamically sets the calendar list menu statefully
  if (winWidth < screenWidth.sm) console.log('win < sm');
  else console.log('win > sm');

  const handleEventSet = (events) => {
    allEvents.current = [...events];
  };

  const handleEventClick = (eventInfo) => {
    eventInfo.jsEvent.preventDefault();
    console.log(eventInfo, eventInfo.event.title);
    var eventObj = eventInfo.event;
  };

  // const handleEventSourceSuccess = (rawEvents, response) => {
  //   // clearing the google url - cleans the UI
  //   rawEvents.forEach((event) => {
  //     event.url = '';
  //   });
  // };

  const handleEventDidMount = (calEventInfo) => {
    if (!holidays) {
      // if (calEventInfo?.borderColor === `${theme.palette.info.main}`) {
      if (
        calEventInfo.event?.extendedProps?.creator?.email ===
        '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com'
      ) {
        calEventInfo.event.setProp('display', 'none');
      }
    }
    if (!important) {
      // if (calEventInfo?.borderColor === `${theme.palette.success.main}`) {
      if (
        calEventInfo.event?.extendedProps?.creator?.email ===
        'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com'
      ) {
        calEventInfo.event.setProp('display', 'none');
      }
    }
    if (!patrolTraining) {
      // if (calEventInfo?.borderColor === `${theme.palette.error.main}`) {
      if (calEventInfo.event?.extendedProps?.creator?.email === 'fastbac65@gmail.com') {
        calEventInfo.event.setProp('display', 'none');
      }
    }
  };

  // className wrapper is used to override FC defauls CSS styles to SCC colors and work better with dark mode
  return (
    <div>
      <Box component='div' className='wrapper'>
        <FullCalendar
          height='auto'
          // plugins={[listPlugin, interactionPlugin, googleCalendarPlugin]}
          plugins={[listPlugin, googleCalendarPlugin]}
          googleCalendarApiKey='AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM'
          // events={getCalendarEvents}
          eventSources={[eventsTest, memoizeGetCalendarEvents]}
          initialView='list3Months'
          views={{
            listMonth: { buttonText: 'month' },
            list3Months: { type: 'listMonth', duration: { months: 3 }, buttonText: '3 months' },
            listYear: { buttonText: 'Year' },
          }}
          headerToolbar={{
            start: startStr,
            center: 'title',
            end: endStr,
          }}
          titleFormat={{ year: 'numeric', month: 'short' }}
          eventClick={handleEventClick}
          eventsSet={handleEventSet} // called after events are initialized/added/changed/removed
          // eventSourceSuccess={handleEventSourceSuccess}
          eventDidMount={handleEventDidMount}
        />
      </Box>
    </div>
  );
};
export default memo(CalendarList);
//
