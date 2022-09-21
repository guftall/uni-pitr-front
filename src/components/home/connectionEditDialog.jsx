import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import { useState } from 'react';
import useApi from '../../core/api';

const ConnectionEditDialog = (props) => {

    const api = useApi()
    const [formData, setFormData] = useState({
        connectionString: props.value.connectionString ?? '',
    })

    function onSubmit() {

        let data = {
            connectionString: formData.connectionString
        }

        api.editConnection(props.value.id, data).then(({ data }) => {
            if (data.error) {
                alert(data.error)
            } else {
                props.onClose(true)
            }
        }).catch(console.error)
    }

    return <Dialog open fullWidth maxWidth="sm" onClose={() => props.onClose()}>
        <DialogTitle>Edit Connection</DialogTitle>
        <Container>

            <Box>
                <TextField
                    label="connection string"
                    fullWidth
                    value={formData.connectionString}
                    onChange={e => setFormData(formData => ({ ...formData, connectionString: e.target.value }))}
                />
            </Box>
            <Box mt={4}>
                <Button onClick={onSubmit} variant="contained">submit</Button>
                <Button onClick={() => props.onClose()} style={{ marginLeft: 8 }}>close</Button>
            </Box>
        </Container>
    </Dialog>
}

const Container = styled.div`
    padding: 16px;
`

export default ConnectionEditDialog
