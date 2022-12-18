import Prismic from "prismic-javascript";

export const apiEndpoint = "https://notebook.cdn.prismic.io/api/v2";

// Client method to query documents from the Prismic repo
export const Client = Prismic.client(apiEndpoint);
