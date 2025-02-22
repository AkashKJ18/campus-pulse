import Person3Icon from '@mui/icons-material/Person3';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BugReportIcon from '@mui/icons-material/BugReport';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Chat, Login, ManageAccounts } from '@mui/icons-material';

export const AdminMenu = [
    {
        name: 'Candidates',
        route: '/candidates',
        icon: 'Person3',
        roles: ['Admin']
    },
    {
        name: 'Students',
        route: '/students',
        icon: 'PeopleOutline',
        roles: ['Admin', 'Teacher']
    },
    {
        name: 'Results',
        route: '/results',
        icon: 'Summarize',
        roles: ['Admin', 'Teacher', 'Student']
    },
    // {
    //     name: 'Grievances',
    //     route: '/grievances',
    //     icon: 'BugReport',
    //     roles: ['Admin', 'Teacher', 'Student']
    // },
    // {
    //     name: 'Announcements',
    //     route: '/announcements',
    //     icon: 'Campaign',
    //     roles: ['Admin', 'Teacher', 'Student']
    // },
    {
        name: 'Events',
        route: '/events',
        icon: 'Event',
        roles: ['Admin', 'Teacher', 'Student']
    },
    // {
    //     name: 'Blogs',
    //     route: '/blogs',
    //     icon: 'StickyNote2',
    //     roles: ['Admin', 'Teacher', 'Student']
    // },
    {
        name: 'Roles',
        route: '/roles',
        icon: 'ManageAccounts',
        roles: ['Admin']
    },
    {
        name: 'ChatBot',
        route: '/chat-bot',
        icon: 'Chat',
        roles: ['Admin', 'Teacher', 'Student']
    },
    {
        name: 'Login',
        route: '/login',
        icon: 'Login',
        roles: ['Admin', 'Teacher', 'Student']
    }
];

export const IconMap = {
    Person3: <Person3Icon />,
    PeopleOutline: <PeopleOutlineIcon />,
    Summarize: <SummarizeIcon />,
    BugReport: <BugReportIcon />,
    Campaign: <CampaignIcon />,
    Event: <EventIcon />,
    StickyNote2: <StickyNote2Icon />,
    ManageAccounts: <ManageAccounts />,
    Login: <Login />,
    Chat: <Chat />
};