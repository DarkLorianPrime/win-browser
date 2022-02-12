import axios from "axios";

let url = "http://195.140.146.94:5003/api/v1"
export default class Service {
    constructor() {
    }

    get_element(ids) {
        if (ids !== undefined) {
            return axios.get(`${url}/getelement/`, {params: {element_ids: ids}})
        }
        return axios.get(`${url}/getelement/`)
    }

    send_element(state) {
        let formData = {}
        try {
            Object.keys(state).forEach(data => {
                if ((state[data] === undefined || state[data] === '') && data !== "error") {
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