import Link from "next/link";

const Pagination = ({ currentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className=" bottom-[25%] mt-8 flex items-center justify-end">
      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={`/bookings?page=${page}`}
              className={`${
                currentPage == page
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              } rounded-md px-3 py-2 text-sm font-medium`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
