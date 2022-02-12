import Service from "../Services/Service";
import {Component} from "react";
import {NavLink} from "react-router-dom";
import text from "../Image/image_constant.png"
let service = new Service();

export default class Physic_const extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        document.title = 'Физические постоянные'
    }

    render() {
        return (
            <div>
                <div className="header">
                    <a className="logo_Dark">DarkPhysic</a>
                    <NavLink to="/" className="nav-link">О нас</NavLink>
                    <NavLink to="/" className="nav-link">Видео-уроки</NavLink>
                    <NavLink to="/textlessons" className="nav-link">Текстовые-уроки</NavLink>
                    <a className="nav-link active">Физические постоянные</a>
                </div>
                <div className="Container">
                    <a className="description">Не нашел нужной физической постоянной? </a><a href="/addconst/" className="description" style={{"color": "white"}}> Добавь ее!</a>
                    <p><img src={text} alt="Physic_const"/></p>
                </div>
            </div>
        )
    }

}