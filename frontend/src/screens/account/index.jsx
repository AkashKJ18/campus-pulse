import { Card, CardContent, Typography, Avatar, Button, Box, Divider } from "@mui/material";
import { useAuth } from "../../context/auth-provider";
import DefaultUser from "../../assets/icons/avatar.svg";

const Account = () => {
    const { user, logout } = useAuth();

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Card sx={{ maxWidth: 700, p: 4, boxShadow: 3, borderRadius: 3, textAlign: 'center' }}>
                <CardContent>
                    <Avatar
                        src={DefaultUser}
                        alt="user_profile"
                        sx={{ width: 120, height: 120, mx: "auto", mb: 2, boxShadow: 2 }}
                    />
                    <Typography variant="h4" fontWeight={600} color="primary">
                        Welcome, {user?.profile?.firstName + ' ' + user?.profile?.lastName || "User"}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" mb={3}>
                        Manage your account and explore your preferences
                    </Typography>

                    <Box bgcolor="background.paper" p={2} borderRadius={2} boxShadow={1}>
                        {[
                            { label: "Role", value: user?.role || "N/A" },
                            { label: "Designation", value: user?.profile?.designation || "N/A" },
                            { label: "Contact Number", value: user?.profile?.phoneNumber || "N/A" },
                            { label: "Email", value: user?.profile?.email || "N/A" }
                        ].map((item, index) => (
                            <Box key={index} py={1}>
                                <Typography variant="body1" fontWeight={600} color="textSecondary">
                                    {item.label}:
                                </Typography>
                                <Typography variant="body1">{item.value}</Typography>
                                {index !== 3 && <Divider sx={{ mt: 1 }} />}
                            </Box>
                        ))}
                    </Box>

                    <Box display="flex" justifyContent="space-around" mt={3}>
                        <Button variant="outlined" color="primary">Edit Profile</Button>
                        <Button onClick={() => logout()} variant="contained" color="primary">Logout</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Account;
