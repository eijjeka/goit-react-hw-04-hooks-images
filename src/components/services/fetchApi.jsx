const BASE_URL = "https://pixabay.com/api/";

export function fetchImage(query, page = 1) {
  const options = new URLSearchParams({
    key: "25546226-16034f7c6795ec18e54b1dcda",
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
    page: page,
  });

  const url = `${BASE_URL}?${options}`;

  return fetch(url).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error("Image not found"));
    }
    console.log();
    return response.json();
  });
}
