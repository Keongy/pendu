
interface Props {
    discoverWord: string[];
}

export const Word: React.FC<Props> = ({ discoverWord }) => {

    return (
        <div className="word">
            {discoverWord.map((t: string, i: number) => (
                <div className="lettre-mot" key={i}>{t}</div>
            ))}
        </div>
    )
}