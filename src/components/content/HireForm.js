import { useState, useRef } from 'react';
import { Box, Button, Card, TextField, Stack } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { useValue } from '../context/ContextProvider';
// import './flatpickr_material_blue.css';
import DatePicker from './DatePicker';
import { useNavigate } from 'react-router-dom';

const HireForm = () => {
  // const navigate = useNavigate();
  const {
    dispatch,
    state: { alert },
  } = useValue();
  const fnameRef = useRef('');
  const mobileRef = useRef('');
  const emailRef = useRef('');
  const [fnameErr, setFnameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fname = fnameRef.current.value;
    const mobile = mobileRef.current.value;
    const email = emailRef.current.value;
    setFnameErr(false);
    setMobileErr(false);
    setEmailErr(false);
    setDateErr(false);

    !fname && setFnameErr(true);
    !mobile && setMobileErr(true);
    !email && setEmailErr(true);
    !date && setDateErr(true);

    try {
      //check for empty fields
      if (!fname || !email || !mobile || !date) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: 'Please fill in all required fields',
            duration: 3000,
          },
        });
        //check email match
      } else {
        //send details somewhere
        dispatch({ type: 'END_LOADING' });

        navigate('/');
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'success',
            message: "Thank you. We'll be back to you in in a tick",
            duration: 6000,
          },
        });
      }
    } catch (error) {
      dispatch({ type: 'END_LOADING', loading: false });
      console.log(error.message);
    }
  };

  const handleOnChangeDate = (datePick) => {
    setDate(datePick[0]);
  };

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Card sx={{ background: 'none', boxShadow: 0 }}>
          <Box sx={{ pb: 1, display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2} py={1} sx={{ width: '80%' }}>
              <Box spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  color='info'
                  size='small'
                  label='Full Name'
                  type='text'
                  required
                  error={fnameErr}
                  inputRef={fnameRef}
                />
                <TextField
                  color='info'
                  size='small'
                  label='Mobile Number'
                  type='text'
                  required
                  error={mobileErr}
                  inputRef={mobileRef}
                />
              </Box>
              {/* <Box spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
              <TextField
                color='info'
                size='small'
                label='Email'
                type='text'
                required
                error={emailErr}
                inputRef={emailRef}
              />
              {/* <TextField
                  color='info'
                  size='small'
                  label='Event date'
                  required
                  error={dateErr}
                  inputRef={dateRef}
                /> */}
              <DatePicker
                input={{ label: 'Select a date', required: true, value: date, error: dateErr }}
                value={date}
                onChange={handleOnChangeDate}
                options={{
                  minDate: 'today',
                  altInput: true,
                  altFormat: 'F j, Y',
                  dateFormat: 'Y-m-d',
                }}
              />
              {/* </Box> */}
            </Stack>
          </Box>

          <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ borderRadius: 25 }} type='submit' variant='contained' startIcon={<AppRegistrationIcon />}>
              Submit
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};
export default HireForm;
