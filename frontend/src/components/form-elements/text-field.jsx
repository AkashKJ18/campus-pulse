import { TextField } from "@mui/material";

const StyledTextField = ({ name, label, value, onChange, multiline = false }) => {
    const handleChange = (event) => {
        onChange(name, event.target.value);
    };

    return (
        <TextField onChange={handleChange} value={value} label={label} multiline={multiline} size='medium' variant="outlined" />
    );
};

export default StyledTextField;