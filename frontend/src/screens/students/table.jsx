import { useEffect, useState } from "react";
import StyledTable from "../../components/table";
import { deleteStudent, getStudents } from "../../api/studentsApi";
import { useNavigate } from "react-router-dom";

const StudentTable = ({ permissions }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getStudentData = async () => {
            const result = await getStudents();
            setData(result.data);
        };
        getStudentData();
    }, []);

    const columns = [
        {
            header: 'First Name',
            accessor: 'firstName'
        },
        {
            header: 'Last Name',
            accessor: 'lastName'
        },
        {
            header: 'Date of Birth',
            accessor: 'dateOfBirth',
            type: 'date'
        },
        {
            header: 'Gender',
            accessor: 'gender'
        },
        {
            header: 'Register Number',
            accessor: 'registerNumber'
        },
        {
            header: 'Section',
            accessor: 'section'
        }
    ];

    const handleEdit = (rowData) => {
        navigate('/edit-student/' + rowData._id);
    };

    const handleDelete = (rowData) => {
        deleteStudent(rowData._id);
        setData(data.filter((item) => item._id !== rowData._id));
    };

    return (
        <StyledTable columns={columns} data={data} permissions={permissions} module='student' onEdit={(data) => handleEdit(data)} onDelete={(data) => handleDelete(data)} />
    );
};

export default StudentTable;