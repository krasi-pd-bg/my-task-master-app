// Категории по подразбиране, създавани автоматично при регистрация,
// плюс избора от икони/цветове, показван в AddCategoryModal.
// Централизирани тук, за да не се дублират между categoryService.js
// и AddCategoryModal.js.

export const DEFAULT_CATEGORIES = [
    { name: 'Work', icon: 'briefcase-outline', color: '#4A90E2' },
    { name: 'Personal', icon: 'person-outline', color: '#E24A4A' },
    { name: 'Study', icon: 'book-outline', color: '#8E44AD' },
    { name: 'Shopping', icon: 'cart-outline', color: '#27AE60' },
    { name: 'Health', icon: 'heart-outline', color: '#E67E22' },
];

export const CATEGORY_ICONS = [
    "briefcase-outline",
    "person-outline",
    "book-outline",
    "cart-outline",
    "heart-outline",
    "star-outline",
    "alarm-outline",
    "calendar-outline",
];

export const CATEGORY_COLORS = [
    "#4A90E2",
    "#E24A4A",
    "#8E44AD",
    "#27AE60",
    "#E67E22",
    "#2C3E50",
    "#16A085",
    "#D35400",
];
