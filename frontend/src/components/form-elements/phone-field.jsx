import { useState } from "react";
import { validatePhoneNumber } from "../../utils";
import { TextField } from "@mui/material";

const StyledPhoneField = ({ name, label, value, onChange }) => {
    const [error, setError] = useState(false);
    const handleChange = (event) => {
        const phoneNumber = event.target.value;
        onChange(name, phoneNumber);

        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <TextField onChange={handleChange} value={value} label={label} size='medium' variant="outlined" error={error} />
    );
};

export default StyledPhoneField;