export default class RequestOptions {
  hostname: string;
  path: string;

  method: string = "GET";
  headers: Record<string, string> = {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    origin: "",
    referer: "",
  };

  constructor(hostname: string, path: string) {
    this.hostname = hostname;
    this.path = path;

    this.headers.origin = hostname;
    this.headers.referer = hostname;
  }
}
