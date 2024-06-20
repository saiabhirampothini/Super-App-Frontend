let SERVER_HOST_ADDRESS = "https://super-app-backend.vercel.app";
let SOCKET_HOST_ADDRESS = "https://super-app-backend-sockets.vercel.app";
//Login.js
export const loginRoute = `${SERVER_HOST_ADDRESS}/api/auth`;
export const oauthRoute = `${SERVER_HOST_ADDRESS}/api/oauth/auth/google`;

//Register.js
export const registerRoute = `${SERVER_HOST_ADDRESS}/api/users/`;
export const otpRoute = `${SERVER_HOST_ADDRESS}/api/verify-phone`;
export const otpVerifyRoute = `${SERVER_HOST_ADDRESS}/api/verify-phone/otp`;
export const emailOtpRoute = `${SERVER_HOST_ADDRESS}/api/emailVerify/`;
export const emailOtpVerifyRoute = `${SERVER_HOST_ADDRESS}/api/emailVerify/verify-email`;

//Cart.js
export const getMyCartRoute = `${SERVER_HOST_ADDRESS}/api/cart/get-my-cart/`;
export const deleteCartItemRoute = `${SERVER_HOST_ADDRESS}/api/cart/delete-cart-item`;
export const editCartQuantityRoute = `${SERVER_HOST_ADDRESS}/api/cart/edit-quantity`;
export const cartGetBuyerAddressRoute = `${SERVER_HOST_ADDRESS}/api/profile/my-address`;
export const cartPlaceOrdersCodRoute = `${SERVER_HOST_ADDRESS}/api/orders/multiple-orders`;
export const cartPlaceOrdersOnlineRoute = `${SERVER_HOST_ADDRESS}/api/payment-gateway/pay`;

//Chat.js
export const chatGetMyChatsRoute = `${SERVER_HOST_ADDRESS}/api/chat/my-chats`;
export const chatFetchContactsRoute = `${SERVER_HOST_ADDRESS}/api/chat/profiles`;
export const chatGetMessagesRoute = `${SERVER_HOST_ADDRESS}/api/chat/get-messages`;
export const chatAddMessagesRoute = `${SERVER_HOST_ADDRESS}/api/chat/add-messages`;
export const closeChatRoute = `${SOCKET_HOST_ADDRESS}/api/chat/close-chat`;

//Dashboard.js
export const fetchProfileRoute = `${SERVER_HOST_ADDRESS}/api/profile/my-profile`;

//e-Commerce Dashboard.js
export const getAllProductsRoute = `${SERVER_HOST_ADDRESS}/api/products/get-all-products`;
export const addToCartRoute = `${SERVER_HOST_ADDRESS}/api/cart/add-to-cart`;

//GetSellerOrders.js
export const getSellerOrdersRoute = `${SERVER_HOST_ADDRESS}/api/orders/get-seller-orders`;
export const updateDeliveryStatusRoute = `${SERVER_HOST_ADDRESS}/api/orders/update-delivery-status`;

//NavbarDashboard.js
export const logOutRoute = `${SERVER_HOST_ADDRESS}/api/auth/logout`;

//Orders.js
export const getBuyerOrdersRoute = `${SERVER_HOST_ADDRESS}/api/orders/get-buyer-orders`;

//PostProducts.js
export const postProductsRoute = `${SERVER_HOST_ADDRESS}/api/products/add-products`;

//ProductPage.js
export const getReviewsAdditionalRoute = `${SERVER_HOST_ADDRESS}/api/reviews/get-product-reviews-additional`;
export const getProductReviewsRoute = `${SERVER_HOST_ADDRESS}/api/reviews/get-product-reviews`; /** */
export const fetchOrdersRoute = `${SERVER_HOST_ADDRESS}/api/orders/get-seller-orders-for-product`;
export const addToWishListRoute = `${SERVER_HOST_ADDRESS}/api/wishlist/add-to-wishlist`;
export const addReviewsRoute = `${SERVER_HOST_ADDRESS}/api/reviews/add-reviews`;
export const paySingleOnlineRoute = `${SERVER_HOST_ADDRESS}/api/payment-gateway/pay-single`;
export const paySingleCodRoute = `${SERVER_HOST_ADDRESS}/api/orders/add-orders-cod`;

//Profile.js
export const getFullProfileRoute = `${SERVER_HOST_ADDRESS}/api/profile/get-full-profile`;
export const addAddressRoute = `${SERVER_HOST_ADDRESS}/api/profile/add-address`;
export const becomeSellerRoute = `${SERVER_HOST_ADDRESS}/api/becomeseller`;

//ProfileDashboard.js
export const addPhoneRoute = `${SERVER_HOST_ADDRESS}/api/verify-phone/add-phone`;

//SellerProducts.js
export const getProductBySellerRoute = `${SERVER_HOST_ADDRESS}/api/products/get-product-by-seller`;
export const deleteProductRoute = `${SERVER_HOST_ADDRESS}/api/products/delete-product`;
export const resumeProductRoute = `${SERVER_HOST_ADDRESS}/api/products/resume-product`;
export const updateStocksRoute = `${SERVER_HOST_ADDRESS}/api/products/update-stocks`;

//Wishlist.js
export const getWishListRoute = `${SERVER_HOST_ADDRESS}/api/wishlist/get-my-wishlist`;

//protect.js
export const checkRoute = `${SERVER_HOST_ADDRESS}/api/auth/check`;
