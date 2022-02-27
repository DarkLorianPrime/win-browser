import restart_page from "../Image/restart-page.png";
import fox_logo from "../Image/lis-logo.png";
import const_logo from "../Image/const.png";
import addelement_logo from "../Image/addconst.png";
import physbrowser_logo from "../Image/physbrowser.png";
import physconspect_logo from "../Image/physconspect.png";
import addphysconspect_logo from "../Image/addphysconspect.png"

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
                <p><a>Спец. символы:</a></p>
                <p><a>Для указания жирности текста <span
                    className="red">{"<b>Привет!</b>"}</span> {self.formater("<b>Привет!</b>")}</a>
                </p>
                <p><a>Для окраски текста <span
                    className="red">{"<red>Привет!</red>"}</span> {self.formater("<red>Привет!</red>")}</a>
                </p>
                <p><a>Для создания списка:</a></p>
                <p><a>{"<ul><li>Первый</li><li>Второй</li><li>Третий</li></ul>"}</a></p>
                <p>{self.formater("<ul><li><a>Первый</a></li><li><a>Второй</a></li><li><a>Третий</a></li></ul>")}</p>
                <p><a>Для добавления картинки: <span
                    className="red">{"<img src='url'/>"}</span> {self.formater("<img className='inex' src='https://cdn.fishki.net/upload/post/2018/05/04/2588849/7620afabdb00b651da45d24a6bf29de3.jpg'/>")}
                </a>
                    <p><a>Для возведения в степень нужно указать <span className="red">2^2</span> {self.formater("2^2")}
                    </a>
                    </p>
                </p>
                <p><a>Для возведения в индекс нужно указать <span className="red">2|2</span> {self.formater("2|2")}</a>
                </p>
                <p><a>Для деления нужно указать <span className="red">2 / 2</span> {self.formater("2 / 2  pmgite")}</a>
                </p>
            </div>
        </div>
    )
}

function render_content(self) {
    if (self.state.one_page === true) {
        console.log(self.state.one_page_text)
        return (<div className="text-container">
            <a style={{"color": "black"}}>{self.formater(self.state.one_page_text.text)}</a>
            <p onClick={() => self.set_one_page()} className="button-d">Back --></p></div>)
    }
    return (self.state.chapters.map((values, index) => {
        let chapter_name_temp = <div key={index}><p className="heading">{values.chapter_name}</p></div>
        return (
            <div key={index}>
                <div>
                    {chapter_name_temp}
                    {values.conspects.map((id_conspect, index_conspects) => {
                        return (
                            self.state.conspects.map((id_conspects, index_conspect) => {
                                    if (id_conspects.id === id_conspect) {
                                        return (<p className="button-d"
                                                   onClick={() => self.set_one_page(id_conspects)}>>{self.formater(id_conspects.name)}</p>)
                                    }
                                }
                            ))
                    })}
                </div>
            </div>)
    }))


}


export function getConspects(self) {
    return (
        <div style={{
            "top": self.state.getconspecty,
            "left": self.state.getconspectx,
            "zIndex": self.state.getconspectz,
            "height": "950px",
            "width": "1000px"
        }} className="window-app">
            {self.standart_header("Физические конспекты", "getconspect")}
            <div className="conspect-body">
                {render_content(self)}
            </div>
        </div>
    )
}

export function addConspect(self) {
    return (
        <div style={{
            "top": self.state.addconspecty,
            "left": self.state.addconspectx,
            "zIndex": self.state.addconspectz,
            "height": "950px",
            "width": "1000px"
        }} className="window-app">
            {self.standart_header("Добавить физические конспекты", "addconspect")}
            <label style={{"color": "black"}}>Выберите раздел, куда нужно добавить конспект</label>
            <form id="addconspect" onSubmit={self.Submit} style={{"marginTop": "30px"}}>
                <p style={{"color": "darkgreen"}}>{self.state.responseaddconspect}</p>
                <p style={{"color": "red"}}>{self.state.erroraddconspect}</p>
                <select className="black-select" id="chapters" onChange={self.input}>
                    {self.state.chapters.map((values, index) => {
                        return (<option key={index} value={values["id"]}>{values["chapter_name"]}</option>)
                    })}
                </select>
                <p><label style={{"color": "black"}}>Введите название конспекта:</label></p>
                <input className="white-input" onChange={self.input} id="name"/>
                <p><label style={{"color": "black"}}>Напишите текст конспекта:</label></p>
                <textarea placeholder="Введите ваш текст..." id="text" onChange={self.input}/>
                <p>
                    <button type="Submit">Создать конспект</button>
                </p>
            </form>
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
        }} className="window-app">
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
                <button style={{"fontSize": "20px", "color": "black"}} id="back"
                        onClick={self.selectpageconstants}>←
                </button>
                <button style={{"fontSize": "20px", "color": "black"}} id="next"
                        onClick={self.selectpageconstants}>→
                </button>
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
            <p><a className="help-a">Физический браузер (физтуб) </a>
                <img className="fox-elements-help" src={physbrowser_logo} alt="guide"/></p>
            <p><a className="help-a">Посмотреть конспекты </a>
                <img className="fox-elements-help" src={physconspect_logo} alt="guide"/></p>
            <p><a className="help-a">Добавить конспекты </a>
                <img className="fox-elements-help" src={addphysconspect_logo} alt="guide"/></p>
            <p><a>Для продолжения нажмите на:</a></p>
            <button className="help-a" onClick={() => self.setState({help: 1})}>OK!</button>
        </div>
    )
}