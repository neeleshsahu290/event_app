
const BASE_URL ="https://app.ticketmaster.com/discovery/v2/";
const getHeaders = () => {
  const getToken = () => {
    return "";
  };

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};

class ApiMethods {
  // MAIN API WRAPPER
  static async apiRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: Record<string, any>
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: getHeaders(),
    };

    // Add body only for POST/PUT
    if (body && method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    let response: Response;

    try {
      response = await fetch(BASE_URL+url, options);
    } catch (err) {
      throw new Error("Network request failed");
    }

    // Parse error
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "API Error");
    }

    // Parse JSON once
    const json = await response.json();
    console.log("API RESPONSE:", json);

    return json as T;
  }

  // GET
  static get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.apiRequest<T>("GET", url + query);
  }

  // POST
  static post<T>(url: string, data: Record<string, any>): Promise<T> {
    return this.apiRequest<T>("POST", url, data);
  }

  // PUT
  static put<T>(url: string, data: Record<string, any>): Promise<T> {
    return this.apiRequest<T>("PUT", url, data);
  }

  // DELETE
  static delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.apiRequest<T>("DELETE", url + query);
  }
}

export default ApiMethods;
