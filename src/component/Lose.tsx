interface ILose {
    replay: any
}

export const Lose: React.FC<ILose> = ({ replay }) => {



    return (
        <div className="wrapper">
            <div className="block-lose">
                <div className="lose-text">Perdu !</div>
                <button className="replay" onClick={replay}>Rejouer ?</button>
            </div>
        </div>
    )
}