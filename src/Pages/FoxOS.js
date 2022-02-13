import {Component} from "react";
import {NavLink} from "react-router-dom";
import Service from "../Services/Service";
import fox_logo from "../Image/lis-logo.png"
import const_logo from "../Image/const.png"
import addconst_logo from "../Image/addconst.png"
import {FoxWindow, GetConstants, AddConstants} from "./Windows";
let parse = require("html-react-parser")
let service = new Service();
let isDown = false;
export default class FoxOS extends Component {
    tops = 0;
    lefts = 0;
    touch_x = 0;
    touch_y = 0;
    windowname = "";
    page = 1
    windows = ["getconst", "addconst", "foxwindow"]

    constructor(props) {
        super(props);
        this.state = {
            element_name: undefined,
            const_value: undefined,
            author: undefined,
            name: undefined,
            error: "",
            response: "",
            constants_elements: []
        }
        this.windows.forEach(data => {
            this.state[data + "o"] = 0;
            this.state[data + "x"] = 0;
            this.state[data + "y"] = 0;
            this.state[data + "z"] = -1;
        })
        this.Submit = this.Submit.bind(this);
        this.input = this.input.bind(this);
        this.position = this.position.bind(this);
        this.mousedown = this.mousedown.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.close = this.close.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.GetConstants = this.GetConstants.bind(this);
        this.backpage = this.backpage.bind(this);
        this.newpage = this.newpage.bind(this);
    }

    position(event) {
        this.x = event.x - this.touch_x;
        this.y = event.y - this.touch_y;
    }

    componentDidMount() {
        document.title = "DarkFoxPhysics";
        this.GetConstants(this.page);
        setInterval(() => {
            if (isDown) {
                this.setState({[this.windowname + "x"]: this.x, [this.windowname + "y"]: this.y})
            }
        }, 20);
        window.addEventListener('mousemove', this.position, false)
    }

    GetConstants(page) {
        service.get_element(page).then(r => {
            this.setState({constants_elements: r.data.results, const_page: r.data.count})

        })
    }

    Submit(event) {
        event.preventDefault();
        let data = service.send_element(this.state)
        if (data.error !== undefined) {
            this.setState(data)
        }
        data.then(r => {
            this.setState({error: "", response: "Успешно добавлено."})
        }).catch(err => {
            if (err.response === undefined) {
                return;
            }
            if (err.response.data.error === undefined) {
                let key = Object.keys(err.response.data)[0]
                this.setState({error: err.response.data[key][0]})
                return;
            }
            this.setState({error: err.response.data.error})
        })
        this.GetConstants(this.page);
    }

    input(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    openWindow(event) {
        if (this.state[event.target.id + "z"] === -1) {
            this.setState({[event.target.id + "z"]: 1, [event.target.id + "o"]: 1});
            return;
        }
        this.setState({[event.target.id + "z"]: -1, [event.target.id + "o"]: 0});
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
        let id = event.nativeEvent.path[1].id !== "" ? event.nativeEvent.path[1].id : event.nativeEvent.path[2].id;
        this.setState({[id + "o"]: 0, [id + "z"]: -1});
    }

    formater(str) {
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

    backpage() {
        if (this.page - 1 === 0) {
            return;
        }
        this.page -= 1;
        this.GetConstants(this.page);
    }

    standart_header(name, id) {
        return (
            <div id={id} onMouseDown={this.mousedown} onMouseUp={this.mouseup}
                 className="window-app-header">
                <a className="nonselect">{name}</a>
                <div onClick={this.close} className="closebutton">
                    <a className="nonselect" onClick={this.close}>X</a>
                </div>
            </div>
        )
    }


    newpage() {
        if (this.page === Math.ceil(this.state.const_page / 5)) {
            return;
        }
        this.page += 1;
        this.GetConstants(this.page);
    }

    render() {
        return (
            <div>
                <div className="display">
                    <div className="panel-element">
                        <img id="getconst" onClick={this.openWindow} alt="const-logo"
                             className="fox-elements ondisplay nonselect" src={const_logo}/>
                    </div>
                    <div className="panel-element">
                        <img id="addconst" onClick={this.openWindow} alt="const-logo"
                             className="fox-elements ondisplay nonselect" src={addconst_logo}/>
                    </div>
                    {GetConstants(this)}
                    {FoxWindow(this)}
                    {AddConstants(this)}
                </div>
                {/* Панель снизу */}
                <div className="panel-bar">
                    <div className="panel-element">
                        <img style={{"outline": this.state.foxwindowo + "px solid red"}}
                             id="foxwindow" onClick={this.openWindow} alt="lis-logo"
                             className="fox-elements nonselect"
                             src={fox_logo}/>
                    </div>
                    <div className="panel-element">
                        <img style={{"outline": this.state.getconsto + "px solid red"}} id="getconst"
                             onClick={this.openWindow} alt="const-logo" className="fox-elements nonselect"
                             src={const_logo}/>
                    </div>
                    <div className="panel-element">
                        <img style={{"outline": this.state.addconsto + "px solid red"}} id="addconst"
                             onClick={this.openWindow} alt="const-logo" className="fox-elements nonselect"
                             src={addconst_logo}/>
                    </div>
                </div>
            </div>
        )
    }
}