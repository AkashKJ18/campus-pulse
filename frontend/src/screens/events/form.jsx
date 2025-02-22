import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import StyledTextField from "../../components/form-elements/text-field";
import StyledSelectField from "../../components/form-elements/select-field";
import { Button, Stack } from '@mui/material';
import { useNotification } from '../../context/notification-context';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, getEvent, updateEvent } from '../../api/eventsApi';
import StyledUpload from '../../components/form-elements/file-upload';
import { EventTypes } from '../../data/select/event-types';
import { handleFileUpload } from '../../utils';
import StyledDateTimeField from '../../components/form-elements/date-time-field';
import { EventStatus } from '../../data/select/event-status';

const initialFormState = {
    name: '',
    description: '',
    banner: '',
    type: '',
    from: null,
    to: null,
    status: ''
};

const EventsForm = () => {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState(initialFormState);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getEvent(id).then((result) => {
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
            let updatedFormData = { ...formData };

            if (formData.banner && formData.banner instanceof File) {
                const fileURL = await handleFileUpload('Events', formData.banner);
                updatedFormData = { ...updatedFormData, banner: fileURL };
            }
            if (formData._id) {
                updateEvent(formData._id, updatedFormData);
                showNotification('Event updated successfully', 'success');
                navigate('/events');
            } else {
                await createEvent(updatedFormData);
                showNotification('Event added successfully', 'success');
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
                <StyledTextField name="description" label="Description" value={formData.description} onChange={handleInputChange} />
                <StyledUpload name="banner" label="Upload Banner" value={formData.banner} onChange={handleInputChange} />
                <StyledSelectField name="type" label="Type" value={formData.type} options={EventTypes} onChange={handleInputChange} />
                <StyledDateTimeField name="from" label="From" value={formData.from} onChange={handleInputChange} />
                <StyledDateTimeField name="to" label="To" value={formData.to} onChange={handleInputChange} />
                <StyledSelectField name="status" label="Status" value={formData.status} options={EventStatus} onChange={handleInputChange} />
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

export default EventsForm;