import React from "react";
import PropTypes from "prop-types";
import { FaShoppingCart, FaHeart, FaClipboardList } from "react-icons/fa";

const EmptyState = ({ message, icon: Icon }) => {
  return (
    <div style={styles.container}>
      <Icon style={styles.icon} />
      <p style={styles.message}>{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "#555",
  },
  icon: {
    fontSize: "5rem",
    marginBottom: "1rem",
    color: "#ccc",
  },
  message: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
};

// Example usage:

const EmptyCart = () => (
  <EmptyState message="Your cart is empty" icon={FaShoppingCart} />
);

const EmptyWishlist = () => (
  <EmptyState message="Your wishlist is empty" icon={FaHeart} />
);

const EmptyOrders = () => (
  <EmptyState message="You have no orders" icon={FaClipboardList} />
);

export default EmptyState;
export { EmptyCart, EmptyWishlist, EmptyOrders };
