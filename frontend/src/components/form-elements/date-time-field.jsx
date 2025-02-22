import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

const StyledDateTimeField = ({ name, label, value, onChange }) => {
    const handleChange = (newValue) => {
        onChange(name, newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
                label={label}
                value={dayjs(value)}
                onChange={handleChange}
            />
        </LocalizationProvider>
    );
};

export default StyledDateTimeField;