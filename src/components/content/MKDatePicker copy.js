// prop-types is a library for typechecking of props
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

// react-flatpickr components
import Flatpickr from 'react-flatpickr';
import './flatpickr_material_blue.css';

// // react-flatpickr styles
// import 'flatpickr/dist/flatpickr.css';

// Material Kit 2 React components
// import MKInput from 'components/MKInput';

function DatePicker({ options, size, color, label, inputRef, required, error, ...rest }) {
  console.log(options, { ...options });
  return (
    <Flatpickr
      options={{ ...options }}
      render={({ defaultValue }, inputRef, label) => (
        <TextField
          size={size}
          color='secondary'
          label={label}
          required
          {...rest}
          // defaultValue={defaultValue}
          inputRef={inputRef}
        />
      )}
    />
  );
}

// Setting default values for the props of DatePicker
DatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the DatePicker
DatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default DatePicker;
