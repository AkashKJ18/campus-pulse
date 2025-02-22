import { Box, CircularProgress, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from "@mui/material";
import { lightTheme } from "../containers/theme";
import Header from "../components/header";
import { lazy, Suspense, useState } from "react";
import { AdminMenu, IconMap } from "./admin-menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./styled";
import { useAuth } from "../context/auth-provider";
import PrivateRoute from "./private-route";
import Results from "../screens/results";
import ChatBot from "../screens/chat-bot";

const Candidates = lazy(() => import('../screens/candidates'));
const Users = lazy(() => import('../screens/users'));
const Login = lazy(() => import('../screens/auth/login'));
const AddEvents = lazy(() => import('../screens/events/add'));
const Events = lazy(() => import('../screens/events'));
const AddStudents = lazy(() => import('../screens/students/add'));
const Students = lazy(() => import('../screens/students'));
const AddCandidates = lazy(() => import('../screens/candidates/add'));
const AddUser = lazy(() => import('../screens/users/add'));
const AddRole = lazy(() => import('../screens/roles/add'));
const Roles = lazy(() => import('../screens/roles'));
const Account = lazy(() => import('../screens/account'));

export const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();

    const filteredMenu = AdminMenu.filter(item =>
        item.name !== "Login" || !isAuthenticated
    );

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const hasAccess = (item) => {
        if (!item.roles || item.roles.includes(user?.role)) {
            if (!item.permission || user?.permissions?.includes(item.permission)) {
                return true;
            }
        }
        return false;
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {filteredMenu.filter(hasAccess).map((item, index) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton component={Link} to={item.route}>
                            <ListItemIcon>
                                {IconMap[item.icon] || null}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={lightTheme}>
            <Header toggleDrawer={toggleDrawer} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <Main>
                <Suspense fallback={<CircularProgress />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Navigate to="/candidates" />} />
                            <Route path='/candidates' element={<Candidates />} />
                            <Route path='/add-candidates' element={<AddCandidates />} />
                            <Route path='/edit-candidate/:id' element={<AddCandidates />} />
                            <Route path='/students' element={<Students />} />
                            <Route path='/add-student' element={<AddStudents />} />
                            <Route path='/edit-student/:id' element={<AddStudents />} />
                            <Route path='/events' element={<Events />} />
                            <Route path='/add-event' element={<AddEvents />} />
                            <Route path='/edit-event/:id' element={<AddEvents />} />
                            <Route path='/users' element={<Users />} />
                            <Route path='/add-user' element={<AddUser />} />
                            <Route path='/edit-user/:id' element={<AddUser />} />
                            <Route path='/roles' element={<Roles />} />
                            <Route path='/add-role' element={<AddRole />} />
                            <Route path='/edit-role/:id' element={<AddRole />} />
                            <Route path='/account' element={<Account />} />
                            <Route path='/results' element={<Results />} />
                            <Route path='/chat-bot' element={<ChatBot />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Main>
        </ThemeProvider>
    );
};