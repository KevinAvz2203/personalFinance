export default function AddExpense() {
  return (
    <>
      <form action="">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="labelForm text-gray-700" for="description">
              Description
            </label>
            <input
              className="inputForm bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              type="text"
              placeholder="Insert Description"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="labelForm text-gray-700" for="category">
              Category
            </label>
            <select
              name=""
              id="category"
              className="inputForm bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Insert Category</option>
              <option value="">Category 1</option>
              <option value="">Category 2</option>
              <option value="">Category 3</option>
              <option value="">Category 4</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="labelForm text-gray-700" for="amount">
              Amount
            </label>
            <input
              className="inputForm bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              type="text"
              placeholder="Insert Amount"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="labelForm text-gray-700" for="date">
              Date
            </label>
            <input
              className="inputForm bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
              id="date"
              type="text"
              placeholder="Insert Date"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Add
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
