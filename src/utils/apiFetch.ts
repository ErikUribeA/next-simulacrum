const { API_HOST, API_TOKEN } = process.env

export function ApiData(url: string) {
    return fetch(`${API_HOST}/${url}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    }).then(res => res.json())
}

export function GetApiInfo(product: number) {
    return ApiData(`products/${product}`)
        .then(res => {
            // Desestructura los campos directamente desde la respuesta
            const { title, description, price } = res;
            return { title, description, price };
        })
        .catch(err => {
            console.error("Error fetching product data:", err);
            throw err; // Manejo del error
        });
}
