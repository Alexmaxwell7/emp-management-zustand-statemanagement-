import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import FormField from "./FormField";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ datas }: any) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = useMemo(() => datas, [datas]);

  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [correspondingId, setCorrespondingId] = useState("");
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: any;
  }>({
    title: "",
    message: "",
  });

  const handleEditClick = (id: string) => {
    setModalContent({
      title: "Edit Item",
      message: <FormField id={id} onClose={() => setModalOpen(false)} />,
    });
    setModalOpen(true);
    setCorrespondingId("");
  };

  const handleDeleteClick = (id: string) => {
    setModalContent({
      title: "Warning",
      message: "Are you sure you want to delete this item?",
    });
    setModalOpen(true);
    setCorrespondingId(id);
  };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: ({ column }: any) => {
          return (
            <div
              className="sm:rounded-tl-md sm:rounded-bl-md"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Name
            </div>
          );
        },
        accessorKey: "name",
        enableSorting: true,
        cell: ({ row }: any) => (
          <span className="text-xs text-[#595959] capitalize">
            {row.getValue("name")}
          </span>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        disableSortBy: true,
        cell: ({ row }: any) => (
          <span className="text-xs text-[#595959]">
            {row.getValue("email")}
          </span>
        ),
      },
      {
        header: "Employee ID",
        accessorKey: "employeeId",
        disableSortBy: true,
        cell: ({ row }: any) => (
          <span className="text-xs text-[#595959] ml-4">
            {row.getValue("employeeId")}
          </span>
        ),
      },
      {
        header: "Mobile Number",
        accessorKey: "mobileNumber",
        disableSortBy: true,
        cell: ({ row }: any) => (
          <span className="text-xs text-[#595959] ml-4">
            {row.getValue("mobileNumber")}
          </span>
        ),
      },
      {
        header: "Job Role",
        accessorKey: "JobRole",
        disableSortBy: true,
        cell: ({ row }: any) => (
          <span className="text-xs text-[#595959] ml-4 capitalize">
            {row.getValue("JobRole")}
          </span>
        ),
      },
      {
        header: ({ column }: any) => {
          return (
            <div
              className="ml-8"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Actions
            </div>
          );
        },
        // header: 'Actions',
        accessorKey: "id",
        enableSorting: true,
        cell: ({ row }: any) => (
          <div className="flex justify-center">
            <FaEdit
              className="text-lg text-green-700 mr-4 cursor-pointer"
              onClick={() => handleEditClick(row?.original?.id)}
            />
            <MdDelete
              className="text-lg text-red-500 cursor-pointer"
              onClick={() => handleDeleteClick(row?.original?.id)}
            />
          </div>
        ),
      },
    ],
    []
  );
  const table = useReactTable({
    data: data,
    columns,
    initialState: {
      sortBy: [{ id: "createdOn", desc: false }],
    } as any,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto bg-[#EEF9FF] p-4">
      <div className="container mx-auto lg:px-16 md:px-8 sm:px-4 px-2">
        <div className="flow-root">
          <div className="min-w-full py-2 align-middle bg-white">
            <h1 className="text-center font-bold mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Employee List
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 p-5">
              <Button
                onClick={() => navigate("/form")}
                className="w-full sm:w-auto lg:w-auto px-4 py-2 text-base sm:text-sm lg:text-lg"
                label="Add New Employee"
              />
              <Button
                onClick={handleLogout}
                className="w-full sm:w-auto lg:w-auto px-4 py-2 text-base sm:text-sm lg:text-lg"
                label="Logout"
              />
            </div>
            <div className="relative sm:overflow-x-auto overflow-x-scroll p-4">
              <table className="w-full table-auto min-w-[640px] sm:min-w-[700px] md:min-w-[800px] lg:min-w-[900px] text-left text-gray-500 dark:text-gray-400">
                <thead className="text-sm lg:text-base font-semibold bg-[#FFF3DA] text-darkblue">
                  {table.getHeaderGroups().map((headerGroup: any) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header: any) => (
                        <th key={header.id} className="p-4">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: any) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell: any) => (
                          <td
                            key={cell.id}
                            className="border-b border-gray-200 p-4 text-sm sm:text-base lg:text-lg"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="h-24 text-center text-sm lg:text-base"
                      >
                        No Result
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title={modalContent.title}
            message={modalContent.message}
            correspondingId={correspondingId}
          />
        </div>
      </div>
    </div>
  );
};
export default TableComponent;
