import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type ItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export const SingleItem = ({ item }: ItemProps) => {
  const {
    getCartQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getCartQuantity(item.id);
  return (
    <Card className="">
      <Card.Img
        variant="top"
        src={item.image}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-baseline mb-2 gap-2">
          <Card.Title>{item.name}</Card.Title>
          <span className="fs-6 text-muted">{formatCurrency(item.price)}</span>
        </div>
        {quantity === 0 ? (
          <Button
            variant="primary"
            className="w-100"
            onClick={() => increaseCartQuantity(item.id)}
          >
            Add to Cart
          </Button>
        ) : (
          <>
            <div className="d-flex gap-2 justify-content-between align-items-center mb-2">
              <Button
                variant="primary"
                onClick={() => decreaseCartQuantity(item.id)}
              >
                -
              </Button>
              <span>{quantity} in Cart</span>
              <Button
                variant="primary"
                onClick={() => increaseCartQuantity(item.id)}
              >
                +
              </Button>
            </div>
            <Button
              variant="danger"
              className="w-100"
              onClick={() => removeFromCart(item.id)}
            >
              Remove from Cart
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
