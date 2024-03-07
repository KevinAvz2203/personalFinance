interface Category {
  id: number;
  name: string;
}

// Filter out 'Income' category
export const filterCategories = (categories: Category[]) => {
  return categories.filter((cate) => cate.name !== "Income");
};

// Get the max expense from the array and use Math.ceil to return a value with a 100 increment
// this functions at the limit for the Progress bar
export const calculateRoundedExpense = (gastos: number[]) => {
  const maxExpense = Math.max(...gastos);
  return Math.ceil(maxExpense / 1000) * 1000;
};

// Receives an array of expected expenses and and an array of filtered categories (without income)
export const sortGastosWithCategories = (
  gastosPrevistos: number[],
  filteredCategories: Category[]
) => {
  // Map each expected expense (gasto) to an object containing gasto and its corresponding category
  // The index of gastosPrevistos is used to access the corresponding category in filteredCategories
  const gastosWithCategories = gastosPrevistos.map((gasto, index) => ({
    gasto, // The expected expense
    category: filteredCategories[index], // The corresponding category
  }));

  // Sort the array of objects based on the expected expense (gasto) in descending order
  gastosWithCategories.sort((a, b) => b.gasto - a.gasto);

  // Return the sorted array of objects from greater to smaller
  return gastosWithCategories;
};

// extract sorted expenses and categories
export const extractSortedData = (
  sortedGastosWithCategories: {
    gasto: number;
    category: Category;
  }[]
) => {
  const gastosSorted = sortedGastosWithCategories.map(({ gasto }) => gasto);
  const categoriesLabelsSorted = sortedGastosWithCategories.map(
    ({ category }) => category.name
  );

  return { gastosSorted, categoriesLabelsSorted };
};
