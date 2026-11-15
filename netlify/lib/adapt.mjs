export function adaptNodeHandler(apiHandler) {
  return async (event) => {
    let body;
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body;

    if (rawBody) {
      try {
        body = JSON.parse(rawBody);
      } catch {
        body = undefined;
      }
    }

    const req = {
      method: event.httpMethod,
      headers: event.headers || {},
      body,
      async *[Symbol.asyncIterator]() {
        if (rawBody) yield Buffer.from(rawBody);
      },
    };
    const response = {
      statusCode: 200,
      headers: {},
      body: "",
      setHeader(name, value) {
        this.headers[name] = value;
      },
      end(value = "") {
        this.body = value;
      },
    };

    await apiHandler(req, response);
    const isBinary = Buffer.isBuffer(response.body);
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: isBinary ? response.body.toString("base64") : String(response.body),
      isBase64Encoded: isBinary,
    };
  };
}
