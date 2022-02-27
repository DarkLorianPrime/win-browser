export function ondisplaylogo(id, logo) {
        return (
            <div className="panel-element">
                <img id={id} onClick={this.openWindow} alt="const-logo" className={this.standart_class} src={logo}/>
            </div>
        )
    }

export function onpanellogo(id, logo, open) {
        return (
            <div className="panel-element">
                <img style={{"outline": open + "px solid red"}} id={id}
                     onClick={this.openWindow} alt="const-logo" className="fox-elements nonselect" src={logo}/>
            </div>
        )
    }