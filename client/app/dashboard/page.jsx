'use client'

const Dashboard = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return ( 
        <div>{user.role}</div>
    );
}
 
export default Dashboard;
