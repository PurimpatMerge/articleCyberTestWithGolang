import { useState } from 'react';
import {

  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';

import useFetch from "../../hooks/useFetch";

const Edituserstable = () => {
  const { data } = useFetch("users/");
  console.log("data",data);

  const columns = [
    {
      name: 'Name',
      accessor: 'fname',
    },
    {
      name: 'Lastname',
      accessor: 'lname',
    },
    {
      name: 'Email',
      accessor: 'uemail',
    },
    {
      name: 'Username',
      accessor: 'username',
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    if (sortConfig.key === column.accessor) {
      setSortConfig({
        key: column.accessor,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: column.accessor, direction: "asc" });
    }
  };

  const sortData = (data, key, direction) => {
    return data.users.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredData = data.users
    ? data.users?.filter(
        (row) =>
          row.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.uemail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedData = sortConfig.key
    ? sortData(filteredData, sortConfig.key, sortConfig.direction)
    : filteredData;

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mx-auto my-5">
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-500">
              {columns.map((column) => (
                <TableCell key={column.name} onClick={() => handleSort(column)}>
                  {column.name}
                  {sortConfig.key === column.accessor && (
                    <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow className="bg-white" key={row.ID}>
                {columns.map((column) => (
                  <TableCell key={column.name}>{row[column.accessor]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </div>
  );
};

export default Edituserstable;
