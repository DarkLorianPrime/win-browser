import axios from "axios";

let url = "http://195.140.146.94:5003/api/v1"
export default class Service {
    constructor() {
    }

    get_element(page) {
        return axios.get(`${url}/getelement/`, {params: {page: page}})
    }

    send_element(state) {
        let formData = {}
        try {
            Object.keys(state).forEach(data => {
                if ((state[data] === undefined || state[data] === '') && (data !== "error" && data !== "response")) {
                    throw {error: `Параметр ${data} не указан.`};
                }
                formData[data] = state[data]
            })
        } catch (e) {
            return e;
        }
        return axios.post(`${url}/addelement/`, formData)
    }
}