/*
   Função utilitária para converter FormData em um objeto JavaScript.
   - Útil para converter dados de formulários (enviados como FormData) 
   em um formato adequado para manipulação no JavaScript.
*/

// Exporta a função `parseFormData` como uma constante, permitindo seu uso em outros módulos da aplicação.

export const parseFormData = (dados) => {
    const object = {};
    dados.forEach((value, key) => object[key] = value);
    return object
}