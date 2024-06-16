export const parseFormData = (dados) => {
    const object = {};
    dados.forEach((value, key) => object[key] = value);
    return object
}