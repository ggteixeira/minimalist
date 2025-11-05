interface ApiClientAdapterProps extends RequestInit {
  params?: object;
  data?: unknown;
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

  return fetch(parsedUrl, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    ...rest,
  }).then((response) => response.json());
}

export type BodyType<BodyData> = BodyData;
