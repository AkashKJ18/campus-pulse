import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import { getStudentsDropdownData } from "../../api/studentsApi";
import StyledTextField from "../../components/form-elements/text-field";
import StyledAutocompleteField from '../../components/form-elements/autocomplete-field';
import { Button, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../context/notification-context';
import { createCandidate, getCandidate, updateCandidate } from '../../api/canidatesApi';
import StyledUpload from '../../components/form-elements/file-upload';
import { handleFileUpload } from '../../utils';

const initialFormState = {
    student: '',
    description: ''
};

const CandidatesForm = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { id } = useParams();
    const [formData, setFormData] = useState(initialFormState);
    const [students, setStudents] = useState([]);
    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    useEffect(() => {
        if (!id) return;
        getCandidate(id).then((result) => {
            setFormData(result.data);
        });
    }, [id]);

    useEffect(() => {
        const getStudentData = async () => {
            const result = await getStudentsDropdownData();
            const formattedData = result.data.map((item) => ({
                label: item.fullName,
                value: item._id
            }));
            setStudents(formattedData);
        };
        getStudentData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedFormData = { ...formData };

            if (formData.profilePic && formData.profilePic instanceof File) {
                const fileURL = await handleFileUpload('Candidates', formData.profilePic);

                updatedFormData = { ...updatedFormData, profilePic: fileURL };
            }
            if (formData._id) {
                updateCandidate(formData._id, updatedFormData);
                showNotification('Candidate updated successfully', 'success');
                navigate('/candidates');
            } else {
                await createCandidate(updatedFormData);
                showNotification('Candidate added successfully', 'success');
            }
            setFormData(initialFormState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container spacing={2}>
            <StyledAutocompleteField name="student" label="Select Student" value={formData.student} options={students} onChange={handleInputChange} />
            <StyledTextField name="description" label="Description" value={formData.description} onChange={handleInputChange} multiline />
            <StyledUpload name="profilePic" label="Upload Photo" value={formData.profilePic} onChange={handleInputChange} />
            <Grid size={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button onClick={() => navigate(-1)} variant="outlined">Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default CandidatesForm;