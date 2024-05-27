'use client'
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Link from "next/link";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { PiHamburgerFill } from "react-icons/pi";
import { useEffect, useState } from "react";

import { getAllUser } from "../api/route";

const Dashboard = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [users, setUsers] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchAllUser = async (accessToken) => {
        try {
            const response = await getAllUser(accessToken);
            setUsers(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllUser(accessToken);
    }, [accessToken]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };


    // Xử lý dữ liệu cho biểu đồ Line (số lượng người đăng ký theo tháng)
    const processLineChartData = () => {
        const months = Array(12).fill(0);
        users.forEach(user => {
            const userDate = new Date(user.createdAt);
            if (userDate.getFullYear() === selectedYear) {
                const month = userDate.getMonth();
                months[month]++;
            }
        });
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
                label: "Number of subscribers",
                data: months,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                fill: true,
            }]
        };
    };

    // Xử lý dữ liệu cho biểu đồ Pie 1 (phân bố trạng thái tài khoản)
    const processPieChart1Data = () => {
        const statusCounts = users.reduce((acc, user) => {
            acc[user.accountStatus] = (acc[user.accountStatus] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
            }]
        };
    };

    // Xử lý dữ liệu cho biểu đồ Pie 2 (phân bố giới tính)
    const processPieChart2Data = () => {
        const genderCounts = users.reduce((acc, user) => {
            acc[user.sex] = (acc[user.sex] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(genderCounts),
            datasets: [{
                data: Object.values(genderCounts),
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"]
            }]
        };
    };

 // Xử lý dữ liệu cho biểu đồ Pie 3 (phân bố độ tuổi)
    const processPieChart3Data = () => {
        // Đếm số lượng người dùng trong từng nhóm độ tuổi
        const ageGroups = {
            "<18": 0,
            "18-30": 0,
            "31-50": 0,
            "51-70": 0,
            ">70": 0
        };

        users.forEach(user => {
            const age = calculateAge(user.dateOfBirth); // Hàm tính tuổi của người dùng
            if (age < 18) {
                ageGroups["<18"]++;
            } else if (age >= 18 && age <= 30) {
                ageGroups["18-30"]++;
            } else if (age >= 31 && age <= 50) {
                ageGroups["31-50"]++;
            } else if (age >= 51 && age <= 70) {
                ageGroups["51-70"]++;
            } else {
                ageGroups[">70"]++;
            }
        });

        // Chuyển đổi dữ liệu thành định dạng phù hợp cho biểu đồ Pie
        return {
            labels: Object.keys(ageGroups),
            datasets: [{
                data: Object.values(ageGroups),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
            }]
        };
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="flex flex-col gap-6 h-full w-full p-2">
            <div className="flex gap-5 items-center justify-between w-full">
                <Link href={'/dashboard'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white  border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><FaHandHoldingDollar /></div>
                    <div className="flex flex-col w-2/3 py-2 h-full ">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">N/n</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Total Revenue Of Year</div>
                    </div>
                </Link>
                <Link href={`/dashboard`} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><FaUserTie/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">N/n</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Available User</div>
                    </div>
                </Link>
                <Link href={'/dashboard'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><PiHamburgerFill/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">N/n</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Available Product</div>
                    </div>
                </Link>
                <Link href={'/dashboard'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><MdPayments/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">N/n</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Total Order Of Year</div>
                    </div>
                </Link>
            </div>
            <div className="flex gap-2 w-full h-5/6">
                <div className="flex flex-col gap-2 h-full w-9/12">
                    <div className="w-full h-4/6 ">
                        <div className="flex items-center gap-2">
                            <label htmlFor="yearSelect" className="text-xl font-semibold">Select Year:</label>
                            <select
                                id="yearSelect"
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="p-2 border rounded-md"
                            >
                                {[...Array(new Date().getFullYear() - 2020).keys()].map((year) => (
                                    <option key={2021 + year} value={2021 + year}>{2021 + year}</option>
                                ))}
                            </select>
                        </div>
                        <Line data={processLineChartData()} options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Chart of number of subscribers by month',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }} />
                    </div>
                    <div className="flex gap-2 w-full h-2/6 pt-5 ">
                        <div className="flex items-center justify-center h-full w-1/2 text-center">
                            <Pie data={processPieChart1Data()} options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Chart of user account status counts',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            }
                            }} />
                        </div>
                        <div className="flex items-center justify-center h-full w-1/2">
                            <Pie data={processPieChart2Data()} options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'User gender count chart',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 h-full w-3/12">
                    <div className='w-full h-1/2'>
                    <Pie data={processPieChart3Data()} options={{
            plugins: {
                title: {
                    display: true,
                    text: 'User age group distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }} />
                    </div>
                    <div className='w-full h-1/2'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
