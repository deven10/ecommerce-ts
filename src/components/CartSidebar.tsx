import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartSvg } from "../assets/SVGs";
import { Fragment, useMemo } from "react";
import items from "../data/items.json";

type Item = {
  id: number;
  price: number;
  name: string;
  image: string;
};

type CartItem = Item & {
  quantity: number;
  totalPrice: number;
};

function CartSidebar() {
  const {
    isOpen,
    openCart,
    closeCart,
    cartQuantity,
    cartItems,
    removeFromCart,
  } = useShoppingCart();

  const cart = useMemo(() => {
    const data: CartItem[] = [];
    cartItems.forEach((item) => {
      const itemFound: Item | undefined = items.find(
        (cartItem) => cartItem.id === item.id
      );
      if (itemFound) {
        const newItem = {
          id: itemFound.id,
          price: itemFound.price,
          name: itemFound.name,
          image: itemFound.image,
          quantity: item.quantity,
          totalPrice: item.quantity * itemFound.price,
        };
        data.push(newItem);
      }
    });
    const total = data.reduce((acc, curr) => (acc += curr.totalPrice), 0);
    return { data, total };
  }, [cartItems]);

  console.log("cart: ", cart);

  return (
    <>
      {cartQuantity > 0 && (
        <Button onClick={openCart} style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-15px",
              color: "#fff",
              height: "24px",
              width: "24px",
              padding: "6px",
            }}
            className="d-flex justify-content-center align-items-center bg-danger rounded-circle"
          >
            {cartQuantity}
          </span>
          <CartSvg />
        </Button>
      )}

      <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.data.length > 0 ? (
            <>
              {cart.data.map((item) => (
                <Fragment key={item.id}>
                  <div className="cart-item">
                    <div className="cart-item-info">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="d-flex flex-column align-items-start">
                        <p className="m-0 cart-item-name">{item.name}</p>
                        <p className="m-0 cart-item-calculations">
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Fragment>
              ))}
              <p className="text-end cart-total">Cart Total - ${cart.total}</p>
            </>
          ) : (
            <p className="m-0">Please Add Items in Cart!</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartSidebar;
