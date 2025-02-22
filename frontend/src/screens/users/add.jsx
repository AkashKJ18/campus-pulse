import PageTitleBar from "../../components/page-titlebar";
import UserForm from "./form";

const AddUser = () => {
    return (
        <div>
            <PageTitleBar title="Add Users" />
            <UserForm />
        </div>
    );
};

export default AddUser;