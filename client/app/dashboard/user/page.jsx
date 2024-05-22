'use client'
import { useEffect, useState, useRef } from "react";
import { Button, Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { format } from "date-fns";

import { getAllUser } from "@/app/api/route";

const User = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const fetchAllUser = async() => {
        try {
            const data = await getAllUser(accessToken);
            setUsers(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd-MM-yyyy HH:mm:ss');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-lime-600';
            case 'inactive':
                return 'bg-slate-400';
            case 'deleted':
                return 'bg-rose-600';
            default:
                return '';
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, record) => (
                <img
                    src={`${process.env.NEXT_PUBLIC_API_IMAGES}/${record._id}/${text}`}
                    alt="avatar"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            ...getColumnSearchProps('_id')
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname')
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'AccountStatus',
            dataIndex: 'accountStatus',
            key: 'accountStatus',
            filters: [
                { text: 'Active', value: 'active' },
                { text: 'Inactive', value: 'inactive' },
                { text: 'Deleted', value: 'deleted' },
            ],
            onFilter: (value, record) => record.accountStatus === value,
            render: (text) => (
                <span className={`flex items-center justify-center w-16 px-2.5 py-1 rounded font-semibold text-white ${getStatusColor(text)}`}>
                    {text}
                </span>
            ),
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => formatDate(text),
            sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text) => formatDate(text),
            sorter: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <div className="flex flex-col justify-center gap-2 w-full">
                    <Space className="flex items-center w-full">
                        <div className="bg-[#2b9cd2] text-white duration-300 px-2 py-1 w-15 rounded font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => handleUpdate(record)}>Update</div>
                        <div className="bg-[#e11d48] text-white duration-300 px-2 py-1 w-15 rounded font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => handleDelete(record)}>Delete</div>
                    </Space>
                    <Space className="flex items-center w-full">
                        <div className="bg-[#65a30d] text-white duration-300 px-2 py-1 w-15 rounded font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => handleUpdate(record)}>Active</div>
                        <div className="bg-[#94a3b8] text-white duration-300 px-2 py-1 w-15 rounded font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => handleDelete(record)} >Inactive</div>
                    </Space>
                </div>
            ),
        },
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleUpdate = async(data) => {
        console.log(data);
    }

    const handleDelete = async(data) => {
        console.log(data);
    }

    return ( 
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <Button onClick={fetchAllUser} className="bg-[#407dc0] font-semibold text-white w-1/12">Reload</Button>
                <div className="text-xl"><span className="font-semibold">Total User:</span>  {users.length}</div>
            </div>
            <Table dataSource={users} columns={columns} rowKey="_id" scroll={{ x: 1500, y: 600 }} rowSelection={rowSelection}/>
        </div>
    );
}

export default User;
