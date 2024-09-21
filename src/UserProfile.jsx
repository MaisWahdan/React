import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css'; // تأكد من استيراد الأنماط المخصصة

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://freetestapi.com/api/v1/users/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <div className="profile-card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="profile-card-body">
                    <h2 className="profile-card-title">{user.name}'s Profile</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                    <p><strong>Occupation:</strong> {user.occupation}</p>
                    <p><strong>Hobbies:</strong> {user.hobbies.join(', ')}</p>
                    <button
                        className="btn btn-profile-primary mt-3"
                        onClick={() => navigate('/home')}
                    >
                        <i className="fas fa-arrow-left me-2"></i> Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
