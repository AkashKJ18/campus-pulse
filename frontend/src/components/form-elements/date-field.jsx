import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const StyledDateField = ({ name, label, value, onChange }) => {
    const handleChange = (newValue) => {
        onChange(name, newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={dayjs(value)}
                onChange={handleChange}
            />
        </LocalizationProvider>
    );
};

export default StyledDateField;