import axios from 'axios'

const BASE_URL = `http://localhost:3000`

const useApi = () => {

    return new Api()
}

class Api {
    connections() {

        return axios.get(`${BASE_URL}/connection`)
    }
    addConnection(data) {

        return axios.post(`${BASE_URL}/connection`, data)
    }
    editConnection(id, data) {

        return axios.put(`${BASE_URL}/connection/${id}`, data)
    }
    connectionStatus(id) {

        return axios.get(`${BASE_URL}/connection/${id}/status`)
    }
    baseBackup(id, data) {

        return axios.post(`${BASE_URL}/connection/${id}/backup`, data)
    }
    start(id) {
        return axios.post(`${BASE_URL}/connection/${id}/start`, {})
    }
    stop(id) {
        return axios.post(`${BASE_URL}/connection/${id}/stop`, {})
    }
    restart(id) {
        return axios.post(`${BASE_URL}/connection/${id}/restart`, {})
    }
    toggleArchiveMode(id) {
        return axios.post(`${BASE_URL}/connection/${id}/params/archive-mode`, {})
    }
    setArchiveCommand(id, data) {
        return axios.post(`${BASE_URL}/connection/${id}/params/archive-command`, data)
    }
    setRestoreCommand(id, data) {
        return axios.post(`${BASE_URL}/connection/${id}/params/restore-command`, data)
    }
    recover(id, data) {

        return axios.post(`${BASE_URL}/connection/${id}/recover`, data)
    }
}

export default useApi
