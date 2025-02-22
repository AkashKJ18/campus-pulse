import Grid from '@mui/material/Grid2';
import StyledPhoneField from '../../components/form-elements/phone-field';
import StyledEmailField from '../../components/form-elements/email-field';
import StyledSelectField from '../../components/form-elements/select-field';
import { Button, Stack } from '@mui/material';
import { createUser, getUser, updateUser } from '../../api/usersApi';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../context/notification-context';
import StyledTextField from '../../components/form-elements/text-field';
import { Status } from '../../data/select/status';
import { getRoles } from '../../api/rolesApi';

const initialFormState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    designation: '',
    role: '',
    status: ''
};
const UserForm = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { id } = useParams();

    useEffect(() => {
        getRoles().then((result) => {
            const formattedData = result.data.map((item) => ({
                label: item.name,
                value: item._id
            }));
            setRoles(formattedData);
        });
    }, []);

    useEffect(() => {
        if (!id) return;
        getUser(id).then((result) => {
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
                updateUser(formData._id, formData);
                showNotification('User updated successfully', 'success');
                navigate('/users');
            } else {
                await createUser(formData);
                showNotification('User added successfully', 'success');
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
                <StyledPhoneField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
                <StyledEmailField name="email" label="Email" value={formData.email} onChange={handleInputChange} />
                <StyledTextField name="designation" label="Designation" value={formData.designation} onChange={handleInputChange} />
                <StyledSelectField name="role" label="Role" value={formData.role} options={roles} onChange={handleInputChange} />
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

export default UserForm;