export default function AddIncome() {
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

          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="Insert Amount"
          />

          <br />

          <label htmlFor="date">Date:</label>
          <input type="text" id="date" name="date" placeholder="Insert Date" />

          <br />

          <button type="button">Cancel</button>
          <button type="button">Add</button>
        </form>
      </div>
    </>
  );
}
