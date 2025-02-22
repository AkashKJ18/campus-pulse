import PageTitleBar from "../../components/page-titlebar";
import { useAuth } from "../../context/auth-provider";
import StudentTable from "./table";

const Students = () => {
    const { user } = useAuth();
    const permissions = user?.permissions || [];

    return (
        <div>
            {permissions.includes('add_student') && <PageTitleBar title="Students" redirect='/add-student' />}
            <StudentTable permissions={permissions} />
        </div>
    );
};

export default Students;