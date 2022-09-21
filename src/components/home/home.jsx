import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';

import useApi from '../../core/api';
import ConnectionAddDialog from './connectionAddDialog';
import ConnectionEditDialog from './connectionEditDialog';

const Home = (props) => {

    const api = useApi()
    const [connections, setConnections] = useState([])
    const [selectedConnection, setSelectedConnection] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [dialogsStatus, setDialogsStatus] = useState({
        openAdd: false,
        openEdit: false,
    })

    function loadConnections() {

        api.connections().then(({ data }) => {
            setConnections(data)
        }).catch(console.error)
    }

    useEffect(loadConnections, [])

    return <div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Connection String</TableCell>
                        <TableCell>
                            <Button variant="outlined" onClick={() => setDialogsStatus({ openAdd: true })}>
                                Add
                                <AddIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {connections.map((row) => (
                        <TableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/${row.id}`} style={{ textDecoration: 'none' }}>
                                    {row.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {row.connectionString}
                            </TableCell>
                            <TableCell>
                                <Button onClick={e => {
                                    setAnchorEl(e.target)
                                    setSelectedConnection(row)
                                }}>
                                    <MoreHorizIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Menu
                anchorEl={anchorEl}
                open={anchorEl != null}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => setDialogsStatus({ openEdit: true })}>Edit</MenuItem>
                <MenuItem disabled>Delete</MenuItem>
            </Menu>

            {dialogsStatus.openAdd && <ConnectionAddDialog
                onClose={reload => {
                    setDialogsStatus({})
                    if (reload) {
                        loadConnections()
                    }
                }}
            />}

            {dialogsStatus.openEdit && <ConnectionEditDialog
                value={selectedConnection}
                onClose={reload => {
                    setDialogsStatus({})
                    setAnchorEl(null)
                    if (reload) {
                        loadConnections()
                    }
                }}
            />}
        </TableContainer>
    </div>
}

export default Home
