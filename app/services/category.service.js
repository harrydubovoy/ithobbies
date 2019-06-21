const isCategory = (categories, category) => categories.some(({ slug }) => slug === category);

const categoryParam = (categories, category, param) => {
    const currentCategory = categories.find(({ slug }) => slug === category);
    return currentCategory[param];
};

module.exports = {
    isCategory,
    categoryParam
};