import PageTitleBar from "../../components/page-titlebar";
import { useAuth } from "../../context/auth-provider";
import EventGrid from "./grid";

const Events = () => {
    const { user } = useAuth();
    const permissions = user?.permissions || [];

    return (
        <div>
            {permissions.includes('add_event') && <PageTitleBar title="Events" redirect='/add-event' />}
            <EventGrid permissions={permissions} module='event' />
        </div>
    );
};

export default Events;