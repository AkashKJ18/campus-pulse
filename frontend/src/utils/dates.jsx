import dayjs from "dayjs";

export const formatDateTime = (val) => {
    return dayjs(val).format('DD/MM/YYYY h:mm A');
};