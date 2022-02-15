import {Component} from "react";
import Service from "../Services/Service";
import "../Styles/Main.css"
import fox_logo from "../Image/lis-logo.png";
import const_logo from "../Image/const.png";
import addconst_logo from "../Image/addconst.png";
import physbrowser_logo from "../Image/physbrowser.png";
import {
    FoxWindow,
    getConstants,
    AddConstants,
    BrowserFirstPage,
    BrowserPhysTubePage,
    BrowserAddPhysTubePage,
    standart_header
} from "./Windows";
import {formater} from "../Utils/Utils";
import {closeWindow, openWindow} from "../Utils/WindowsWorker"
import {updatePage} from "../Utils/WindowsWorker";

let service = new Service();
let isDown = false;
export default class FoxOS extends Component {
    touch_x = 0;
    touch_y = 0;
    windowname = "";
    page = 1;
    windows = ["getconst", "addconst", "foxwindow", "browser"];
    func = {"first": BrowserFirstPage, "physTube": BrowserPhysTubePage, "addcontent": BrowserAddPhysTubePage};

    constructor(props) {
        super(props);
        this.state = {
            browser_page: "first",
            searching: "restart-page-image",
            addconst: {
                element_name: undefined,
                const_value: undefined,
                author: undefined,
                name: undefined,
                description: undefined
            },
            error: "",
            response: "",
            constants_elements: [],
            help: 0,
            chapters: []
        }
        this.windows.forEach(data => {
            this.state[data + "o"] = 0;
            this.state[data + "x"] = 0;
            this.state[data + "y"] = 0;
            this.state[data + "z"] = -1;
        })
        this.Submit = this.Submit.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.mousedown = this.mousedown.bind(this);
        this.openWindow = openWindow.bind(this);
        this.getConstants = this.getConstants.bind(this);
        this.backpage = this.backpage.bind(this);
        this.newpage = this.newpage.bind(this);
        this.updatePage = updatePage.bind(this);
        this.formater = formater.bind(this);
        this.input = this.input.bind(this);
        this.position = this.position.bind(this);
        this.closeWindow = closeWindow.bind(this);
        this.standart_header = standart_header.bind(this);
    }

    position(event) {
        this.x = event.x - this.touch_x;
        this.y = event.y - this.touch_y;
    }

    componentDidMount() {
        document.title = "DarkFoxPhysics";
        this.getConstants(this.page);
        service.get_chapter().then(r => {
            this.setState({chapters: r.data.results})
        })
        setInterval(() => {
            if (isDown) {
                this.setState({[this.windowname + "x"]: this.x, [this.windowname + "y"]: this.y})
            }
        }, 20);
        window.addEventListener('mousemove', this.position, false)
    }

    getConstants(page) {
        service.get_element(page).then(r => {
            this.setState({constants_elements: r.data.results, const_page: r.data.count})

        })
    }

    SearchSubmit(event) {
        event.preventDefault();
        let data = service
    }

    Submit(event) {
        event.preventDefault();
        let data = service.send_element(this.state[event.nativeEvent.path[1].children[0].id])
        if (data.error !== undefined) {
            this.setState(data)
        }
        data.then(() => {
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
        this.getConstants(this.page);
    }

    input(event) {
        console.log(this.state)
        this.setState({
            [event.nativeEvent.path[2].children[0].id]: {
                ...this.state[event.nativeEvent.path[2].children[0].id],
                [event.target.id]: event.target.value
            }
        })
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

    mouseup() {
        isDown = false;
    }

    backpage() {
        if (this.page - 1 === 0) {
            return;
        }
        this.page -= 1;
        this.getConstants(this.page);
    }

    newpage() {
        if (this.page === Math.ceil(this.state.const_page / 5)) {
            return;
        }
        this.page += 1;
        this.getConstants(this.page);
    }

    render() {
        if (this.state.help === 0) {
            return (
                <div>
                    <a>Этот сайт выполнен в дизайне операционной системы</a>
                    <p><a>К сожалению нормальное адаптирование дизайна сделать невозможно</a></p>
                    <p><a>Использовать желательно на 1920х1080</a></p>
                    <p><a>Для работы с сайтом нужно использовать иконки на рабочем столе \ меню быстрого доступа</a></p>
                    <button onClick={() => this.setState({help: 1})}>OK!</button>
                </div>
            )
        }
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
                    <div className="panel-element">
                        <img id="browser" onClick={this.openWindow} alt="const-logo"
                             className="fox-elements nonselect ondisplay" src={physbrowser_logo}/>
                    </div>
                    {getConstants(this)}
                    {FoxWindow(this)}
                    {AddConstants(this)}
                    {this.func[this.state.browser_page](this)}
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
                    <div className="panel-element">
                        <img style={{"outline": this.state.browsero + "px solid red"}} id="browser"
                             onClick={this.openWindow} alt="const-logo" className="fox-elements nonselect"
                             src={physbrowser_logo}/>
                    </div>
                </div>
            </div>
        )
    }
}