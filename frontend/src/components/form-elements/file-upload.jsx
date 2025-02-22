import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "../styled";

const StyledUpload = ({ name, label, onChange }) => {
    const handleChange = (event) => {
        onChange(name, event.target.files[0]);
    };
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            {label}
            <VisuallyHiddenInput
                type="file"
                onChange={handleChange}
            />
        </Button>
    );
};

export default StyledUpload;