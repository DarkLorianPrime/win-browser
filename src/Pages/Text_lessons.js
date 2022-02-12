import {Component} from "react";
import Service from "../Services/Service";
import "../Styles/Main.css";
import {NavLink} from "react-router-dom";
let parse = require("html-react-parser")
let service = new Service();
export default class Text_lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = "Текстовая информация"
    }

    formater(string) {
        let str = string.replaceAll("*", "x")
        let best_stepen = str.matchAll("\\^[\\S]*\\s*")
        let array_stepen = [...best_stepen]
        array_stepen.forEach(stepen => {
            str = str.replace(stepen, "<sup>" + stepen[0].replace("^", "") + "</sup>")
        })
        let best_drob = str.matchAll("[\\S]*\\\\[\\S]*")
        let array_drob = [...best_drob]
        array_drob.forEach(drob => {
            str = str.replace(drob,)
        })
        return parse(str)
    }

    render() {
        return (
            <div>
                <div className="header">
                    <a className="logo_Dark">DarkPhysic</a>
                    <NavLink to="/" className="nav-link">О нас</NavLink>
                    <NavLink to="/" className="nav-link">Видео-уроки</NavLink>
                    <a className="nav-link active">Текстовые-уроки</a>
                    <NavLink to="/physicconst" className="nav-link">Физические постоянные</NavLink>
                </div>
            </div>
        )
    }
}