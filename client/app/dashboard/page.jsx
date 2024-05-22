'use client'

import { JsonParse } from '@/app/api/sessionStorage';

const Dashboard = () => {
    const user = JsonParse('user');
    return ( 
        <div>{user.role}</div>
    );
}
 
export default Dashboard;