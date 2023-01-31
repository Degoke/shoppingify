export default function ShoppingListFooter() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Enter a name" />
        <button type="submit">Save</button>
      </form>
      <form>
        <button type="button">Cancel</button>
        <button type="submit">Complete</button>
      </form>
    </div>
  );
}
