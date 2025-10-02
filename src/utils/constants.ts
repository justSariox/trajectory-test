export const MAP_CONSTANTS = {
    DEFAULT_CENTER: [59.9311, 30.3609] as [number, number],
    DEFAULT_ZOOM: 10,
    TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
};

export const FORM_RULES = {
    name: [{ required: true, message: 'Пожалуйста, введите название автомобиля' }],
    model: [{ required: true, message: 'Пожалуйста, введите модель автомобиля' }],
    year: [{ required: true, message: 'Пожалуйста, введите год выпуска' }],
    color: [{ required: true, message: 'Пожалуйста, выберите цвет автомобиля' }],
    price: [{ required: true, message: 'Пожалуйста, введите цену автомобиля' }]
};