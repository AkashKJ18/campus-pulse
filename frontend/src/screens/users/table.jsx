import { useNavigate } from "react-router-dom";
import StyledTable from "../../components/table";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../api/usersApi";

const UserTable = ({ permissions }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getUserData = async () => {
            const result = await getUsers();
            const formattedData = result.data.map(data => ({
                ...data,
                role: data.role.name
            }));
            setData(formattedData);
        };
        getUserData();
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
            header: 'Phone Number',
            accessor: 'phoneNumber'
        },
        {
            header: 'Designation',
            accessor: 'designation'
        },
        {
            header: 'Role',
            accessor: 'role'
        },
        {
            header: 'Status',
            accessor: 'status'
        }
    ];


    const handleEdit = (rowData) => {
        navigate('/edit-user/' + rowData._id);
    };

    const handleDelete = (rowData) => {
        deleteUser(rowData._id);
        setData(data.filter((item) => item._id !== rowData._id));
    };

    return (
        <StyledTable columns={columns} data={data} permissions={permissions} module='user' onEdit={(data) => handleEdit(data)} onDelete={(data) => handleDelete(data)} />
    );
};

export default UserTable;