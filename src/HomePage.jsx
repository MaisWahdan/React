import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';  

const HomePage = () => {
    const [users, setUsers] = useState([]); // لحفظ قائمة المستخدمين
    const [search, setSearch] = useState(''); // لحفظ النص المدخل للبحث
    const [sortOrder, setSortOrder] = useState('asc'); // لحفظ حالة الفرز (تصاعدي أو تنازلي)
    const [sortBy, setSortBy] = useState('id'); // تحديد طريقة الفرز (ID أو Name)

    // جلب البيانات من الـ API عند تحميل الصفحة أو عند تغيير حالة البحث أو الفرز
    useEffect(() => {
        axios.get(`https://freetestapi.com/api/v1/users?search=${search}&sort=${sortBy}&order=${sortOrder}`)
            .then(response => {
                setUsers(response.data); // عند استلام البيانات، نقوم بتحديث حالة users
            })
            .catch(error => console.error('Error fetching users:', error)); // معالجة أي أخطاء أثناء جلب البيانات
    }, [search, sortOrder, sortBy]); // يتم إعادة تنفيذ useEffect عند تغيير search أو sortOrder أو sortBy

    return (
        <div className="container">
            <div className="user-directory">
                <h2 className="text-center mb-4">User Directory</h2>
                <div className="search-sort-bar d-flex justify-content-between mb-3">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // تحديث قيمة البحث عند الإدخال
                    />
                    <button
                        className="btn btn-secondary ms-3"
                        onClick={() => {
                            // عند الضغط، نغير الترتيب حسب الاسم
                            setSortBy('name');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // تبديل حالة الترتيب بين تصاعدي وتنازلي
                        }}
                    >
                        Sort by Name
                        {sortOrder === 'asc' ? (
                            <i className="fas fa-arrow-up ms-2"></i> // سهم يشير لأعلى إذا كان الترتيب تصاعدي
                        ) : (
                            <i className="fas fa-arrow-down ms-2"></i> // سهم يشير لأسفل إذا كان الترتيب تنازلي
                        )}
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered user-table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/users/${user.id}`} className="btn btn-outline-primary">View Profile</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
