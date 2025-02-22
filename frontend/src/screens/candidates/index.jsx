import PageTitleBar from "../../components/page-titlebar";
import { useAuth } from "../../context/auth-provider";
import CandidateGrid from "./grid";

const Candidates = () => {
    const { user } = useAuth();
    const permissions = user?.permissions || [];

    return (
        <div>
            {permissions?.includes('add_candidate') && <PageTitleBar title="Candidates" redirect='/add-candidates' />}
            <CandidateGrid permissions={permissions} module='candidate' />
        </div>
    );
};

export default Candidates;