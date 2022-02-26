import phystube_logo from "../Image/phystube.png";
import restart_page from "../Image/restart-page.png";
import fox_logo from "../Image/lis-logo.png";
import const_logo from "../Image/const.png";
import addelement_logo from "../Image/addconst.png";
import physbrowser_logo from "../Image/physbrowser.png";
import physconspect_logo from "../Image/physconspect.png";

export function searchpanel(state, url) {
    return (
        <div className="search-line" onClick={this.updatePage}>
            <button className="search-element" onClick={() => this.setState({browser_page: state})}>←</button>
            <img className={this.state.searching} src={restart_page} alt="restart"/>
            <a className="search-element">{url}</a>
        </div>
    )
}

export function standart_header(name, id) {
    return (
        <div id={id} onMouseDown={this.mousedown} onMouseUp={() => this.isDown = false}
             className="window-app-header">
            <a className="nonselect">{name}</a>
            <div onClick={this.closeWindow} className="closebutton">
                <a className="nonselect" onClick={this.closeWindow}>X</a>
            </div>
        </div>
    )
}

export function FoxWindow(self) {
    return (
        <div style={{
            "top": self.state.foxwindowy,
            "left": self.state.foxwindowx,
            "zIndex": self.state.foxwindowz
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
                <p><a>Дизайн: Весь дизайн был написан полностью с нуля Александром Касимовым. Часть доказательств
                    заснята.</a></p>
                <p><a>Спец. символы:</a></p>
                <p><a>Для возведения в степень нужно указать <span className="red">2^2</span> {self.formater("2^2")}</a>
                </p>
                <p><a>Для возведения в индекс нужно указать <span className="red">2|2</span> {self.formater("2|2")}</a>
                </p>
                <p><a>Для деления нужно указать <span className="red">2 / 2</span> {self.formater("2 / 2")}</a></p>
            </div>
        </div>
    )
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
            })}
            <div className="buttondown">
                <button style={{"fontSize": "20px", "color": "black"}} id="back" onClick={self.selectpage}>←</button>
                <button style={{"fontSize": "20px", "color": "black"}} id="next" onClick={self.selectpage}>→</button>
            </div>
        </div>
    )
}

export function AddConstants(self) {
    return (
        <div style={{
            "top": self.state.addelementy,
            "left": self.state.addelementx,
            "zIndex": self.state.addelementz
        }} className="window-app blue-background garry-background">
            {self.standart_header("Добавить Физ.Постоянную", "addelement")}
            <a><p style={{"color": "red"}}>{self.state.erroraddelement}</p></a>
            <a><p style={{"color": "darkgreen"}}>{self.state.responseaddelement}</p></a>
            <form id="addelement" onSubmit={self.Submit}>
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

export function BrowserFirstPage(self) {
    return (
        <div style={{
            "top": self.state.browsery,
            "left": self.state.browserx,
            "zIndex": self.state.browserz,
            "width": "900px"
        }} className="window-app blue-background what-background">
            {self.standart_header("PhysBrowser", "browser")}
            <div className="search-line" onClick={self.updatePage}>
                <img className={self.state.searching} src={restart_page} alt="restart"/>
                <a className="search-element">DarkFox.phys</a>
            </div>
            <a><span style={{"color": "red"}}>Лучший</span> браузер для изучения физики.</a>
            <p><a>Введите свой запрос:</a></p>
            <p><input disabled="disabled" value="Поле ввода времено недоступно."/></p>
            <p><a>Ваши закладки:</a></p>
            <div onClick={() => self.setState({browser_page: "physTube"})} className="icon-browser">
                <img className="img-browser" src={phystube_logo} alt="brow_ic"/><p style={{"margin": "0"}}>
                <a>PhysTube</a></p></div>
        </div>
    )
}

export function BrowserPhysTubePage(self) {
    let data = self.state.chapters
    return (
        <div style={{
            "top": self.state.browsery,
            "left": self.state.browserx,
            "zIndex": self.state.browserz,
            "width": "900px",
            "height": "900px"
        }} className="window-app blue-background what-background">
            {self.standart_header("PhysBrowser", "browser")}
            {self.searchpanel("first", "DarkFox.phys/phystube/")}
            <div className="phystube-container">
                <p><a>PhysTube</a><a style={{"marginLeft": "20px", "cursor": "pointer", "color": "red"}}
                                     onClick={() =>
                                         self.setState({browser_page: "addcontent"})}>Хочешь стать креатором? Тебе
                    сюда!</a></p>
                {data.map((values, index) => {
                    let chapter_name_temp = (<div key={index}>
                        <p><a>{values.chapter_name}</a></p>
                    </div>)
                    return (
                        <div>
                            {chapter_name_temp}
                            {values.videos.map((id_rolic, index_rolic) => {
                                return (
                                    self.state.videos.map((id_video, index_video) => {
                                        if (id_video.id === id_rolic) {
                                            let urls = id_video.video_url.split('=')[1]
                                            return (
                                                <div className="youtube-rolicks" key={index_rolic}>
                                                    <a className="video-text">{id_video.video_name}</a>
                                                    <iframe width="260" key={index_video}
                                                            height="155" allowFullScreen title="PHBRV"
                                                            src={`https://www.youtube.com/embed/${urls}`}
                                                            allow="picture-in-picture" frameBorder="0"/>
                                                </div>
                                            )
                                        }
                                    }))
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function BrowserAddPhysTubePage(self) {
    return (
        <div style={{
            "top": self.state.browsery,
            "left": self.state.browserx,
            "zIndex": self.state.browserz,
            "width": "900px",
            "height": "700px"
        }} className="window-app blue-background what-background">
            {self.standart_header("PhysBrowser", "browser")}
            {self.searchpanel("physTube", "DarkFox.phys/phystube/create")}
            <p><a>PhysTube - </a><a style={{"color": "red"}}> CREATORS</a></p>
            <form id="addchapter" onSubmit={self.Submit}>
                <a><p style={{"color": "darkgreen"}}>{self.state.responseaddchapter}</p></a>
                <p style={{"color": "red"}}>{self.state.erroraddchapter}</p>
                <p><a>Добавить новый раздел</a></p>
                <input onChange={self.browserinput} id="chapter_name"/>
                <p className="downline-white">
                    <button type="submit">Создать раздел</button>
                </p>
            </form>
            <p><a>Добавить новое видео</a></p>
            <label>Выберите раздел, куда нужно добавить видео</label>
            <form id="addvideo" onSubmit={self.Submit} style={{"marginTop": "30px"}}>
                <a><p style={{"color": "darkgreen"}}>{self.state.responseaddvideo}</p></a>
                <p style={{"color": "red"}}>{self.state.erroraddvideo}</p>
                <select id="chapters" onChange={self.browserinput}>
                    {self.state.chapters.map((values, index) => {
                        return (<option key={index} value={values["id"]}>{values["chapter_name"]}</option>)
                    })}
                </select>
                <label><p>Название видео</p></label>
                <input id="video_name" onInput={self.browserinput}/>
                <label><p>Ссылка на ютуб</p></label>
                <input id="video_url" onInput={self.browserinput}/>
                <p>
                    <button type="submit">Создать видео</button>
                </p>
            </form>
        </div>
    )
}

export function help_window(self) {
    return (
        <div>
            <a>Этот сайт выполнен в дизайне операционной системы</a>
            <p><a>К сожалению нормальное адаптирование дизайна сделать невозможно</a></p>
            <p><a>Инструкция по использованию сайта:</a></p>
            <div>
                <a>Для работы с приложениями нужно нажимать на их иконки на рабочем столе или панели задач</a>
            </div>
            <p><a className="help-a">Посмотреть сводки о форматировании текста </a>
                <img className="fox-elements-help" src={fox_logo} alt="guide"/></p>
            <p><a className="help-a">Посмотреть физические постоянные </a>
                <img className="fox-elements-help" src={const_logo} alt="guide"/></p>
            <p><a className="help-a">Добавить физические постоянные </a>
                <img className="fox-elements-help" src={addelement_logo} alt="guide"/></p>
            <p><a className="help-a">Физический браузер (физтуб и добавление конспектов) </a>
                <img className="fox-elements-help" src={physbrowser_logo} alt="guide"/></p>
            <p><a className="help-a">Посмотреть конспекты </a>
                <img className="fox-elements-help" src={physconspect_logo} alt="guide"/></p>
            <p><a>Для продолжения нажмите на:</a></p>
            <button className="help-a" onClick={() => self.setState({help: 1})}>OK!</button>
        </div>
    )
}