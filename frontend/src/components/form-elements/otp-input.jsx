import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const OTPInput = ({ length = 6, onVerify }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));

    const handleChange = (index, event) => {
        const value = event.target.value.replace(/\D/g, "");
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(0, 1);
        setOtp(newOtp);

        if (index < length - 1 && value) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace") {
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                document.getElementById(`otp-${index - 1}`)?.focus();
            }
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== length) {
            return;
        }
        onVerify(enteredOtp);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box display="flex" gap={1}>
                {otp.map((digit, index) => (
                    <TextField
                        key={index}
                        type="number"
                        id={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        variant="outlined"
                        size="small"
                        inputProps={{
                            maxLength: 1,
                            style: { textAlign: "center", fontSize: "1.5rem", width: "2.5rem" },
                        }}
                    />
                ))}
            </Box>
            <Button variant="contained" color="primary" onClick={handleVerify}>
                Verify OTP
            </Button>
        </Box>
    );
};

export default OTPInput;
