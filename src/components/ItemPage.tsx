
import { useParams } from "react-router-dom";
import { useAppContext } from "../App";

export default function ItemPage() {
  const { itemsData, addToCart } = useAppContext();
  const { id } = useParams<{ id: string }>();

  const item = itemsData?.find((i) => i.id === Number(id));

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <>
      <h2>{item.product}</h2>
      <img src={item.img} alt={item.product} />
      <p>₪{item.price}</p>
      <button onClick={() => addToCart(item)}>הוסף לעגלה</button>
    </>
  );
}