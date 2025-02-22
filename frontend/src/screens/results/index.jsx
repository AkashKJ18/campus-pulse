import { useEffect, useState } from "react";
import { getStats } from "../../api/voteApi";
import { Container, Typography, Card, CardContent, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Grid from '@mui/material/Grid2';
import MarkdownRenderer from "../../components/mark-down-renderer";
import Loading from "../../components/loading";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Results = () => {
    const [data, setData] = useState(null);
    const colors = ["#3f51b5", "#ff5722", "#4caf50", "#ffc107", "#9c27b0", "#e91e63", "#00bcd4", "#8bc34a"];

    useEffect(() => {
        const getData = async () => {
            const result = await getStats();
            setData(result.data);
        };
        getData();
    }, []);

    if (!data) return <Loading />;

    const chartData = {
        labels: data.candidates.map(c => c?.student?.firstName),
        datasets: [
            {
                label: "Votes",
                data: data.candidates.map(c => c.votes),
                backgroundColor: data.candidates.map((_, i) => colors[i % colors.length]),
                borderRadius: 5,
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Election Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item size={{ md: 4, xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Votes</Typography>
                            <Typography variant="h5" color="primary">{data.totalVotes}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{ md: 4, xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Students</Typography>
                            <Typography variant="h5" color="secondary">{data.totalStudents}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{ md: 4, xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Voter Participation</Typography>
                            <Typography variant="h5" color="success">{data.voterParticipation}%</Typography>
                            <LinearProgress variant="determinate" value={data.voterParticipation} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container sx={{ mt: 4 }} spacing={3} alignItems='stretch'>
                <Grid item size={{ md: 6, xs: 12 }}>
                    <Card sx={{ p: 3, height: "400px" }}>
                        <Typography variant="h5" gutterBottom>
                            Candidate Results
                        </Typography>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 10
                                        }
                                    },
                                    x: {
                                        grid: { display: false }
                                    }
                                }
                            }}
                        />
                    </Card>
                </Grid>
                <Grid item size={{ md: 6, xs: 12 }}>
                    <Card sx={{ p: 3, height: "400px" }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Detailed Votes
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Candidate</strong></TableCell>
                                            <TableCell align="right"><strong>Votes</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.candidates.map((candidate) => (
                                            <TableRow key={candidate._id}>
                                                <TableCell>{candidate?.student?.firstName || 'N/A'}</TableCell>
                                                <TableCell align="right">{candidate.votes}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <MarkdownRenderer markdown={data?.aiPrediction} />
            </Grid>
        </Container>
    );
};

export default Results;
