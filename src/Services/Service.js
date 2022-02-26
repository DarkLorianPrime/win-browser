import axios from "axios";
/* eslint-disable global-require */
let url = "http://195.140.146.94:5003/api/v1"
export default class Service {
    constructor() {
    }

    get_element(page) {
        return axios.get(`${url}/getelement/`, {params: {page: page}})
    }

    send_element(state, id) {
        let formData = {}
        if (Object.keys(state)[0] === id) {
            return axios.get(`${url}/${id}/`, {params: {videoquery: state[id]}})
        }
        try {
            Object.keys(state).forEach(data => {
                if ((state[data] === undefined || state[data] === '') && (data !== "error" && data !== "response")) {
                    throw {["error" + id]: `Параметр ${data} не указан.`};
                }
                formData[data] = state[data]
            })
        } catch (e) {
            return e;
        }
        return axios.post(`${url}/${id}/`, formData)
    }

    get_chapter() {
        return axios.get(`${url}/chapter/`)
    }

    get_videos() {
        return axios.get(`${url}/getvideos/`)
    }

    search(service, query) {
        let formData = {}
        formData["query"] = query
        return axios.post(`${url}/search/${service}`, formData)
    }
}
/* eslint-disable global-require */