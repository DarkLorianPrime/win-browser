export function FoxWindow(self) {
    return (<div style={{
        "top": self.state.foxwindowy, "left": self.state.foxwindowx, "zIndex": self.state.foxwindowz
    }} className="window-app blue-background what-background">
        {self.standart_header("FoxOS", "foxwindow")}
        <div>
            <p><a>TEXT</a></p>
            <p><a>TEXT</a></p>
            <p><a>TEXT</a></p>
            <p><a>TEXT</a></p>
            <p><a>TEXT</a></p>
        </div>
    </div>)
}

export function GetConstants(self) {
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