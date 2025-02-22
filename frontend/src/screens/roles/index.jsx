import PageTitleBar from "../../components/page-titlebar";
import { useAuth } from "../../context/auth-provider";
import RoleTable from "./table";

const Roles = () => {
    const { user } = useAuth();
    const permissions = user?.permissions || [];

    return (
        <div>
            {permissions.includes('add_role') && (<PageTitleBar title="Roles" redirect='/add-role' />)}
            <RoleTable permissions={permissions} />
        </div>
    );
};

export default Roles;