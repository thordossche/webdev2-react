import axios from "axios";

let mapping = {
  user: undefined,
  auction: undefined,
  product: undefined,
  offer: undefined,
};

const apiClient = axios.create({
  baseURL: "https://groep26.webdev.ilabt.imec.be",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/vnd.auction+json",
    "Acces-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE",
  },
});

export default {
  getMapping() {
    return axios.get("https://groep26.webdev.ilabt.imec.be");
  },

  setMapping(response) {
    mapping.user = response.users.replace(
      "https://groep26.webdev.ilabt.imec.be",
      ""
    );
    mapping.auction = response.auctions.replace(
      "https://groep26.webdev.ilabt.imec.be",
      ""
    );
    mapping.product = response.products.replace(
      "https://groep26.webdev.ilabt.imec.be",
      ""
    );
    mapping.offer = response.offers.replace(
      "https://groep26.webdev.ilabt.imec.be",
      ""
    );
  },
  async getAuctions() {
    if (mapping.auction === undefined) {
      await this.getMapping()
        .then((response) => this.setMapping(response.data))
        .catch((error) => console.log(error));
      return apiClient.get(mapping.auction);
    } else {
      return apiClient.get(mapping.auction);
    }
  },
  async getUsers() {
    if (mapping.auction === undefined) {
      await this.getMapping()
        .then((response) => this.setMapping(response.data))
        .catch((error) => console.log(error));
      return apiClient.get(mapping.user);
    } else {
      return apiClient.get(mapping.user);
    }
  },
  get(url) {
    return apiClient.get(url);
  },
  async getType(type, id) {
    if (mapping.auction === undefined) {
      await this.getMapping()
        .then((response) => this.setMapping(response.data))
        .catch((error) => console.log(error));
      return apiClient.get(mapping[type] + "/" + id);
    } else {
      return apiClient.get(mapping[type] + "/" + id);
    }
  },
  async create(type, object) {
    if (mapping.auction === undefined) {
      await this.getMapping()
        .then((response) => this.setMapping(response.data))
        .catch((error) => console.log(error));
      return apiClient.post(mapping[type], object);
    } else {
      return apiClient.post(mapping[type], object);
    }
  },
  delete(url) {
    return apiClient.delete(url);
  },
  update(url, object) {
    return apiClient.patch(url, object);
  },
};
