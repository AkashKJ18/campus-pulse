import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCandidate, getCandidates } from "../../api/canidatesApi";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { handleDeleteFile } from '../../utils';
import { useAuth } from '../../context/auth-provider';
import { getStudent } from '../../api/studentsApi';
import { castVote } from '../../api/voteApi';
import { useNotification } from '../../context/notification-context';

const CandidateGrid = ({ permissions, module }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const [data, setData] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const canEdit = permissions.includes(`edit_${module}`);
    const canDelete = permissions.includes(`delete_${module}`);
    const canVote = permissions.includes(`vote_${module}`);

    useEffect(() => {
        const getCandidateData = async () => {
            const result = await getCandidates();
            setData(result.data);
        };
        const checkVotingAvailable = async () => {
            if (user.role !== 'Student') return;
            await getStudent(user?.profile?._id).then((result) => {
                setHasVoted(result.data.lastVotedYear === new Date().getFullYear());
            });
        };
        getCandidateData();
        checkVotingAvailable();
    }, [user]);

    const handleDelete = (id, profilePic) => {
        deleteCandidate(id);
        handleDeleteFile(profilePic);
        setData(data.filter((item) => item._id !== id));
    };

    const handleVote = async (id) => {
        if (hasVoted) return;
        try {
            await castVote({ studentId: user?.profile?._id, candidateId: id });
            showNotification('Your Vote has been casted', 'success');
        } catch (error) {
            console.log(error);
        }
    };

    if (data.length === 0) {
        return 'No data...';
    }

    return (
        <>
            <Grid container spacing={2}>
                {data?.map((item, index) => (
                    <Grid key={index} size={{ md: 3, xs: 12 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={item?.student?.firstName}
                                height="140"
                                image={item.profilePic}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item?.student?.firstName} {item?.student?.lastName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {canEdit && <Button onClick={() => navigate('/edit-candidate/' + item._id)} size="small">Edit</Button>}
                                {canDelete && <Button onClick={() => handleDelete(item._id, item.profilePic)} size="small">Delete</Button>}
                                {canVote && !hasVoted && <Button onClick={() => handleVote(item._id)}>Vote Now</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default CandidateGrid;