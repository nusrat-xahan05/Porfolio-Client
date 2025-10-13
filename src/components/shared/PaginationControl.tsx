"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlProps {
    totalPages: number;
    currentPage: number;
}

export default function PaginationControl({ totalPages, currentPage }: PaginationControlProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-10 gap-x-2 font-bold">
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem className="text-[#FD705C]">
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page} className="text-[#FD705C]">
                        <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem className="text-[#FD705C]">
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
