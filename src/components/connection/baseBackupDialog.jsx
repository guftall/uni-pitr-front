import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import { useState } from 'react';
import useApi from '../../core/api';

const BaseBackupDialog = props => {

    const api = useApi()
    const [formData, setFormData] = useState({
        path: ''
    })

    function onSubmit() {

        let data = {
            path: formData.path
        }
        api.baseBackup(props.connection.id, data).then(({ data }) => {

            props.onClose()
        }).catch(console.error)
    }

    return <Dialog open onClose={() => props.onClose()} fullWidth maxWidth="sm">
        <DialogTitle>Add Base Backup</DialogTitle>

        <Container>
            <Row>
                <TextField
                    label="path"
                    placeholder="/var/lib/postgresql/14/base-backups"
                    value={formData.path}
                    fullWidth
                    onChange={e => setFormData(formData => ({ ...formData, path: e.target.value }))}
                />
            </Row>
            <Box mt={2}>
                <Button variant="contained" onClick={onSubmit}>submit</Button>
                <Button onClick={() => props.onClose()} style={{ marginLeft: 8 }}>close</Button>
            </Box>
        </Container>
    </Dialog>
}
const Container = styled.div`
    padding: 0 32px 32px 32px;
`
const Row = ({ children }) => <Box mt={2}>{children}</Box>


export default BaseBackupDialog
