import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import StyledTextField from "../../components/form-elements/text-field";
import StyledDateField from "../../components/form-elements/date-field";
import { Gender } from "../../data/select/gender";
import StyledSelectField from "../../components/form-elements/select-field";
import StyledEmailField from "../../components/form-elements/email-field";
import StyledPhoneField from "../../components/form-elements/phone-field";
import { Nationality } from "../../data/select/nationality";
import StyledMultiSelectField from "../../components/form-elements/multi-select-field";
import { Language } from "../../data/select/language";
import { Button, Stack } from '@mui/material';
import { createStudent, getStudent, updateStudent } from '../../api/studentsApi';
import { useNotification } from '../../context/notification-context';
import { useNavigate, useParams } from 'react-router-dom';
import { Status } from '../../data/select/status';

const initialFormState = {
    firstName: '',
    lastName: '',
    userName: '',
    dateOfBirth: null,
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    grade: '',
    section: '',
    course: '',
    registerNumber: '',
    nationality: '',
    languages: [],
    status: ''
};

const StudentsForm = () => {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState(initialFormState);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getStudent(id).then((result) => {
            setFormData(result.data);
        });
    }, [id]);

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData._id) {
                updateStudent(formData._id, formData);
                showNotification('Student updated successfully', 'success');
                navigate('/students');
            } else {
                await createStudent(formData);
                showNotification('Student added successfully', 'success');
            }
            setFormData(initialFormState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <StyledTextField name="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} />
                <StyledTextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} />
                <StyledTextField name="userName" label="User Name" value={formData.userName} onChange={handleInputChange} />
                <StyledDateField name="dateOfBirth" label="Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} />
                <StyledSelectField name="gender" label="Gender" value={formData.gender} options={Gender} onChange={handleInputChange} />
                <StyledEmailField name="email" label="Email" value={formData.email} onChange={handleInputChange} />
                <StyledPhoneField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
                <StyledTextField name="address" label="Address" value={formData.address} onChange={handleInputChange} multiline />
                <StyledTextField name="grade" label="Grade" value={formData.grade} onChange={handleInputChange} />
                <StyledTextField name="section" label="Section" value={formData.section} onChange={handleInputChange} />
                <StyledTextField name="course" label="Course" value={formData.course} onChange={handleInputChange} />
                <StyledTextField name="registerNumber" label="Register Number" value={formData.registerNumber} onChange={handleInputChange} />
                <StyledSelectField name="nationality" label="Nationality" value={formData.nationality} options={Nationality} onChange={handleInputChange} />
                <StyledMultiSelectField name="languages" label="Languages" value={formData.languages} options={Language} onChange={handleInputChange} />
                <StyledSelectField name="status" label="Status" value={formData.status} options={Status} onChange={handleInputChange} />
                <Grid size={12}>
                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                        <Button onClick={() => navigate(-1)} variant="outlined">Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>

    );
};

export default StudentsForm;