import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import { useState } from 'react';
import useApi from '../../core/api';

const ConnectionAddDialog = (props) => {

    const api = useApi()
    const [formData, setFormData] = useState({
        name: ''
    })

    function onSubmit() {

        let data = {
            name: formData.name
        }

        api.addConnection(data).then(({data}) => {

            if (data.error) {
                alert(data.error)
            } else {
                props.onClose(true)
            }
        }).catch(console.error)
    }

    return <Dialog open fullWidth maxWidth="sm" onClose={() => props.onClose()}>
        <DialogTitle>Add Connection</DialogTitle>
        <Container>
            <Box>
                <TextField
                    placeholder='name'
                    onChange={e => setFormData(formData => ({ ...formData, name: e.target.value }))}
                />
            </Box>
            <Box mt={2}>
                <Button variant="contained" onClick={onSubmit}>submit</Button>
                <Button onClick={() => props.onClose()} style={{ marginLeft: 8 }}>close</Button>
            </Box>
        </Container>
    </Dialog>
}

const Container = styled.div`
    padding: 16px;
`

export default ConnectionAddDialog
