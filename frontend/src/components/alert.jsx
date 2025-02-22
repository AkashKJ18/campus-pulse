import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useAlert } from "../context/alert-context";

const CustomAlert = () => {
    const { open, handleClose, handleConfirm } = useAlert();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete ?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleConfirm} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomAlert;