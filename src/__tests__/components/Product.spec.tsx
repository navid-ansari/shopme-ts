import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { renderComponent } from "../test-utils/component-renderer";
import { reRenderComponent } from "../test-utils/component-renderer";

import Product from "../../components/Product";

// mocks
import MockedProduct from "../mocks/product";
import { IProduct } from "../types/Product";

const mockOnClick = jest.fn();

describe("Product component", () => {
 let mockedProduct = {} as IProduct;
 beforeAll(() => {});
 beforeEach(() => {
  mockedProduct = MockedProduct();
  /*const renderWithRouter = (ui, { route = "/" } = {}) => {
   window.history.pushState({}, "Test page", route);

   return render(ui, { wrapper: BrowserRouter });
  };
  renderWithRouter(<Product />);*/
 });
 afterEach(() => {});
 afterAll(() => {});
 test("Should render component", () => {
  renderComponent(
   <MemoryRouter>
    <Product product={mockedProduct} />
   </MemoryRouter>
  );
  expect(screen.getByTestId("content")).not.toBeNull();
 });

 test("check product prop", () => {
  let actualProduct = {};

  const mockOnClick = (mockedProduct: any) => {
   actualProduct = mockedProduct;
  };

  renderComponent(
   <MemoryRouter>
    <Product product={mockedProduct} toggleCart={mockOnClick} />
   </MemoryRouter>
  );

  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(actualProduct).not.toBeNull();
  expect(actualProduct).not.toBe({});
  //expect(actualProduct.title).toBe(mockedProduct.title);
  expect(actualProduct).toEqual(mockedProduct);
 });

 test("check rendered product values", () => {
  renderComponent(
   <MemoryRouter>
    <Product product={mockedProduct} />
   </MemoryRouter>
  );

  // image assertion
  const image = screen.getByRole("img");
  expect(image).toHaveAttribute(
   "src",
   "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  );

  // product heading
  const heading = screen.getByTestId("product-title");
  expect(heading).toHaveTextContent(
   "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
  );

  // product description
  const description = screen.getByTestId("product-description");
  expect(description).toHaveTextContent(
   "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
  );

  // price
  const price = screen.getByTestId("product-price");
  expect(price).toHaveTextContent(String(109.95));

  // add to cart button
  const button = screen.getByTestId("add-to-cart-btn");
  expect(button).toHaveTextContent("Add To Cart");
 });

 test("add to cart button", () => {
  // before click
  const { rerender } = renderComponent(
   <MemoryRouter>
    <Product
     product={mockedProduct}
     toggleCart={mockOnClick}
     toggleFavorite={mockOnClick}
    />
   </MemoryRouter>
  );

  const addToCartBtn = screen.getByTestId("add-to-cart-btn");
  expect(addToCartBtn).toHaveTextContent("Add To Cart");

  // after click
  mockedProduct = {
   ...MockedProduct(),
   isAddedToCart: true,
  };
  const component = (
   <MemoryRouter>
    <Product
     product={mockedProduct}
     toggleCart={mockOnClick}
     toggleFavorite={mockOnClick}
    />
   </MemoryRouter>
  );

  reRenderComponent({ component, rerender });

  const addToCartBtnClick = screen.getByTestId("add-to-cart-btn");
  fireEvent.click(addToCartBtnClick);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
  expect(addToCartBtnClick).toHaveTextContent("Remove From Cart");
 });

 test("remove from cart button", () => {
  mockedProduct = MockedProduct({ isAddedToCart: true });
  // before click
  const { rerender } = renderComponent(
   <MemoryRouter>
    <Product product={mockedProduct} toggleCart={mockOnClick} />
   </MemoryRouter>
  );

  const removeFromCartBtn = screen.getByTestId("add-to-cart-btn");
  expect(removeFromCartBtn).toHaveTextContent("Remove From Cart");

  // after click
  mockedProduct = {
   ...MockedProduct(),
   isAddedToCart: false,
  };

  const component = (
   <MemoryRouter>
    <Product
     product={mockedProduct}
     toggleCart={mockOnClick}
     toggleFavorite={mockOnClick}
    />
   </MemoryRouter>
  );

  reRenderComponent({ component, rerender });

  const removeFromCartBtnClick = screen.getByTestId("add-to-cart-btn");
  fireEvent.click(removeFromCartBtnClick);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
  expect(removeFromCartBtnClick).toHaveTextContent("Add To Cart");
 });

 test("add to favorite button", () => {
  // before click
  const { rerender } = renderComponent(
   <MemoryRouter>
    <Product product={mockedProduct} toggleFavorite={mockOnClick} />
   </MemoryRouter>
  );

  const heartIconLine = screen.getByTestId("toggle-favorite-line");
  expect(heartIconLine).toHaveClass("ri-heart-line");

  // after click
  mockedProduct = {
   ...MockedProduct(),
   isFavorite: true,
  };

  const component = (
   <MemoryRouter>
    <Product
     product={mockedProduct}
     toggleCart={mockOnClick}
     toggleFavorite={mockOnClick}
    />
   </MemoryRouter>
  );

  reRenderComponent({ component, rerender });
  const toggleFavoriteBtnClick = screen.getByTestId("add-to-cart-btn");
  fireEvent.click(toggleFavoriteBtnClick);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
  const heartIconFill = screen.getByTestId("toggle-favorite-fill");
  expect(heartIconFill).toHaveClass("ri-heart-fill");
 });

 test("remove from favorite button", () => {
  mockedProduct = {
   ...MockedProduct(),
   isFavorite: true,
  };

  // before click
  const { rerender } = renderComponent(
   <MemoryRouter>
    <Product product={mockedProduct} toggleFavorite={mockOnClick} />
   </MemoryRouter>
  );

  const heartIconFill = screen.getByTestId("toggle-favorite-fill");
  expect(heartIconFill).toHaveClass("ri-heart-fill");

  mockedProduct = {
   ...MockedProduct(),
   isFavorite: false,
  };

  // after click
  const component = (
   <MemoryRouter>
    <Product
     product={mockedProduct}
     toggleCart={mockOnClick}
     toggleFavorite={mockOnClick}
    />
   </MemoryRouter>
  );

  reRenderComponent({ component, rerender });
  const toggleFavoriteBtnClick = screen.getByTestId("add-to-cart-btn");
  fireEvent.click(toggleFavoriteBtnClick);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
  const heartIconLine = screen.getByTestId("toggle-favorite-line");
  expect(heartIconLine).toHaveClass("ri-heart-line");
 });
});
