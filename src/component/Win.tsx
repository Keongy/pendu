interface IWin {
    replay: any
}

export const Win: React.FC<IWin> = ({ replay }) => {

    return (
        <div className="wrapper">
            <div className="block-lose">
                <div className="lose-text">Gagné !</div>
                <button className="replay" onClick={replay}>Rejouer ?</button>
            </div>
        </div>
    )
}