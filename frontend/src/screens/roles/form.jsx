import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import StyledTextField from "../../components/form-elements/text-field";
import { Button, Stack } from '@mui/material';
import { useNotification } from '../../context/notification-context';
import { useNavigate, useParams } from 'react-router-dom';
import { createRole, getRole, updateRole } from '../../api/rolesApi';
import { getPermissions } from '../../api/permissionsApi';
import StyledAutocompleteField from '../../components/form-elements/autocomplete-field';

const initialFormState = {
    name: '',
    permissions: []
};

const RolesForm = () => {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState(initialFormState);
    const [permissions, setPermissions] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getPermissions().then((result) => {
            const formattedData = result.data.map((item) => ({
                label: item.name,
                value: item._id
            }));
            setPermissions(formattedData);
        });
    }, []);

    useEffect(() => {
        if (!id) return;
        getRole(id).then((result) => {
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
                updateRole(formData._id, formData);
                showNotification('Role updated successfully', 'success');
                navigate('/roles');
            } else {
                await createRole(formData);
                showNotification('Role added successfully', 'success');
            }
            setFormData(initialFormState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <StyledTextField name="name" label="Name" value={formData.name} onChange={handleInputChange} />
                <StyledAutocompleteField name="permissions" label="Select Permissions" value={formData.permissions} options={permissions} onChange={handleInputChange} multiple />
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

export default RolesForm;