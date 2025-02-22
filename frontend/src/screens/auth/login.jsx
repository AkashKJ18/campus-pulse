import { useState } from "react";
import StyledPhoneField from "../../components/form-elements/phone-field";
import Grid from '@mui/material/Grid2';
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../api/authApi";
import OTPInput from "../../components/form-elements/otp-input";
import { useAuth } from "../../context/auth-provider";

const initialFormState = {
    mobile: ''
};
const Login = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [isOtp, setIsOtp] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleOtpSubmit = async (otp) => {
        login({ ...formData, otp });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await sendOtp(formData);
            if (result.status === 200) {
                setIsOtp(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <StyledPhoneField name="mobile" label="Phone Number" value={formData.mobile} onChange={handleInputChange} />
            {isOtp && (<OTPInput onVerify={handleOtpSubmit} />)}
            <Grid size={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button onClick={() => navigate(-1)} variant="outlined">Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Grid>
        </>
    );
};

export default Login;
