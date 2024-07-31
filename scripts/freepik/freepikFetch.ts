/* const query = "dog walk";
const page = 2; */

import { fetchSource } from "../broker";
import { imageMeta } from "../getimagelist";
import { FreePikSchema } from "./freepikSchema";
import RequestOptions from "./requestOptions";

export default (query: string, page: number): Promise<imageMeta[]> => {
  const url = `www.freepik.com/api/regular/search?locale=en&order=relevance&term=${encodeURI(
    query
  )}&${page > 1 ? `page=${page}` : ""}`;

  const splitedUrl: string[] = url.split("/");

  const hostname: string = splitedUrl[0];
  const path: string = "/" + splitedUrl.slice(1).join("/");

  const requestOptions = new RequestOptions(hostname, path);

  return new Promise((resolve, reject) => {
    fetchSource(requestOptions)
      .then((response: string) => {
        const parsedResponse: FreePikSchema = JSON.parse(response);
        const totalPages: number = parsedResponse.pagination.total;

        const imageRecords = parsedResponse.items.map(
          (imageRecord): imageMeta => {
            return {
              preview: imageRecord.preview.url,
              source: imageRecord.url,
            };
          }
        );

        resolve(imageRecords);
      })
      .catch(reject);
  });
};