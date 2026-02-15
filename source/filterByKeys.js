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
const deepCopy = function(source)
{
    // Если значение является примитивом, возвращаем его напрямую
    if (source === null || typeof source !== 'object')
        return source;

    // Если значение является массивом, создаем новый массив и копируем элементы
    if (Array.isArray(source))
    {
        const copy = [];
        for (let i = 0; i < source.length; i++)
            copy[i] = deepCopy(source[i]);

        return copy;
    }

    // Если значение является объектом, создаем новый объект и копируем свойства
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
const filterObjectByKeys = function(obj, keys)
{
    // Проверяем входные данные
    if (obj === null || typeof obj !== 'object' || !Array.isArray(keys))
        return {};

    // Создаем пустой объект для результата
    let result = {};

    // Пробегаем по массиву ключей
    for (let key of keys)
    {
        // Если ключ в исходном объекте, глубоко копируем значение в результат
        if (key in obj)
            result[key] = deepCopy(obj[key]);
    }

    return result;
};
