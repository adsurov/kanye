import { Button } from "..";

export function Quote(props) {
  const handleDelete = () => {
    props.onDelete(props.id);
  };
  return (
    <div className="quote__wrapper">
      <blockquote className="quote__text">{props.quote}</blockquote>
      <Button text="Delete item" onClick={handleDelete} />
    </div>
  );
}
