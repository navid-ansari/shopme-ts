//import axios from "axios";
import { get, throwError } from "../../utils/rest-client";
import {
 InputError,
 AuthenticationError,
 ForbiddenError,
 NotFoundError,
 InternalServerError,
 BadResponseError,
} from "../../utils/error-handler";

import MockedProducts from "../mocks/products";
import { IProduct } from "../types/Product";

//jest.mock("axios");
//const mocked = jest.mocked;

let mockedProducts = [] as IProduct[];
describe("Rest client", () => {
 beforeAll(() => {});
 beforeEach(() => {
  jest.clearAllMocks();
  mockedProducts = MockedProducts();
 });
 afterEach(() => {});
 afterAll(() => {});
 describe("Get Request", () => {
  test("Get request: status 200", async () => {
   const url = "http://api/test-url";
   const status = 200;
   const mockResponse = {
    json: () => Promise.resolve(mockedProducts),
    status,
    ok: true,
   };

   const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve(mockResponse as Response));
   const response = await get({ url });
   console.log(response);
   expect(fetchMock).toHaveBeenCalledWith(url);
   expect(fetchMock).toHaveBeenCalledTimes(1);
   expect(response.length).toEqual(3);
  });

  test.only("Get request: status 400", async () => {
   const url = "http://api/test-url";
   const errorMessage = "Bad client request";
   const status = 400;
   const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
     Promise.reject({ response: new InputError(errorMessage) })
    );
   const response = await get({ url });
   //await expect(get({ url })).rejects.toThrow("Bad client request");
   //console.log(response);
   //expect(fetchMock).toHaveBeenCalledWith(url);
   //expect(fetchMock).toHaveBeenCalledTimes(1);

   /*const url = "http://api/test-url";
   const errorMessage = "Bad client request";
   const axiosErrorResponse = { response: new InputError(errorMessage) };

   axios.get.mockRejectedValue(axiosErrorResponse);
   await expect(get({ url })).rejects.toThrow(axiosErrorResponse.message);
   expect(axios.get).toHaveBeenCalledWith(url);
   expect(axios.get).toHaveBeenCalledTimes(1);*/
  });

  /*test("Get request: status 401", async () => {
   const url = "http://api/test-url";
   const errorMessage = "Unauthorized request";
   const axiosErrorResponse = {
    response: new AuthenticationError(errorMessage),
   };

   axios.get.mockRejectedValue(axiosErrorResponse);
   await expect(get({ url })).rejects.toThrow(axiosErrorResponse.message);
   expect(axios.get).toHaveBeenCalledWith(url);
   expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("Get request: status 403", async () => {
   const url = "http://api/test-url";
   const errorMessage = "Forbidden request";
   const axiosErrorResponse = {
    response: new ForbiddenError(errorMessage),
   };

   axios.get.mockRejectedValue(axiosErrorResponse);
   await expect(get({ url })).rejects.toThrow(axiosErrorResponse.message);
   expect(axios.get).toHaveBeenCalledWith(url);
   expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("Get request: status 404", async () => {
   const url = "http://api/test-url";
   const errorMessage = "Invalid client request url";
   const axiosErrorResponse = { response: new NotFoundError(errorMessage) };

   axios.get.mockRejectedValue(axiosErrorResponse);
   await expect(get({ url })).rejects.toThrow(axiosErrorResponse.message);
   expect(axios.get).toHaveBeenCalledWith(url);
   expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("Get request: status 500", async () => {
   const url = "http://api/test-url";
   const errorMessage = "Internal server error";
   const axiosErrorResponse = {
    response: new InternalServerError(errorMessage),
   };

   axios.get.mockRejectedValue(axiosErrorResponse);
   await expect(get({ url })).rejects.toThrow(axiosErrorResponse.message);
   expect(axios.get).toHaveBeenCalledWith(url);
   expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("Get request: status 502", async () => {
   const url = "http://api/test-url";
   const errorMessage = "Invalid response from gateway server";
   const axiosErrorResponse = {
    response: new BadResponseError(errorMessage),
   };

   axios.get.mockRejectedValue(axiosErrorResponse);
   await expect(get({ url })).rejects.toThrow(axiosErrorResponse.message);
   expect(axios.get).toHaveBeenCalledWith(url);
   expect(axios.get).toHaveBeenCalledTimes(1);
  });*/
 });
 /*describe("Throw error function", () => {
  test("Input error: 400", () => {
   const status = { status: 400 };
   expect(() => {
    throwError(status);
   }).toThrow(new InputError("Bad client request"));
  });

  test("Authentication error: 401", () => {
   const status = { status: 401 };
   expect(() => {
    throwError(status);
   }).toThrow(new InputError("Unauthorized request"));
  });

  test("Forbidden error: 403", () => {
   const status = { status: 403 };
   expect(() => {
    throwError(status);
   }).toThrow(new InputError("Forbidden request"));
  });

  test("Not found error: 404", () => {
   const status = { status: 404 };
   expect(() => {
    throwError(status);
   }).toThrow(new InputError("Invalid client request url"));
  });

  test("Internal server error: 500", () => {
   const status = { status: 500 };
   expect(() => {
    throwError(status);
   }).toThrow(new InputError("Internal server error"));
  });

  test("Bad response error: 502", () => {
   const status = { status: 502 };
   expect(() => {
    throwError(status);
   }).toThrow(new InputError("Invalid response from gateway server"));
  });
 });*/
});
