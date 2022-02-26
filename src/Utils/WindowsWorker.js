export function closeWindow(event) {
    let id = event.nativeEvent.path[1].id !== "" ? event.nativeEvent.path[1].id : event.nativeEvent.path[2].id;
    this.setState({[id + "o"]: 0, [id + "z"]: -1});
}

export function openWindow(event) {
    if (this.state[event.target.id + "z"] === -1) {
        this.setState({[event.target.id + "z"]: 1, [event.target.id + "o"]: 1});
        return;
    }
    this.setState({[event.target.id + "z"]: -1, [event.target.id + "o"]: 0});
}

export function updatePage() {
    this.setState({searching: "restart-page-image-process"})
    setTimeout(() => {
        this.setState({searching: "restart-page-image"})
    }, 2000)
    this.update()
}

export function selectpage(event) {
    switch (event.target.id) {
        case "back":
            if (this.page - 1 !== 0) {
                this.page -= 1;
            }
            break;
        case "next":
            if (this.page !== Math.ceil(this.state.const_page / 5)) {
                this.page += 1;
            }
            break;
    }
    this.getConstants(this.page);
}