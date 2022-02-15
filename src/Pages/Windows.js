import phystube_logo from "../Image/phystube.png";
import restart_page from "../Image/restart-page.png"
import {updatePage} from "../Utils/WindowsWorker";
import Service from "../Services/Service";

let service = new Service();

export function standart_header(name, id) {
    return (
        <div id={id} onMouseDown={this.mousedown} onMouseUp={this.mouseup}
             className="window-app-header">
            <a className="nonselect">{name}</a>
            <div onClick={this.closeWindow} className="closebutton">
                <a className="nonselect" onClick={this.closeWindow}>X</a>
            </div>
        </div>
    )
}

export function FoxWindow(self) {
    return (<div style={{
        "top": self.state.foxwindowy, "left": self.state.foxwindowx, "zIndex": self.state.foxwindowz
    }} className="window-app blue-background">
        {self.standart_header("FoxOS", "foxwindow")}
        <div>
            <p><a>OS: FoxOS</a></p>
            <p><a>CPU: FoxCore9-990l</a></p>
            <p><a>GPU: Foxidea FTX 2080 FI</a></p>
            <p><a>Права на OS полностью принадлежат Александру Касимову</a></p>
            <p><a>Город: Ульяновск</a></p>
            <p><a>Учебное заведение: Колледж Экономики и Информатики им. А. Н. Афанасьева</a></p>
            <p><a>Тема: физика - просто!</a></p>
            <p><a>Язык программирования: React + Django Rest Framework</a></p>
            <p><a>Дизайн: Весь дизайн был написан полностью с нуля Александром Касимовым. Часть пруфов заснята.</a></p>
            <p><a>Спец. символы:</a></p>
            <p><a>Для возведения в степень нужно указать 2^2 {self.formater("2^2")}</a></p>
            <p><a>Для возведения в индекс нужно указать 2|2 {self.formater("2|2")}</a></p>
        </div>
    </div>)
}

export function getConstants(self) {
    let data = self.state.constants_elements
    return (
        <div style={{
            "top": self.state.getconsty,
            "left": self.state.getconstx,
            "zIndex": self.state.getconstz,
            "height": "950px",
            "width": "700px"
        }}
             className="window-app">
            {self.standart_header("Физические постоянные", "getconst")}
            {data.map((values, index) => {
                return (
                    <div className="downline" key={index}>
                        <a className="black-a">{self.formater(data[index].element_name)}</a>
                        <a className="black-a"> - {data[index].name} - </a>
                        <p className="p-abzac"><a
                            className="black-a border-red"> {self.formater(data[index].const_value)}</a></p>
                        <p className="p-abzac black-a"> Автор: {data[index].author}</p>
                        <p className="p-abzac black-a"> Описание: {self.formater(data[index].description)}</p>
                    </div>
                )
            })
            }
            <div className="buttondown">
                <button style={{"fontSize": "20px", "color": "black"}} onClick={self.backpage}>←</button>
                <button style={{"fontSize": "20px", "color": "black"}} onClick={self.newpage}>→</button>
            </div>
        </div>
    )
}

export function AddConstants(self) {
    return (
        <div style={{
            "top": self.state.addconsty, "left": self.state.addconstx, "zIndex": self.state.addconstz
        }} className="window-app blue-background garry-background">
            {self.standart_header("Добавить Физ.Постоянную", "addconst")}
            <a><p style={{"color": "red"}}>{self.state.error}</p></a>
            <a><p style={{"color": "darkgreen"}}>{self.state.response}</p></a>
            <form onSubmit={self.Submit}>
                <label><p className="nonselect">Элемент</p></label>
                <input onChange={self.input} id="element_name"/>
                <label><p className="nonselect">Его постоянная величина</p></label>
                <input onChange={self.input} id="const_value"/>
                <label><p className="nonselect">Автор</p></label>
                <input onChange={self.input} id="author"/>
                <label><p className="nonselect">Название</p></label>
                <input onChange={self.input} id="name"/>
                <label><p className="nonselect">Описание</p></label>
                <input onChange={self.input} id="description"/>
                <p>
                    <button className="nonselect" type="submit">Добавить новую постоянную</button>
                </p>
            </form>
        </div>
    )
}

function BrowserMain(self) {

}

export function BrowserFirstPage(self) {
    return (
        <div>
            <div style={{
                "top": self.state.browsery, "left": self.state.browserx, "zIndex": self.state.browserz, "width": "900px"
            }} className="window-app blue-background what-background">
                {self.standart_header("PhysBrowser", "browser")}
                <div className="search-line" onClick={self.updatePage}>
                    <img className={self.state.searching} src={restart_page} alt="restart"/>
                    <a className="search-element">DarkFox.phys</a>
                </div>
                <p><a>PhysBrowser</a></p>
                <a><span style={{"color": "red"}}>Лучший</span> браузер для изучения физики.</a>
                <p><a>Введите свой запрос:</a></p>
                <p><input disabled="disabled" value="Поле ввода времено недоступно."/></p>
                <p><a>Ваши закладки:</a></p>
                <div onClick={() => self.setState({browser_page: "physTube"})} className="icon-browser"><img
                    className="img-browser" src={phystube_logo} alt="brow_ic"/><p
                    style={{"margin": "0"}}><a>PhysTube</a></p></div>
                <div className="icon-browser"><img className="img-browser" src={phystube_logo} alt="brow_ic"/><p
                    style={{"margin": "0"}}><a>PhysTube</a></p></div>
                <div className="icon-browser"><img className="img-browser" src={phystube_logo} alt="brow_ic"/><p
                    style={{"margin": "0"}}><a>PhysTube</a></p></div>
                <div className="icon-browser"><img className="img-browser" src={phystube_logo} alt="brow_ic"/><p
                    style={{"margin": "0"}}><a>PhysTube</a></p></div>
            </div>
        </div>
    )
}

export function BrowserPhysTubePage(self) {
    return (
        <div>
            <div style={{
                "top": self.state.browsery, "left": self.state.browserx, "zIndex": self.state.browserz, "width": "900px"
            }} className="window-app blue-background what-background">
                {self.standart_header("PhysBrowser", "browser")}
                <div className="search-line" onClick={self.updatePage}>
                    <button className="search-element" onClick={() => self.setState({browser_page: "first"})}>←</button>
                    <img className={self.state.searching} src={restart_page} alt="restart"/>
                    <a className="search-element">DarkFox.phys/phystube/</a>
                </div>
                <p><a>PhysTube</a><a style={{"marginLeft": "20px"}}
                                     onClick={() => self.setState({browser_page: "addcontent"})}>Хочешь стать креатором?
                    Тебе сюда!</a></p>
                <input/>
            </div>
        </div>
    )
}

export function BrowserAddPhysTubePage(self) {
    return (
        <div>
            <div style={{
                "top": self.state.browsery, "left": self.state.browserx, "zIndex": self.state.browserz, "width": "900px"
            }} className="window-app blue-background what-background">
                {self.standart_header("PhysBrowser", "browser")}
                <div className="search-line" onClick={self.updatePage}>
                    <button className="search-element" onClick={() => self.setState({browser_page: "physTube"})}>←
                    </button>
                    <img className={self.state.searching} src={restart_page} alt="restart"/>
                    <a className="search-element">DarkFox.phys/phystube/create</a>
                </div>
                <p><a>PhysTube - </a><a style={{"color": "red"}}> CREATORS</a></p>
                <form>
                    <p><a>Добавить новый раздел</a></p>
                    <input/>
                </form>
                <p><a>Добавить новое видео</a></p>
                <p><a>Выберите раздел, куда нужно добавить видео</a></p>
                <form>
                    <select>
                        {self.state.chapters.map((values, index) => {
                            return (
                                <option value={values["id"]}>{values["name"]}</option>
                            )
                        })}
                    </select>
                    <input/>
                </form>
            </div>
        </div>
    )
}