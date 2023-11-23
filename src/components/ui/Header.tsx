// Imports
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Button,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
  faUser,
  faRightFromBracket,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import Cart from "./cart/Cart";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCartQuery } from "@/redux/api/cartApi";
import { useEffect } from "react";
import { setCart } from "@/redux/slices/cartSlice";
import { ENUM_USER_ROLES } from "@/enums/user";
import { ICart } from "@/types";
import { logoutUser } from "@/utils/user";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: cartData, isLoading: cartDataLoading } = useCartQuery({});

  useEffect(() => {
    if (!cartDataLoading) {
      if (cartData && cartData.success) {
        const userCart = cartData.data as ICart;
        if (userCart.courses.length) {
          dispatch(setCart(cart));
        } else {
          dispatch(setCart(null));
        }
      }
    }
  }, [currentUser, cartData, cartDataLoading, dispatch]);

  const [cartModalShow, setCartModalShow] = useState(false);

  return (
    <Navbar className="shadow-sm w-100" expand="lg">
      <Container>
        <Navbar.Brand className="fw-bold" href="/">
          sony-project
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            <Link
              className="text-decoration-none ms-lg-2 me-lg-3"
              href="/"
              style={{ color: "#161c2d" }}
            >
              Home
            </Link>
            <Link
              className="text-decoration-none me-lg-3"
              href="/courses"
              style={{ color: "#161c2d" }}
            >
              Courses
            </Link>
            {currentUser && currentUser.role === ENUM_USER_ROLES.STUDENT && (
              <Link
                className="text-decoration-none me-lg-3"
                href="/my-classes"
                style={{ color: "#161c2d" }}
              >
                My Classes
              </Link>
            )}

            {currentUser && currentUser.role === ENUM_USER_ROLES.STUDENT && (
              <>
                <button
                  onClick={() => setCartModalShow(true)}
                  className="btn btn-outline-dark mt-2 mt-lg-0 px-2 py-1 position-relative"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {(cart && cart?.courses?.length) || 0}
                    <span className="visually-hidden">Course Cart</span>
                  </span>
                </button>

                <Modal
                  show={cartModalShow}
                  onHide={() => setCartModalShow(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>My Cart</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {cart && cart?.courses?.length > 0 ? (
                      <Cart cart={cart} />
                    ) : (
                      <div className="container-fluid my-5">
                        <div className="offset-lg-3 col-12 text-center mx-auto">
                          <img
                            src="/EmptyCart.svg"
                            alt=""
                            className="img-fluid mb-4 col-9"
                          />
                          <h3 className="fw-bold">Your cart is empty 🛒</h3>
                          <p className="mb-4">
                            Add some courses to your cart and then proceed to
                            checkout. You will find a lot of amazing courses on
                            our courses page with limited offers.
                          </p>
                        </div>
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    {cart && cart?.courses?.length > 0 ? (
                      <div>
                        <Button
                          variant="secondary"
                          onClick={() => setCartModalShow(false)}
                        >
                          Close
                        </Button>
                        <Button
                          onClick={() => {
                            setCartModalShow(false);
                            router.push("/cart-review");
                          }}
                          className="ms-2"
                          variant="success"
                        >
                          Review Cart <FontAwesomeIcon icon={faForward} />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => {
                          setCartModalShow(false);
                          router.push("/courses");
                        }}
                      >
                        Browse Courses
                      </Button>
                    )}
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Nav>
          <Nav className="ms-auto text-center">
            {currentUser ? (
              <NavDropdown
                title={
                  <Image
                    src="/ProfileIcon.png"
                    className="img-fluid"
                    width={40}
                    height={40}
                    id="profile-dropdown"
                    alt="Profile Icon"
                  />
                }
              >
                <NavDropdown.Item eventKey="4.0" disabled>
                  {currentUser?.firstName}
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile" eventKey="4.1">
                  <FontAwesomeIcon className="me-2" icon={faUser} /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => logoutUser(dispatch, router)}
                  eventKey="4.2"
                >
                  <FontAwesomeIcon className="me-2" icon={faRightFromBracket} />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
                <Button
                  onClick={() => router.push("/sign-up")}
                  className="me-lg-3"
                  variant="outline-success"
                >
                  Sign Up <FontAwesomeIcon icon={faUserPlus} />
                </Button>
                <Button
                  onClick={() => router.push("/login")}
                  className="mt-1 mt-lg-0"
                  variant="success"
                >
                  Login <FontAwesomeIcon icon={faSignInAlt} />
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
