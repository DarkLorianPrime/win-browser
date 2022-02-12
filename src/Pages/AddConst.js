import {Component} from "react";
import {NavLink} from "react-router-dom";
import Service from "../Services/Service";
import fox_logo from "../Image/lis-logo.png"
import const_logo from "../Image/const.png"

let service = new Service();
let isDown = false;
export default class AddConst extends Component {
    tops = 0;
    lefts = 0;
    touch_x = 0;
    touch_y = 0;
    windowname = "";

    constructor(props) {
        super(props);
        this.state = {
            element_name: undefined,
            const_value: undefined,
            author: undefined,
            name: undefined,
            error: "",
            windowx: 0,
            windowy: 0,
            windowz: -1,
            windowo: 0,
            foxx: 0,
            foxy: 0,
            foxz: -1,
            foxo: 0
        }
        this.Submit = this.Submit.bind(this);
        this.input = this.input.bind(this);
        this.position = this.position.bind(this);
        this.mousedown = this.mousedown.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.close = this.close.bind(this);
        this.mouseup = this.mouseup.bind(this);
    }

    position(event) {
        this.x = event.x - this.touch_x;
        this.y = event.y - this.touch_y;
    }

    componentDidMount() {
        document.title = "DarkFoxPhysics";
        setInterval(f => {
            if (isDown) {
                this.setState({[this.windowname + "x"]: this.x})
                this.setState({[this.windowname + "y"]: this.y})
            }
        }, 20);
        window.addEventListener('mousemove', this.position, false)
    }

    Submit(event) {
        event.preventDefault();
        let data = service.send_element(this.state)
        if (data.error !== undefined) {
            this.setState(data)
        }
        data.then(r => {
            this.setState({error: r})
        }).catch(err => {
            if (err.response.data.error === undefined) {
                let key = Object.keys(err.response.data)[0]
                this.setState({error: err.response.data[key][0]})
                return;
            }
            this.setState({error: err.response.data.error})
        })
    }

    input(event) {
        this.setState({[event.target.id]: event.target.value})
        event.preventDefault();
    }

    openWindow(event) {
        if (this.state[event.target.id + "z"] === -1) {
            this.setState({[event.target.id + "z"]: 1});
            this.setState({[event.target.id + "o"]: 1});
            return;
        }
        this.setState({[event.target.id + "z"]: -1});
        this.setState({[event.target.id + "o"]: 0});
    }

    mousedown(event) {
        isDown = true;
        this.setState({[event.target.id + "z"]: 2});
        this.windowname = event.target.id
        this.x = event.nativeEvent.x - event.nativeEvent.layerX
        this.y = event.nativeEvent.y - event.nativeEvent.layerY
        this.touch_x = event.nativeEvent.layerX;
        this.touch_y = event.nativeEvent.layerY;
    }

    mouseup(event) {
        this.setState({[event.target.id + "z"]: 1});
        isDown = false;
    }

    close(event) {
        let id;
        if (event.nativeEvent.path[1].id !== "") {
            id = event.nativeEvent.path[1].id
        } else {
            id = event.nativeEvent.path[2].id
        }
        this.setState({[id + "o"]: 0});
        this.setState({[id + "z"]: -1})
    }

    render() {
        /* return (
            <div>
                <div className="header">
                    <a className="logo_Dark">DarkPhysic</a>
                    <NavLink to="/" className="nav-link">О нас</NavLink>
                    <NavLink to="/" className="nav-link">Видео-уроки</NavLink>
                    <NavLink to="/textlessons" className="nav-link">Текстовые-уроки</NavLink>
                    <NavLink to="/physicconst" className="nav-link">Физические постоянные</NavLink>
                </div>
                <div className="Container">
                    <a><p style={{"color": "red"}}>{this.state.error}</p></a>
                    <form onSubmit={this.Submit}>
                        <label><p>Элемент</p></label>
                        <input onChange={this.input} id="element_name"/>
                        <label><p>Его постоянная величина</p></label>
                        <input onChange={this.input} id="const_value"/>
                        <label><p>Автор</p></label>
                        <input onChange={this.input} id="author"/>
                        <label><p>Название</p></label>
                        <input onChange={this.input} id="name"/>
                        <p>
                            <button type="submit">a</button>
                        </p>
                    </form>
                </div>

         */
        return (
            <div>
                <div className="display">
                    <div className="panel-element">
                        <img id="window" onClick={this.openWindow} alt="const-logo" className="fox-elements ondisplay nonselect"
                             src={const_logo}/>
                    </div>
                    <div className="panel-element">
                        <img id="fox" onClick={this.openWindow} alt="const-logo" className="fox-elements ondisplay nonselect"
                             src={fox_logo}/>
                    </div>
                    <div style={{"top": this.state.windowy, "left": this.state.windowx, "zIndex": this.state.windowz}}
                         className="window-app">
                        <div id="window" onMouseDown={this.mousedown} onMouseUp={this.mouseup}
                             className="window-app-header">
                            <a className="nonselect">Физические постоянные</a>
                            <div onClick={this.close} className="closebutton">
                                <a onClick={this.close}>X</a>
                            </div>
                        </div>
                    </div>
                    <div style={{"top": this.state.foxy, "left": this.state.foxx, "zIndex": this.state.foxz}}
                         className="window-app">
                        <div id="fox" onMouseDown={this.mousedown} onMouseUp={this.mouseup}
                             className="window-app-header">
                            <a className="nonselect">Физические непостоянные</a>
                            <div onClick={this.close} className="closebutton">
                                <a onClick={this.close}>X</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-bar">
                    <div className="panel-element">
                        <img style={{"outline": this.state.foxo + "px solid red"}} id="fox" onClick={this.openWindow}
                             alt="lis-logo" className="fox-elements"
                             src={fox_logo}/>
                    </div>
                    <div className="panel-element">
                        <img style={{"outline": this.state.windowo + "px solid red"}} id="window"
                             onClick={this.openWindow} alt="const-logo" className="fox-elements"
                             src={const_logo}/>
                    </div>
                </div>
            </div>
        )
    }
}