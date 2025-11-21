import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "~/components/ui/pagination";

type Props = {
  page: number;
  pageSize: number;
  totalItems: number;

  onPageChange: (newPage: number) => void;
};

export const UsePagenation = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <Pagination className="mt-6 flex justify-center">
      <PaginationContent className="flex items-center space-x-2">
        <PaginationItem>
          <PaginationLink
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            className="px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-full transition-all hover:bg-teal-600 focus:outline-none"
          >
            前
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => onPageChange(index + 1)}
              isActive={page === index}
              className={`
                      px-4 py-2 text-sm font-semibold rounded-full transition-all 
                      ${
                        page === index
                          ? "bg-teal-500 text-white"
                          : "text-gray-700 hover:bg-teal-100"
                      }
                    `}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
            className="px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-full transition-all hover:bg-teal-600 focus:outline-none"
          >
            次
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
