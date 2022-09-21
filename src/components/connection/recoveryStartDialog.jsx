import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import { useState } from 'react';
import useApi from '../../core/api';

const RecoveryStartDialog = (props) => {

    const api = useApi()
    const [formData, setFormData] = useState({
        targetTime: ''
    })

    function onSubmit() {

        let time = new Date(formData.targetTime)
        let apiData = {
            targetTime: time.getTime(),
        }

        api.recover(props.connection.id, apiData).then(({ data }) => {
            if (data.error) {
                alert(data.error)
            } else {
                props.onClose(true)
            }
        }).catch(console.error)
    }

    return <Dialog open fullWidth maxWidth="sm" onClose={() => props.onClose()}>
        <DialogTitle>Point In Time Recovery</DialogTitle>
        <Container>
            <Box>
                <TextField
                    label="target time"
                    placeholder="2022-09-16 21:46:20.402851+04:30"
                    fullWidth
                    value={formData.targetTime}
                    onChange={e => setFormData(formData => ({ ...formData, targetTime: e.target.value }))}
                />
                <Hint>target time must be after last baseBackup: {new Date(props.connection.lastBaseBackup.at).toString()}</Hint>
            </Box>

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
const Hint = styled.span`
    font-size: 12px;
`

export default RecoveryStartDialog
