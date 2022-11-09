interface IDraw {
    countError: number;
}

export const Draw: React.FC<IDraw> = ({ countError }) => {

    return (
        <div className="fix-draw">
            {countError >= 5 && <div className="tete" />}
            {countError >= 6 && <div className="coup" />}
            {countError >= 8 && <div className="bras-droit" />}
            {countError >= 7 && <div className="bras-gauche" />}
            {countError >= 10 && <div className="jambe-droit" />}
            {countError >= 9 && <div className="jambe-gauche" />}
            {countError >= 4 && <div className="barre-top-descandant" />}
            {countError >= 3 && <div className="barre-top" />}
            {countError >= 2 && <div className="tige" />}
            {countError >= 1 && <div className="pied" />}
        </div>
    )
}