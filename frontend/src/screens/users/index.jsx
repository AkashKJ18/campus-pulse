import PageTitleBar from "../../components/page-titlebar";
import { useAuth } from "../../context/auth-provider";
import UserTable from "./table";

const MyAccount = () => {
    const { user } = useAuth();
    const permissions = user?.permissions || [];

    return (
        <div>
            {permissions.includes('add_user') && <PageTitleBar title="Users" redirect='/add-user' />}
            <UserTable permissions={permissions} />
        </div>
    );
};

export default MyAccount;