import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";

const StyledAutocompleteField = ({ name, label, value, options, onChange, multiple = false }) => {
    const handleChange = (event, newValue) => {
        if (multiple) {
            onChange(name, newValue.map((option) => option.value));
        } else {
            onChange(name, newValue ? newValue.value : null);
        }
    };

    const selectedValue = useMemo(() => {
        if (multiple) {
            return options.filter((option) => value?.includes(option.value)) || [];
        }
        return options.find((option) => option.value === value) || null;
    }, [value, options, multiple]);

    return (
        <Autocomplete
            sx={{ width: '220px' }}
            options={options}
            multiple={multiple}
            value={selectedValue}
            onChange={handleChange}
            disableCloseOnSelect={multiple}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
};

export default StyledAutocompleteField;