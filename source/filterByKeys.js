'use strict';

/**
 * Создает глубокую копию значения
 * 
 * @param {*} source - Исходное значение
 * @returns {*} - Глубокая копия исходного значения
 * 
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const copy = deepcopy(obj);
 * copy.b.c = 3;
 * console.log(obj.b.c); // 2 (оригинал не изменился)
 */
const deepCopy = (source) => {
    // Если значение является примитиво или функцией, возвращаем его напрямую
    if (source === null || typeof source === 'function' || typeof source !== 'object')
        return source;

    // Если значение является массивом, к каждому элементу применяем глубокое копирование
    if (Array.isArray(source))
        return source.map(deepCopy);

    // Если значение является объектом, создаем новый объект и глубоко копируем свойства
    const copy = {};
    for (let key of Object.keys(source))
        copy[key] = deepCopy(source[key]);

    return copy;
};


/**
 * Создает новый объект, содержащий только указанные ключи из исходного объекта
 * 
 * @param {*} obj - Исходный объект
 * @param {string[]} keys - Массив ключей для фильтрации
 * @returns {*} - Новый объект только с указанными ключами
 * 
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const filtered = filterObjectByKeys(obj, ['a']);
 * console.log(filtered); // { a: 1 }
 */
const filterObjectByKeys = (obj, keys) => {
    // Проверяем входные данные
    if (obj === null || typeof obj !== 'object' || !Array.isArray(keys))
        return {};

    // Возвращаем новый объект, содержащий только указанные ключи, с глубоким копированием значений
    return keys.reduce((result, key) => {
        if (key in obj)
            result[key] = deepCopy(obj[key]);
        return result;
    }, {});
};
