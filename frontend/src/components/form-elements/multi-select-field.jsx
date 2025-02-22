import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const StyledMultiSelectField = ({ name, label, value, options, onChange }) => {
    const handleChange = (event) => {
        const { value: selectedValues } = event.target;
        onChange(name, selectedValues);
    };

    const getSelectedLabels = () => {
        return options
            .filter(option => value.includes(option.value))
            .map(option => option.label)
            .join(", ");
    };

    return (
        <FormControl sx={{ width: '220px' }}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                labelId={name}
                id={name + '-select'}
                value={value}
                label={label}
                multiple
                onChange={handleChange}
                renderValue={getSelectedLabels}
            >
                {options?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StyledMultiSelectField;