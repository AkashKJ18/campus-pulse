import { useEffect, useState } from "react";
import StyledTable from "../../components/table";
import { useNavigate } from "react-router-dom";
import { deleteRole, getRoles } from "../../api/rolesApi";

const RoleTable = ({ permissions }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getRoleData = async () => {
            const result = await getRoles();
            const formattedData = result.data.map(item => ({
                ...item,
                permissions: item.permissions?.map(permission => permission.name).join(', ') || 'N/A'
            }));
            setData(formattedData);
        };
        getRoleData();
    }, []);

    const columns = [
        {
            header: 'Name',
            accessor: 'name'
        },
        {
            header: 'Permissions',
            accessor: 'permissions'
        }
    ];

    const handleEdit = (rowData) => {
        navigate('/edit-role/' + rowData._id);
    };

    const handleDelete = (rowData) => {
        deleteRole(rowData._id);
        setData(data.filter((item) => item._id !== rowData._id));
    };

    return (
        <StyledTable columns={columns} data={data} permissions={permissions} module='role' onEdit={(data) => handleEdit(data)} onDelete={(data) => handleDelete(data)} />
    );
};

export default RoleTable;