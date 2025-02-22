import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { deleteEvent, getEvents, updateEvent } from '../../api/eventsApi';
import { formatDateTime } from '../../utils/dates';
import { FloatingBadge } from './styled';
import { handleDeleteFile } from '../../utils';
import { CheckBox } from '@mui/icons-material';
import { useAuth } from '../../context/auth-provider';

const EventGrid = ({ permissions, module }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const canEdit = permissions.includes(`edit_${module}`);
    const canDelete = permissions.includes(`delete_${module}`);

    useEffect(() => {
        const getEventData = async () => {
            const result = await getEvents();
            setData(result.data);
        };
        getEventData();
    }, []);

    const handleDelete = (id, banner) => {
        deleteEvent(id);
        handleDeleteFile(banner);
        setData(data.filter((item) => item._id !== id));
    };

    const handlePublish = (id) => {
        updateEvent(id, { isPublished: true });
    };

    const handleNavigate = (item) => {
        if ((user.role !== 'Student' && item.type !== 'Election')) return;
        navigate('/candidates')
    };

    return (
        <Grid container spacing={2}>
            {data?.map((item, index) => (
                <Grid key={index} size={12}>
                    <Card onClick={() => handleNavigate(item)}>
                        <Stack flexDirection='row'>
                            <CardMedia
                                component="img"
                                alt={item.name}
                                height="280"
                                sx={{ width: '40%' }}
                                image={item.banner}
                            />
                            <FloatingBadge>
                                {item.status}
                            </FloatingBadge>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name} {item.isPublished && (<CheckBox />)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {formatDateTime(item.from)} - {formatDateTime(item.to)}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ alignItems: 'flex-end' }}>
                                {canEdit && <Button onClick={() => navigate('/edit-event/' + item._id)} size="small">Edit</Button>}
                                {canDelete && <Button onClick={() => handleDelete(item._id, item.banner)} size="small">Delete</Button>}
                                {!item.isPublished && canEdit && (<Button onClick={() => handlePublish(item._id)} size="small">Publish</Button>)}
                            </CardActions>
                        </Stack>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventGrid;