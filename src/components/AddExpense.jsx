export default function AddExpense() {
  return (
    <>
      <div>
        <form>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Insert Description"
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Insert Category"
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="Insert Amount"
          />

          <label htmlFor="date">Date:</label>
          <input type="text" id="date" name="date" placeholder="Insert Date" />

          <button type="button">Cancel</button>
          <button type="button">Add</button>
        </form>
      </div>
    </>
  );
}
