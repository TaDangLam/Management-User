'use client'
import { useEffect, useState } from "react";
import { Button, Table } from 'antd';
import { format } from "date-fns";

import { getAllUser } from "@/app/api/route";

const User = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text) => formatDate(text),
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

    return ( 
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary">Reload</Button>
            </div>
            <Table dataSource={users} columns={columns} rowKey="_id" scroll={{ x: 1500, y: 600 }} rowSelection={rowSelection}/>
        </div>
    );
}
 
export default User;