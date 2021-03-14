import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from "effector";
import axios from "axios";
import { nanoid } from "nanoid";

export const getQuotesEvent = createEvent("getQuote");
export const updateStore = createEvent("updateStore");
export const deleteQuoteEvent = createEvent("deleteQuote");
export const deleteAllQuotes = createEvent("deleteAll");

const getQuotesFx = createEffect({
  name: "getQuotesEffect",
  handler: () => axios("https://api.kanye.rest"),
});

export const $quotes = createStore([], { name: "quotes" }).reset(
  deleteAllQuotes
);

$quotes.on(updateStore, (state, data) => state.concat(data));
$quotes.on(deleteQuoteEvent, (state, id) =>
  state.filter((item) => item.id !== id)
);

forward({
  from: getQuotesEvent,
  to: getQuotesFx,
});

sample({
  clock: getQuotesFx.doneData,
  fn: ({ data }) => {
    return {
      id: nanoid(),
      quote: data.quote,
    };
  },
  target: updateStore,
});
