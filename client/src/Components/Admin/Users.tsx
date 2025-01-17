import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { User } from '@/Types/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const sampleUsers: User[] = [
  {
    id: '1',
    profilePic: 'https://ui-avatars.com/api/?name=John+Doe',
    userName: 'johndoe',
    name: 'John Doe',
    friendsCount: 10,
    groupsCount: 5,
    createdAt: '2023-01-01T10:00:00.000Z',
  },
  {
    id: '2',
    profilePic: 'https://ui-avatars.com/api/?name=Jane+Smith',
    userName: 'janesmith',
    name: 'Jane Smith',
    friendsCount: 8,
    groupsCount: 3,
    createdAt: '2023-02-15T10:00:00.000Z',
  },
  {
    id: '3',
    profilePic: 'https://ui-avatars.com/api/?name=Bob+Johnson',
    userName: 'bobjohnson',
    name: 'Bob Johnson',
    friendsCount: 15,
    groupsCount: 7,
    createdAt: '2023-03-20T10:00:00.000Z',
  },
  // Add more sample users as needed
];

const Users = () => {
  const data = useMemo(() => sampleUsers, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'profilePic',
        Cell: ({ value }: { value: string }) => (
          <Avatar className="w-10 h-10">
            <AvatarImage src={value} alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ),
      },
      {
        Header: 'Username',
        accessor: 'userName',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Friends',
        accessor: 'friendsCount',
      },
      {
        Header: 'Groups',
        accessor: 'groupsCount',
      },
      {
        Header: 'Date Joined',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => new Date(value).toLocaleDateString(),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full bg-transparent">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;