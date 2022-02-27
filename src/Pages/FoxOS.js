import {Component} from "react";
import Service from "../Services/Service";
import "../Styles/Main.css"
import fox_logo from "../Image/lis-logo.png";
import const_logo from "../Image/const.png";
import addelement_logo from "../Image/addconst.png";
import physbrowser_logo from "../Image/physbrowser.png";
import physconspect_logo from "../Image/physconspect.png";
import addphysconspect_logo from "../Image/addphysconspect.png";
import {
    FoxWindow, getConstants, AddConstants, standart_header, searchpanel, help_window, getConspects, addConspect
} from "./Windows";
import {BrowserFirstPage, BrowserPhysTubePage, BrowserAddPhysTubePage} from "./BrowserPages";
import {browser_input, formater, input} from "../Utils/Utils";
import {closeWindow, openWindow, selectpageconstants} from "../Utils/WindowsWorker"
import {updatePage} from "../Utils/WindowsWorker";
import {onpanellogo, ondisplaylogo} from "./ViewLogo";
import {
    getChapters_service,
    getVideos_service,
    getConstants_service,
    getConspects_service
} from "../Utils/ServiceUtils";

let service = new Service();
export default class FoxOS extends Component {
    standart_class = "fox-elements ondisplay nonselect"
    touch_x = 0;
    touch_y = 0;
    windowname = "";
    page = 1;
    isDown = false;
    windows = ["getconst", "addelement", "foxwindow", "browser", "getconspect", "addconspect"];
    pages = {
        "first": BrowserFirstPage,
        "physTube": BrowserPhysTubePage,
        "addcontent": BrowserAddPhysTubePage,
        "addconspect": addConspect
    };

    constructor(props) {
        super(props);
        this.state = {
            browser_page: "first",
            searching: "restart-page-image",
            addchapter: {
                chapter_name: undefined
            },
            addelement: {
                element_name: undefined,
                const_value: undefined,
                author: undefined,
                name: undefined,
                description: undefined
            },
            addvideo: {
                video_name: undefined,
                video_url: undefined,
                chapters: "4"
            },
            addconspect: {
                name: undefined,
                text: undefined,
                chapters: "4"
            },
            constants_elements: [],
            help: 0,
            conspects: [],
            chapters: [],
            textareastop: 0,
            onepage: false,
            onepage_text: ""
        }
        this.Submit = this.Submit.bind(this);
        this.mousedown = this.mousedown.bind(this);
        this.openWindow = openWindow.bind(this);
        this.selectpageconstants = selectpageconstants.bind(this);
        this.updatePage = updatePage.bind(this);
        this.formater = formater.bind(this);
        this.input = input.bind(this);
        this.getVideos_service = getVideos_service.bind(this);
        this.getChapters_service = getChapters_service.bind(this);
        this.getConstants_service = getConstants_service.bind(this);
        this.getConspects_service = getConspects_service.bind(this);
        this.searchpanel = searchpanel.bind(this);
        this.browserinput = browser_input.bind(this);
        this.position = this.position.bind(this);
        this.closeWindow = closeWindow.bind(this);
        this.standart_header = standart_header.bind(this);
        this.update = this.update.bind(this);
        this.onpanellogo = onpanellogo.bind(this);
        this.ondisplaylogo = ondisplaylogo.bind(this);
        this.set_one_page = this.set_one_page.bind(this);
    }

    update() {
        this.getConstants_service(this.page);
        this.getChapters_service();
        this.getVideos_service();
        this.getConspects_service();
    }

    position(event) {
        this.x = event.x - this.touch_x;
        this.y = event.y - this.touch_y;
    }

    componentDidMount() {
        document.title = "Физика. Механика.";
        this.windows.forEach(data => {
            this.setState({[data + "o"]: 0, [data + "x"]: 0, [data + "y"]: 0, [data + "z"]: -1});
        })
        this.update();
        setInterval(() => {
            this.update();
        }, 60000)
        setInterval(() => {
            if (this.isDown) {
                this.setState({[this.windowname + "x"]: this.x, [this.windowname + "y"]: this.y});
            }
        }, 20);
        window.addEventListener('mousemove', this.position, false);
    }

    Submit(event) {
        let data;
        event.preventDefault();
        data = service.send_element(this.state[event.target.id], event.target.id);
        if (data["error" + event.target.id] !== undefined) {
            this.setState(data);
            return;
        }
        data.then(() => {
            this.setState({["error" + event.target.id]: "", ["response" + event.target.id]: "Успешно добавлено."});
        }).catch(err => {
            if (err.response.data.error === undefined) {
                let key = Object.keys(err.response.data)[0];
                this.setState({["error" + event.target.id]: err.response.data[key][0]});
                return;
            }
            this.setState({["error" + event.target.id]: err.response.data.error});
        })
        this.update();
    }

    mousedown(event) {
        this.isDown = true;
        this.setState({[event.target.id + "z"]: 2});
        this.windowname = event.target.id;
        this.x = event.nativeEvent.x - event.nativeEvent.layerX;
        this.y = event.nativeEvent.y - event.nativeEvent.layerY;
        this.touch_x = event.nativeEvent.layerX;
        this.touch_y = event.nativeEvent.layerY;
    }

    set_one_page(id) {
        console.log(id)
        if (this.state.one_page === true) {
            this.setState({one_page: false});
            return;
        }
        this.setState({one_page_text: id, one_page: true})
    }

    render() {
        if (this.state.help === 0) {
            return (<div>{help_window(this)}</div>)
        }
        return (
            <div>
                <div className="display">
                    {/* Иконки на рабочем столе*/}
                    <div className="icons">
                        {this.ondisplaylogo("getconst", const_logo)}
                        {this.ondisplaylogo("addelement", addelement_logo)}
                        {this.ondisplaylogo("browser", physbrowser_logo)}
                        {this.ondisplaylogo("getconspect", physconspect_logo)}
                        {this.ondisplaylogo("addconspect", addphysconspect_logo)}
                    </div>
                    {/* Окна приложений */}
                    <div className="windows">
                        {getConstants(this)}
                        {FoxWindow(this)}
                        {AddConstants(this)}
                        {this.pages[this.state.browser_page](this)}
                        {getConspects(this)}
                        {addConspect(this)}
                    </div>
                </div>
                {/* Панель задач */}
                <div className="panel-bar">
                    {this.onpanellogo("foxwindow", fox_logo, this.state.foxwindowo)}
                    {this.onpanellogo("getconst", const_logo, this.state.getconsto)}
                    {this.onpanellogo("addelement", addelement_logo, this.state.addelemento)}
                    {this.onpanellogo("browser", physbrowser_logo, this.state.browsero)}
                    {this.onpanellogo("getconspect", physconspect_logo, this.state.getconspecto)}
                    {this.onpanellogo("addconspect", addphysconspect_logo, this.state.addconspecto)}
                </div>
            </div>
        )
    }
}
