import Service from "../Services/Service";

let service = new Service();
export function getVideos_service() {
    service.get_videos().then(r => {
        this.setState({videos: r.data});
    })
}

export function getChapters_service() {
    service.get_chapter().then(r => {
        this.setState({chapters: r.data});
    })
}

export function getConstants_service(page) {
    service.get_element(page).then(r => {
        this.setState({constants_elements: r.data.results, const_page: r.data.count});
    })
}

export function getConspects_service() {
    service.get_conspects().then(r => {
        this.setState({conspects: r.data});
    })
}