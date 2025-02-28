import { decodeEntity } from "html-entities";

export default function MemoryCard({
  handleClick,
  emojis,
  selectedCards,
  matchedCards,
}) {
  return (
    <div className="card-wrapper">
      {emojis.map((item, index) => {
        const selectedCardEntry = selectedCards.find(
          (emoji) => emoji.index === index
        );

        const matchedCardEntry = matchedCards.find(
          (emoji) => emoji.index === index
        );

        const btnStyle = matchedCardEntry ? "card-matched" : selectedCardEntry ? "card-selected" : "not-selected"

        return (
          <div className="card" key={index}>
            <button 
            aria-label={selectedCardEntry || matchedCardEntry ? item.name : "Card Upside Down"}
            aria-live="polite"
            disabled={matchedCardEntry} 
            className={btnStyle} 
            onClick={() => selectedCardEntry ? null : handleClick(item.name, index)}>
                { selectedCardEntry || matchedCardEntry ? 
                decodeEntity(item.htmlCode[0]) :
                "?" }
            </button>
          </div>
        );
      })}
    </div>
  );
}
