const isCategory = (categories, category) => categories.some((c) => c.slug === category);


module.exports = {
    isCategory
};