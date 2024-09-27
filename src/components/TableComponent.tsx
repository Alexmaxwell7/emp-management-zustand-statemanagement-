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
  const [correspondingId, setCorrespondingId] = useState('');
  const [modalContent, setModalContent] = useState<{ title: string; message: any }>({
    title: '',
    message: '',
  });

  const handleEditClick = (id: string) => {
    setModalContent({ title: 'Edit Item', message: <FormField id={id} onClose={() => setModalOpen(false)} /> });
    setModalOpen(true);
    setCorrespondingId('');
  };

  const handleDeleteClick = (id: string) => {
    setModalContent({ title: 'Warning', message: 'Are you sure you want to delete this item?' });
    setModalOpen(true);
    setCorrespondingId(id)
  };


  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: ({ column }:any) => {
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
        cell: ({ row }:any) => (
          <span className="text-xs text-[#595959] capitalize">
            {row.getValue("name")}
          </span>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        disableSortBy: true,
        cell: ({ row }:any) => (
          <span className="text-xs text-[#595959]">
            {row.getValue("email")}
          </span>
        ),
      },
      {
        header: "Employee ID",
        accessorKey: "employeeId",
        disableSortBy: true,
        cell: ({ row }:any) => (
          <span className="text-xs text-[#595959] ml-4">
            {row.getValue("employeeId")}
          </span>
        ),
      },
      {
        header: "Mobile Number",
        accessorKey: "mobileNumber",
        disableSortBy: true,
        cell: ({ row }:any) => (
          <span className="text-xs text-[#595959] ml-4">
            {row.getValue("mobileNumber")}
          </span>
        ),
      },
      {
        header: "Job Role",
        accessorKey: "JobRole",
        disableSortBy: true,
        cell: ({ row }:any) => (
          <span className="text-xs text-[#595959] ml-4 capitalize">
            {row.getValue("JobRole")}
          </span>
        ),
      },
      {
        header: ({ column }:any) => {
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
        cell: ({ row }:any) => (
          <div className="flex justify-center mr-8">
            <FaEdit className="text-lg text-green-700 mr-4 cursor-pointer" onClick={() => handleEditClick(row?.original?.id)} />
            <MdDelete className="text-lg text-red-500 cursor-pointer" onClick={() => handleDeleteClick(row?.original?.id)} />



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
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto bg-[#EEF9FF]">
      <div className=" w-[90%] m-auto lg:p-16 md:p-4 sm:overflow-x-auto xs:overflow-x-auto">
        <div className="flow-root">

          <div className="inline-block min-w-full py-2 align-middle bg-white">
            <h1 className="lg:text-3xl xs:text-2xl font-bold lg:text-center mt-6">Employee List</h1>
            <div className="lg:flex  lg:justify-end pr-6 gap-3">
              <Button onClick={() => navigate('/form')} className="fixed top-8 right-6 sm:flex lg:static lg:justify-end"
                label="Add New Employee" />

<Button   onClick={handleLogout} className="fixed top-8 right-6 sm:flex lg:static lg:justify-end"
                label="Logout" />

            </div>
            <div className='relative sm:mx-0 -mx-4 sm:overflow-x-auto'>
              <table className="lg:w-full  table md:w-[906px] sm:w-[910px] w-[702px] sm:mt-6 mt-[21px] sm:text-sm text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <thead className="sm:text-sm text-xs text-gray-1500 font-geistmedium sm:leading-[22px] leading-[8px] bg-light-blue/[70%]">

                  {table.getHeaderGroups().map((headerGroup:any) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header:any) => {
                        return (
                          <th
                            className="bg-[#FFF3DA] text-darkblue font-bold text-sm p-5"
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row:any) => (
                      <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell:any) => (
                          <td
                            key={cell.id}
                            className="border-b border-gray-200 dark:border-bg-hover p-4"
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
                      <td colSpan={columns.length} className="h-24 text-center">
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
