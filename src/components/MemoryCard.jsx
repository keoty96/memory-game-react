import {decodeEntity} from 'html-entities';

export default function MemoryCard(props) {

    const emojis = props.emojis;

    return(
        <div className='card-wrapper'>
            { emojis.map((item, index) => (
                <div className="card" key={index}>
                    <span>{decodeEntity(item.htmlCode[0])}</span>
                </div>
            ))}
        </div>
    )
}

