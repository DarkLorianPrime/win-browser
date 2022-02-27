import restart_page from "../Image/restart-page.png";
import phystube_logo from "../Image/phystube.png";

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
                                     onClick={() => self.setState({browser_page: "addcontent"})}>
                    Хочешь добавить видео? Тебе сюда!</a></p>
                {data.map((values, index) => {
                    let chapter_name_temp = (<div key={index}><p><a>{values.chapter_name}</a></p></div>)
                    return (
                        <div>
                            {chapter_name_temp}
                            {values.videos.map((id_rolic, index_rolic) => {
                                return (
                                    self.state.videos.map((id_video, index_video) => {
                                        if (id_video.id === id_rolic) {
                                            let urls = id_video.video_url.split('=')[1]
                                            return (
                                                <div className="youtube-rolicks" key={index_video}>
                                                    <a className="video-text">{id_video.video_name}</a>
                                                    <iframe width="260" key={index_rolic}
                                                            height="155" allowFullScreen title="PHBRV"
                                                            src={`https://www.youtube.com/embed/${urls}`}
                                                            allow="picture-in-picture" frameBorder="0"/>
                                                </div>)
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
