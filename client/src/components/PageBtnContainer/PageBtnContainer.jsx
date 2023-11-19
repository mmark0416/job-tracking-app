import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "./PageBtnContainer.wrapper";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const navigate = useNavigate();

  const { search, pathname } = useLocation();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageBtn = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const rendePageBtns = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageBtn({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageBtn({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageBtn({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageBtn({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    pageButtons.push(
      addPageBtn({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = numOfPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{rendePageBtns()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nexPage = currentPage + 1;
          if (nexPage > numOfPages) {
            nexPage = 1;
          }
          handlePageChange(nexPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
