import axios from 'axios';

const getGoogleCals = (googleCalColors) => {
  return new Promise(async (resolve, reject) => {
    const googleCalIds = [
      '9p7plr8ugunp5eaj57krb1rcaco2fhnh@import.calendar.google.com',
      'o2lpae7ahjt1fjsielmk8535usqrr781@import.calendar.google.com',
      'fastbac65@gmail.com',
      'jcog90oln2bbrgi9kgrie57q93gr74fn@import.calendar.google.com',
    ];

    const start = encodeURIComponent(new Date().toISOString());
    // const end = encodeURIComponent(info.endStr);
    // little util to get a date 9months from now
    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const addMonths = (input, months) => {
      const date = new Date(input);
      date.setDate(1);
      date.setMonth(date.getMonth() + months);
      date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth() + 1)));
      return date;
    };

    const newEndDate = encodeURIComponent(addMonths(new Date(), 3).toISOString());

    var allGetEvents = [];
    var allEvents = [];
    var getPromises = [];

    googleCalIds.forEach((calendarId) => {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&timeMin=${start}&timeMax=${newEndDate}&singleEvents=true&maxResults=999`;
      try {
        getPromises.push(axios.get(url));
      } catch (error) {
        console.log(error.message);
        reject(new Error(error.message));
        // failureCallback(new Error(error.message || 'Something went wrong.'));
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
          backgroundColor: googleCalColors[indx],
        }));
        allEvents = [...allEvents, ...events];
      }
    });

    console.log(allEvents);
    // successCallback([...allEvents]);
    resolve(allEvents);
  });
};
export default getGoogleCals;
