import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const StyledSelectField = ({ name, label, value, options, onChange }) => {
    const handleChange = (event) => {
        onChange(name, event.target.value);
    };

    return (
        <FormControl sx={{ width: '220px' }}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                labelId={name}
                id={name + '-select'}
                value={value}
                label={label}
                onChange={handleChange}
            >
                {options?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StyledSelectField;