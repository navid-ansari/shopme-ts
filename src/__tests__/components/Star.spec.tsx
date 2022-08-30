import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { renderComponent } from "../test-utils/component-renderer";

import Star from "../../components/Star";

describe("Star component", () => {
 beforeAll(() => {});
 beforeEach(() => {});
 afterEach(() => {});
 afterAll(() => {});

 test("Check if Star component is rendered", () => {
  renderComponent(
   <MemoryRouter>
    <Star />
   </MemoryRouter>
  );
  expect(screen.getByTestId("star")).not.toBeNull();
 });

 test("Check if Star icon is rendered", () => {
  renderComponent(
   <MemoryRouter>
    <Star />
   </MemoryRouter>
  );
  expect(screen.getByTestId("ri-star-fill")).not.toBeNull();
  const star = screen.queryAllByTestId("ri-star-fill");
  expect(star).toHaveLength(1);
 });
});
