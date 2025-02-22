import { TextField } from "@mui/material";
import { useState } from "react";
import { validateEmail } from "../../utils";

const StyledEmailField = ({ name, label, value, onChange }) => {
    const [error, setError] = useState(false);
    const handleChange = (event) => {
        const email = event.target.value;
        onChange(name, email);

        if (email && !validateEmail(email)) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <TextField onChange={handleChange} value={value} label={label} size='medium' variant="outlined" error={error} />
    );
};

export default StyledEmailField;