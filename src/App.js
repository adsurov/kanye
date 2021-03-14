import { useCallback } from "react";
import { useStore } from "effector-react";
import "./App.css";
import icon from "./assets/kanye.svg";
import { Button, Quote } from "./components";
import {
  $quotes,
  getQuotesEvent,
  deleteQuoteEvent,
  deleteAllQuotes,
} from "./model/app.model";

function App() {
  const quotes = useStore($quotes);

  const handleGetQuote = useCallback(() => {
    getQuotesEvent();
  }, []);
  const handleDeleteQuote = useCallback((id) => {
    deleteQuoteEvent(id);
  }, []);
  const handleDeleteAllQuotes = useCallback(() => {
    deleteAllQuotes();
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <div className="logo">
          <img className="logo__image" src={icon} alt="Kanye icon" />
          <h1>Kanye West's quotes</h1>
        </div>
        <ul className="actions">
          <li>
            <Button text="Get quote" onClick={handleGetQuote} />
          </li>
          <li>
            <Button text="Clear all quotes" onClick={handleDeleteAllQuotes} />
          </li>
        </ul>
      </header>

      <main>
        <ul className="quotes">
          {quotes.map((item) => (
            <li key={item.id} className="quotes__item">
              <Quote
                quote={item.quote}
                onDelete={handleDeleteQuote}
                id={item.id}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
