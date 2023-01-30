import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import './flatpickr_material_blue.css';
// Material Kit 2 React component
import MKInput from './DateInput/Index.js';

function DatePicker({ input, ...rest }) {
  return <Flatpickr {...rest} render={({ defaultValue }, ref) => <MKInput {...input} inputRef={ref} />} />;
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
