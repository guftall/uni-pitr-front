import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled'
import useApi from "../../core/api"
import ParamUpdateDialog from "./paramUpdateDialog"
import RecoveryStartDialog from "./recoveryStartDialog"
import BaseBackupDialog from "./baseBackupDialog"

const Connection = (props) => {

    const api = useApi()
    const params = useParams()
    const [status, setStatus] = useState()
    const [connection, setConnection] = useState()
    const [dialogsStatus, setDialogsStatus] = useState({
        openEditArchiveCommand: false,
        openEditRestoreCommand: false,
        openRecoveryStartDialog: false,
        openNewBaseBackup: false,
    })

    function loadConnection() {

        api.connections().then(({ data }) => {
            let conn = data.find(conn => conn.id == params.id)
            setConnection(conn)
        }).catch(console.error)
    }

    function loadConnectionStatus() {

        api.connectionStatus(params.id).then(({ data }) => {

            setStatus(data)
        }).catch(console.error)
    }

    function start() {

        api.start(params.id).then(() => {
            loadConnectionStatus()
        }).catch(console.error)
    }

    function stop() {

        api.stop(params.id).then(() => {
            loadConnectionStatus()
        }).catch(console.error)
    }

    function restart() {

        api.restart(params.id).then(() => {
            loadConnectionStatus()
        }).catch(console.error)
    }

    function toggleArchiveMode() {

        api.toggleArchiveMode(params.id).then(() => {
            loadConnectionStatus()
        }).catch(console.error)
    }

    function openPitr() {
        if (connection.lastBaseBackup) {
            setDialogsStatus({ openRecoveryStartDialog: true })
        } else {
            alert('please create a base backup first')
        }
    }

    useEffect(() => {

        loadConnection()
        loadConnectionStatus()
    }, [])

    return <Container>
        <Box>
            <div>Name: {connection?.name}</div>
        </Box>
        <Box>
            <Row>
                <Label>Connected:</Label>
                {status?.connected ? 'Connected' : 'Not Connected'}
            </Row>
            <Row>
                <Label>Config FilePath:</Label>
                {status?.configFilePath}
            </Row>
            <Row>
                <Label>
                    Config file writable:
                </Label>
                {status?.configFileWritable ? 'true' : 'false'}
            </Row>
            <Row>
                <Label>
                    OS username:
                </Label>
                {status?.osUserName}
            </Row>
            <Row>
                <Label>
                    Current Timeline ID:
                </Label>
                {status?.timelineId}
            </Row>
            <Row>
                <Label>
                    Last Base Backup:
                </Label>
                {connection?.lastBaseBackup ?
                    <div style={{ marginLeft: 64 }}>
                        <Row>
                            <Label>Path:</Label>
                            {connection.lastBaseBackup.path}
                        </Row>
                        <Row>
                            <Label>At:</Label>
                            {(new Date(connection.lastBaseBackup.at)).toString()}
                        </Row>
                    </div>
                    :
                    <div>No base backup found</div>
                }
            </Row>
            <Row>
                <Label>
                    PG Params:
                </Label>
                <Row style={{ marginLeft: 64 }}>
                    <Row>
                        <Label>
                            Data directory:
                        </Label>
                        {status?.params.dataDirectory}
                    </Row>
                    <Row>
                        <Label>
                            Wal level:
                        </Label>
                        {status?.params.walLevel}
                    </Row>
                    <Row>
                        <Label>
                            Max wal senders:
                        </Label>
                        {status?.params.maxWalSenders}
                    </Row>
                    <Row>
                        <Label>
                            Archive mode:
                        </Label>
                        {status?.params.archiveMode}
                    </Row>
                    <Row>
                        <Label>
                            Archive command:
                        </Label>
                        {status?.params.archiveCommand}
                        <Button size="small" onClick={() => setDialogsStatus({ openEditArchiveCommand: true })}>
                            <EditIcon fontSize="small" />
                        </Button>
                    </Row>
                    <Row>
                        <Label>
                            Restore command:
                        </Label>
                        {status?.params.restoreCommand}
                        <Button size="small" onClick={() => setDialogsStatus({ openEditRestoreCommand: true })}>
                            <EditIcon fontSize="small" />
                        </Button>
                    </Row>
                </Row>
            </Row>
            <Actions>
                <Button variant="outlined" onClick={start}>Start</Button>
                <Button variant="outlined" color="secondary" onClick={restart}>Restart</Button>
                <Button variant="outlined" color="error" onClick={stop}>Stop</Button>
                <Tooltip title="After toggle click restart to apply changes!">
                    <Button variant="outlined" onClick={toggleArchiveMode}>Toggle Archive Mode</Button>
                </Tooltip>
                <Button onClick={() => setDialogsStatus({ openNewBaseBackup: true })}>New Base Backup</Button>
                <Button onClick={openPitr}>PITR</Button>
            </Actions>
        </Box>

        {(dialogsStatus.openEditArchiveCommand || dialogsStatus.openEditRestoreCommand) && <ParamUpdateDialog
            connectionId={connection.id}
            value={status.params}
            editArchive={dialogsStatus.openEditArchiveCommand}
            editRestore={dialogsStatus.openEditRestoreCommand}
            onClose={reload => {
                setDialogsStatus({})
                if (reload) {
                    loadConnectionStatus()
                }
            }}
        />}

        {dialogsStatus.openRecoveryStartDialog && <RecoveryStartDialog
            connection={connection}
            onClose={reload => {
                setDialogsStatus({ openRecoveryStartDialog: false })

                if (reload) {
                    loadConnection()
                }
            }}
        />}

        {dialogsStatus.openNewBaseBackup &&
            <BaseBackupDialog
                connection={connection}
                onClose={reload => {
                    setDialogsStatus({})
                    if (reload) {
                        loadConnection()
                    }
                }}
            />}

    </Container>
}

const Container = styled.div`
    padding: 16px;
`
const Row = styled.div`
    margin-top: 8px;
`
const Label = styled.div`
    min-width: 160px;
    display: inline-block;
`
const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    max-width: 560px;
`

export default Connection
