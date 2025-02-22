import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageTitleBar = ({ title, redirect }) => {
    const navigate = useNavigate();
    return (
        <Box justifyContent={'space-between'} display={'flex'} alignItems={'center'} mb={2}>
            <Typography variant="h5">{title}</Typography>
            {redirect && (<Button onClick={() => navigate(redirect)} size='medium' startIcon={<Add />} variant="contained" color="primary">Add {title}</Button>)}
        </Box>
    );
};

export default PageTitleBar;