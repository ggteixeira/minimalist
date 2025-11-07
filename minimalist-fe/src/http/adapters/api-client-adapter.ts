interface ApiClientAdapterProps extends RequestInit {
  params?: object;
  data?: unknown;
}

export const isHttpError = (err: object): boolean =>
  Object.prototype.isPrototypeOf.call(HTTPError.prototype, err);

class HTTPError extends Error {
  constructor(message: string, status: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }

  public status: number;
}

export async function apiClientAdapter<T>(
  url: string,
  { params, data, method, ...rest }: ApiClientAdapterProps,
): Promise<T> {
  let parsedUrl = url.startsWith("http")
    ? url
    : `https://localhost:7071${url.startsWith("/") ? url : `/${url}`}`;

  if (params) {
    parsedUrl +=
      "?" + new URLSearchParams(params as Record<string, string>).toString();
  }

  const request = await fetch(parsedUrl, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    ...rest,
  });

  let response;

  switch (true) {
    case request.headers.get("Content_Type") === "application/octet-stream":
      response = await request
        .blob()
        .catch(async () => await request.text().catch(() => null));
      break;
    case request.status === 204:
      response = null;
      break;
    default:
      response = await request
        .json()
        .catch(async () => await request.text().catch(() => null));
      break;
  }

  if (!request.ok) {
    throw new HTTPError(response.message, request.status);
  }

  return response as T;
}

export type BodyType<BodyData> = BodyData;
