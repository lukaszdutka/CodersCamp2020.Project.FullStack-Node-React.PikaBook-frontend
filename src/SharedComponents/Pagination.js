const Pagination = ({ page, setPage, list, limit }) => {
  const getMaxPageNumber = () => {
    const result = Math.ceil(list.length / limit);
    if (result < 1) return 1;
    return result;
  };

  const handlePageChange = (e, type) => {
    const maxNumber = getMaxPageNumber(limit);
    if (type === "next" && page < maxNumber) setPage(page + 1);
    if (type === "previous" && page > 1) setPage(page - 1);
    if (type === "input") setPage(e.target.value);
  };

  const maxPageNumber = getMaxPageNumber(limit);

  return (
    <div className="pagination">
      {page > 1 && (
        <button className="buttonArrow prev" onClick={(e) => handlePageChange(e, "previous")}>
          &#x2190;
        </button>
      )}
      <span>Page </span>
      <input
        type="number"
        value={page}
        min="1"
        max={maxPageNumber}
        onChange={(e) => handlePageChange(e, "input")}
      ></input>
      <span> out of {maxPageNumber}</span>
      {page < maxPageNumber && (
        <button className="buttonArrow next" onClick={(e) => handlePageChange(e, "next")}>&#x2192;</button>
      )}
    </div>
  );
};

export default Pagination;
