import { Box, Button, DialogActions, DialogContent, DialogContentText, Grid } from '@mui/material';
import { CalendarMonth, Circle, Description, Place } from '@mui/icons-material';
import moment from 'moment';

const CalEvent = ({ eventInfo }) => {
  if (eventInfo?.extendedProps.description) {
    var description = [];
    var atag = '<a></a>'; // initialise to something
    if (eventInfo.extendedProps.description.includes('</a>')) {
      atag = '<a' + eventInfo.extendedProps.description.split('<a')[1].split('</a>')[0] + '</a>';
    }
    var descriptionFormatted = eventInfo.extendedProps.description.split(atag);
    var newstring = '';
    descriptionFormatted.forEach((str) => {
      newstring = newstring + str;
    });
    if (newstring.includes('</a>')) {
      //  another bloody atag
      var atag2 = '<a></a>'; // initialise to something
      atag2 = '<a' + newstring.split('<a')[1].split('</a>')[0] + '</a>';
      descriptionFormatted = newstring.split(atag2);
      newstring = '';
      descriptionFormatted.forEach((str) => {
        newstring = newstring + str;
      });
    }

    description = newstring.split('<br>');
    console.log(description);
  } else description = ['..no description provided'];
  var startEnd;
  if (!eventInfo.allDay) {
    if (eventInfo.end) {
      startEnd =
        moment(eventInfo.start).format('MMMM Do YYYY, h:mm a') +
        ' - ' +
        moment(eventInfo.end).format('MMMM Do YYYY, h:mm a');
    } else startEnd = moment(eventInfo.start).format('MMMM Do YYYY, h:mm a');
  } else startEnd = moment(eventInfo.start).format('MMMM Do YYYY,') + ' all-day';

  const handleClickLocation = (event) => {
    if (eventInfo.extendedProps.location.includes('http')) {
      //
      window.open(eventInfo.extendedProps.location);
    } else window.open(`https://maps.google.com?q=${eventInfo.extendedProps.location} `, '_system');
  };

  return (
    <>
      <DialogContent
      // sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}
      >
        <Box sx={{ mt: 4, maxWidth: '450px' }}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Circle sx={{ color: eventInfo.backgroundColor }} />
            </Grid>
            <Grid item xs={11}>
              <DialogContentText sx={{ fontSize: '1.3rem' }}>{eventInfo.title}</DialogContentText>
            </Grid>
            <Grid item xs={1}>
              <DialogContentText>
                <CalendarMonth />
              </DialogContentText>
            </Grid>
            <Grid item xs={11}>
              <DialogContentText variant='body2'>{startEnd}</DialogContentText>
            </Grid>
            {eventInfo.extendedProps.description && (
              <>
                <Grid item xs={1}>
                  <DialogContentText>
                    <Description />
                  </DialogContentText>
                </Grid>
                <Grid item xs={11}>
                  {description.map((line, indx) => (
                    <DialogContentText variant='body2' key={indx}>
                      {line}
                    </DialogContentText>
                  ))}
                </Grid>
              </>
            )}
            {eventInfo.extendedProps.location && (
              <>
                <Grid item xs={1}>
                  <DialogContentText>
                    <Place />
                  </DialogContentText>
                </Grid>
                <Grid item xs={11}>
                  <DialogContentText variant='body2'>{eventInfo.extendedProps.location}</DialogContentText>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>
      {eventInfo.extendedProps.location && (
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button color='info' onClick={handleClickLocation} sx={{ borderRadius: 25 }} endIcon={<Place />}>
            go to
          </Button>
        </DialogActions>
      )}
    </>
  );
};
export default CalEvent;
