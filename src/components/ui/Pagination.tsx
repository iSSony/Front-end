// Imports

type IPaginationProps = {
  activePage: number;
  setActivePage: (page: number) => void;
  totalPage: number;
};

const Pagination = ({
  activePage,
  setActivePage,
  totalPage,
}: IPaginationProps) => {
  return (
    <div className="d-flex">
      <nav aria-label="...">
        <ul className="pagination m-0">
          {
            <li
              className={activePage === 1 ? "page-item disabled" : "page-item"}
            >
              <button
                onClick={() => setActivePage(activePage - 1)}
                className="page-link text-success"
                aria-label="Previous"
              >
                Previous
              </button>
            </li>
          }
          {[...Array(totalPage).keys()].map((number) => (
            <li
              key={number}
              className={
                number === activePage - 1 ? "page-item active" : "page-item"
              }
            >
              <button
                onClick={() => setActivePage(number + 1)}
                className={
                  number === activePage - 1
                    ? "page-link bg-success text-white border-success"
                    : "page-link text-success"
                }
              >
                {number + 1}
              </button>
            </li>
          ))}
          {
            <li
              className={
                activePage === totalPage ? "page-item disabled" : "page-item"
              }
            >
              <button
                onClick={() => setActivePage(activePage + 1)}
                className="page-link text-success"
                aria-label="Next"
              >
                Next
              </button>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
