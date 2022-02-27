let parse = require("html-react-parser")

export function formater(str) {
    let array_colon = [...str.matchAll("[\\n]")]
    array_colon.forEach(colon => {
        str = str.replace(colon, "<p class='nothing'>&nbsp;</p>")
    })
    let array_drob = [...str.matchAll("[\\S]* \\/ [\\S]*")]
    array_drob.forEach(drob => {
        str = str.replace(drob, "<span class='drob'><span class='updrob'>" + drob[0].split("/")[0] + "<span/><span class='downdrob'>" + drob[0].split("/")[1] + "</span></span>")
    })
    let array_stepen = [...str.matchAll("\\^[\\S]*\\s*")]
    array_stepen.forEach(stepen => {
        str = str.replace(stepen, "<sup>" + stepen[0].replace("^", "") + "</sup>")
    })
    let array_substepen = [...str.matchAll("\\|[\\S]*\\s*")]
    array_substepen.forEach(substepen => {
        str = str.replace(substepen, "<sub>" + substepen[0].replace("|", "") + "</sub>")
    })
    return parse(str)
}

export function browser_input(event) {
    this.setState({
        [event.nativeEvent.path[1].id]: {
            ...this.state[event.nativeEvent.path[1].id], [event.target.id]: event.target.value
        }
    })
}

export function input(event) {
    event.preventDefault();
    this.setState({
        [event.nativeEvent.path[2].children[0].id]: {
            ...this.state[event.nativeEvent.path[2].children[0].id], [event.target.id]: event.target.value
        }
    })
}