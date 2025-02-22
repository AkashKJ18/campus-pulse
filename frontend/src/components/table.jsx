import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Table from '@mui/material/Table';
import { useState } from "react";
import { getFormattedValue } from "../utils";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledIconButton } from "./styled";

const StyledTable = ({ columns, data, permissions, module, onEdit, onDelete }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const canEdit = permissions.includes(`edit_${module}`);
    const canDelete = permissions.includes(`delete_${module}`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="main table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column, index) => (
                                <TableCell key={index}>{column.header}</TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {columns?.map((column, index) => (
                                    <TableCell key={index}>{getFormattedValue(row[column.accessor], column.type)}</TableCell>
                                ))}
                                <TableCell>
                                    {canDelete && (<StyledIconButton size='small' color="primary" onClick={() => onDelete(row)} aria-label="delete">
                                        <DeleteIcon />
                                    </StyledIconButton>)}
                                    {canEdit && (<StyledIconButton sx={{ ml: 1 }} color="primary" size='small' onClick={() => onEdit(row)} aria-label="edit">
                                        <EditIcon />
                                    </StyledIconButton>)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default StyledTable;