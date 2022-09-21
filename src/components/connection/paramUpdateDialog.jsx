import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import { useState } from 'react';
import useApi from '../../core/api';


const ParamUpdateDialog = (props) => {

    const api = useApi()
    const [formData, setFormData] = useState({
        archiveCommand: props.value.archiveCommand,
        restoreCommand: props.value.restoreCommand,
    })

    function onSubmit() {

        (async () => {

            let apiData = {
                command: undefined,
            }

            if (props.editArchive) {
                apiData.command = formData.archiveCommand

                let { data } = await api.setArchiveCommand(props.connectionId, apiData)
            } else {
                apiData.command = formData.restoreCommand
                let { data } = await api.setRestoreCommand(props.connectionId, apiData)
            }

            props.onClose(true)

        })().catch(console.error)



    }

    return <Dialog open onClose={() => props.onClose()} fullWidth maxWidth="sm">
        <DialogTitle>Edit Server Parameters</DialogTitle>

        <Container>
            {props.editArchive &&
                <Row>
                    <TextField
                        label="archive command"
                        value={formData.archiveCommand}
                        fullWidth
                        onChange={e => setFormData(formData => ({ ...formData, archiveCommand: e.target.value }))}
                    />
                </Row>
            }
            {props.editRestore &&
                <Row>
                    <TextField
                        label="restore command"
                        value={formData.restoreCommand}
                        fullWidth
                        onChange={e => setFormData(formData => ({ ...formData, restoreCommand: e.target.value }))}
                    />
                </Row>
            }
            <Hint>restart after submit to apply changes!</Hint>
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
    display: inline-block;
    margin-top: 8px;
`
const Row = ({ children }) => <Box mt={2}>{children}</Box>

export default ParamUpdateDialog
