import PageTitleBar from "../../components/page-titlebar";
import AddStudentsForm from "./form";

const AddStudents = () => {
    return (
        <div>
            <PageTitleBar title="Add Students" />
            <AddStudentsForm />
        </div>
    );
};

export default AddStudents;
