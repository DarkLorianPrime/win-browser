let parse = require("html-react-parser")
export function formater(str) {
    let best_drob = str.matchAll("[\\S]* \\/ [\\S]*")
    let array_drob = [...best_drob]
    array_drob.forEach(drob => {

        str = str.replace(drob, "<span class='drob'><span class='updrob'>" + drob[0].split("/")[0] + "<span/><span class='downdrob'>" + drob[0].split("/")[1] + "</span></span>")
    })
    let best_stepen = str.matchAll("\\^[\\S]*\\s*")
    let array_stepen = [...best_stepen]
    array_stepen.forEach(stepen => {
        str = str.replace(stepen, "<sup>" + stepen[0].replace("^", "") + "</sup>")
    })
    let best_substepen = str.matchAll("\\|[\\S]*\\s*")
    let array_substepen = [...best_substepen]
    array_substepen.forEach(substepen => {
        str = str.replace(substepen, "<sub>" + substepen[0].replace("|", "") + "</sub>")
    })
    return parse(str)
}