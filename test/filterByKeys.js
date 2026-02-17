'use strict';

QUnit.module('Тестируем функцию filterObjectByKeys', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const keysToFilter = ['a', 'c'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, c: 3 }, 'Объект должен содержать только указанные ключи');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const keysToFilter = ['b', 'e'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { b: { c: 2, d: 3 }, e: 4 }, 'Вложенные объекты должны быть скопированы');
    });

    QUnit.test('Работает правильно отсутствующими ключами', (assert) => {
        const originalObject = { a: 1, b: 2 };
        const keysToFilter = ['a', 'c']; // 'c' отсутствует
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1 }, 'Отсутствующие ключи должны быть проигнорированы');
    });

    QUnit.test('Работает правильно с массивом', (assert) => {
        const originalObject = { a: 1, b: [1, 2, 3, 4, 5] };
        const keysToFilter = ['a', 'b'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        assert.deepEqual(result, { a: 1, b: [1, 2, 3, 4, 5] }, 'Массив должен быть скопирован');
        result.b[0] = 999; // Изменяем элемент массива
        assert.deepEqual(originalObject, { a: 1, b: [1, 2, 3, 4, 5] }, 'Оригинальный массив не должен измениться');
    });

    QUnit.test('Работает правильно с глубокой копией', (assert) => {
        const originalObject = { a: 1, b: { c: { e: 4 }, d: 3 } };
        const keysToFilter = ['b'];
        const result = filterObjectByKeys(originalObject, keysToFilter);

        // Проверяем, что вложенный объект был скопирован глубоко
        assert.deepEqual(result, { b: { c: { e: 4 }, d: 3 } }, 'Вложенные объекты должны быть скопированы');
        result.b.c.e = 5; // Изменяем вложенный объект
        assert.deepEqual(originalObject, { a: 1, b: { c: { e: 4 }, d: 3 } }, 'Оригинальный объект не должен измениться');
    });


    // Негативные тесты
    QUnit.test('Работает правильно с не объектами', (assert) => {
        const result1 = filterObjectByKeys(null, ['a']);
        const result2 = filterObjectByKeys(42, ['a']);
        const result3 = filterObjectByKeys('string', ['a']);
        const result4 = filterObjectByKeys(undefined, ['a']);

        assert.deepEqual(result1, {}, 'null должен возвращать пустой объект');
        assert.deepEqual(result2, {}, 'Число должно возвращать пустой объект');
        assert.deepEqual(result3, {}, 'Строка должна возвращать пустой объект');
        assert.deepEqual(result4, {}, 'undefined должен возвращать пустой объект');
    });
});
