'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { format, differenceInYears, differenceInDays } from "date-fns";
import { BsCake } from "react-icons/bs";
import Swal from "sweetalert2";
import { getAllUser, updateStatusToActive, updateStatusToDeleted, updateStatusToInactive } from "@/app/api/route";

const User = () => {
    const router = useRouter();
    const accessToken = sessionStorage.getItem('accessToken');
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const fetchAllUser = async () => {
        try {
            const data = await getAllUser(accessToken);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd-MM-yyyy HH:mm:ss');
    };

    const formatDateOfBirth = (dateString) => {
        return format(new Date(dateString), 'dd-MM-yyyy');
    };

    const calculateAge = (dateOfBirth) => {
        return differenceInYears(new Date(), new Date(dateOfBirth));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-lime-700';
            case 'inactive':
                return 'bg-slate-400';
            case 'deleted':
                return 'bg-rose-800';
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
        onFilterDropdownOpenChange: visible => {
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
            render: (text, record) => text ? (
                <img
                    src={`${process.env.NEXT_PUBLIC_API_IMAGES}/${record._id}/${text}`}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                />
            ) : record.sex === 'male' ? (
                <img
                    src='/images.png'
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                />
            ) : (
                <img
                    src='/female.png'
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                />
            ),
            width: 90
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            ...getColumnSearchProps('_id'),
            width: 110
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (text, record) => {
                const isInactive = differenceInDays(new Date(), new Date(record.lastLogin)) > 14 && record.accountStatus !== 'deleted';
                return (
                    <span style={{ color: isInactive ? 'red' : 'black' }}>
                        {text}
                    </span>
                );
            },
            ...getColumnSearchProps('fullname'),
            width: 130
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateofbirth',
            render: (text) => formatDateOfBirth(text),
            width: 100
        },
        {
            title: 'Age',
            dataIndex: 'dateOfBirth',
            key: 'dateofbirth',
            render: (text) => calculateAge(text),
            sorter: (a, b) => new Date(b.dateOfBirth) - new Date(a.dateOfBirth),
            width: 70
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
            width: 110
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' }
            ],
            onFilter: (value, record) => record.sex === value,
            render: (text) => (
                <span >
                    {text}
                </span>
            ),
            width: 80
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone'),
            width: 100
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
                <span className={`flex items-center justify-center w-16 px-2.5 py-1 rounded-full cursor-pointer font-semibold text-white ${getStatusColor(text)}`}>
                    {text}
                </span>
            ),
            width: 120
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
            width: 150
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 80
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => formatDate(text),
            sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            width: 120
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text) => formatDate(text),
            sorter: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
            width: 120
        },
        {
            title: 'Last Login',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            render: (text) => text ? formatDate(text) : '---------------',
            width: 120
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <div className="flex flex-col justify-center gap-2 w-full">
                    <Space className="flex items-center w-full">
                        <div className="bg-[#4b6cb7] text-white duration-300 px-2 py-1 w-15 rounded-full font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => navigationToUpdate(record._id)}>Update</div>
                        <div className="bg-rose-800 text-white duration-300 px-2 py-1 w-15 rounded-full font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => updateToStatusDeleteUser(record._id, accessToken)}>Delete</div>
                    </Space>
                    <Space className="flex items-center w-full">
                        <div className="bg-lime-700 text-white duration-300 px-2 py-1 w-15 rounded-full font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => updateToStatusActiveUser(record._id, accessToken)}>Active</div>
                        <div className="bg-slate-400 text-white duration-300 px-2 py-1 w-15 rounded-full font-semibold flex items-center justify-center w-16 cursor-pointer hover:opacity-70" onClick={() => updateToStatusInactiveUser(record._id, accessToken)} >Inactive</div>
                    </Space>
                </div>
            ),
            width: 150
        },
    ];

    const handleReloadData = async () => {
        await fetchAllUser();
        const inactiveUsers = users.filter(user => differenceInDays(new Date(), new Date(user.lastLogin)) > 14 && user.accountStatus !== 'deleted');

        for (const user of inactiveUsers) {
            try {
                await updateStatusToInactive(user._id, accessToken);
            } catch (error) {
                console.log('Update Status Inactive User Failed!')
            }
        }
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Reload User is Successfully"
        });
    }

    const navigationToNewUser = () => {
        router.push('/dashboard/user/new');
    }

    const navigationToNewMoreUser = () => {
        router.push('/dashboard/user/more');
    }

    const navigationToUpdate = (id) => {
        router.push(`/dashboard/user/update/${id}`);
    }

    const updateToStatusDeleteUser = async (id, accessToken) => {
        Swal.fire({
            title: "Are you Accept Status To Deleted?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#9f1239",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateStatusToDeleted(id, accessToken);
                    Swal.fire({
                        title: "Success!",
                        icon: "success"
                    });
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    const updateToStatusActiveUser = async (id, accessToken) => {
        Swal.fire({
            title: "Are you Accept Status To Active?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#9f1239",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateStatusToActive(id, accessToken);
                    Swal.fire({
                        title: "Success!",
                        icon: "success"
                    });
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    const updateToStatusInactiveUser = async (id, accessToken) => {
        Swal.fire({
            title: "Are you Accept Status To Inactive?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#9f1239",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateStatusToInactive(id, accessToken);
                    Swal.fire({
                        title: "Success!",
                        icon: "success"
                    });
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    const deleteMultipleUsers = async () => {
        Swal.fire({
            title: "Are you sure you want to delete selected users?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#9f1239",
            confirmButtonText: "Yes, delete them!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (const id of selectedRowKeys) {
                        await updateStatusToDeleted(id, accessToken);
                    }
                    Swal.fire({
                        title: "Success!",
                        text: "Selected users have been deleted.",
                        icon: "success"
                    });
                    // Reload the user list after deletion
                    fetchAllUser();
                    // Clear the selected keys
                    setSelectedRowKeys([]);
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    const ActiveMultipleUsers = async () => {
        Swal.fire({
            title: "Are you sure you want to Active selected users?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#9f1239",
            confirmButtonText: "Yes, delete them!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (const id of selectedRowKeys) {
                        await updateStatusToActive(id, accessToken);
                    }
                    Swal.fire({
                        title: "Success!",
                        text: "Selected users have been deleted.",
                        icon: "success"
                    });
                    // Reload the user list after deletion
                    fetchAllUser();
                    // Clear the selected keys
                    setSelectedRowKeys([]);
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    const InactiveMultipleUsers = async () => {
        Swal.fire({
            title: "Are you sure you want to Inactive selected users?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#9f1239",
            confirmButtonText: "Yes, delete them!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (const id of selectedRowKeys) {
                        await updateStatusToInactive(id, accessToken);
                    }
                    Swal.fire({
                        title: "Success!",
                        text: "Selected users have been deleted.",
                        icon: "success"
                    });
                    // Reload the user list after deletion
                    fetchAllUser();
                    // Clear the selected keys
                    setSelectedRowKeys([]);
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex gap-1">
                        <Button onClick={handleReloadData} className="bg-[#407dc0] font-semibold text-white w-32">Reload</Button>
                        <Button onClick={navigationToNewUser} className="bg-[#407dc0] font-semibold text-white w-32">New User</Button>
                        <Button onClick={navigationToNewMoreUser} className="bg-[#407dc0] font-semibold text-white w-32">New More User</Button>
                    </div>
                    <div className="flex gap-1">
                        <Button type="primary" onClick={ActiveMultipleUsers} className="bg-[#4d7c0f] font-semibold text-white w-32 flex items-center justify-center" >Active Selected</Button>
                        <Button type="primary" onClick={InactiveMultipleUsers}  className="bg-[#94a3b8] font-semiboldtext-white w-32 flex items-center justify-center" >Inactive Selected</Button>
                        <Button type="primary" onClick={deleteMultipleUsers} className="bg-red-500 font-semibold text-white w-32 flex items-center justify-center" danger>Delete Selected</Button>
                    </div>
                </div>
                <div className="text-xl"><span className="font-semibold">Total User:</span>  {users.length}</div>
            </div>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="_id"
                rowSelection={rowSelection}
                scroll={{ x: 1900, y: 600 }}
            />
        </div>
    );
}

export default User;
