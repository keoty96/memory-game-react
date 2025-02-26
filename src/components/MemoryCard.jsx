import {decodeEntity} from 'html-entities';

export default function MemoryCard(props) {

    const emojis = props.emojis;

    return(
        <div className='card-wrapper'>
            { emojis.map((item, index) => (
                <div className="card" key={index}>
                    <button onClick={() => props.handleClick(item.name, index)}>
                        {decodeEntity(item.htmlCode[0])}
                    </button>
                </div>
            ))}
        </div>
    )
}

