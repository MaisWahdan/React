import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Please fill in both fields');
        } else {
            setError('');
            window.location.href = '/home';
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-5 shadow-lg text-center" style={{ width: '400px', borderRadius: '15px' , marginLeft: '10px' }}>
                <h2 className="display-4 mb-4">Welcome To LoginPage</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username: </label>
                        <input
                            type="text"
                            className="form-control text-center"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password: </label>
                        <input
                            type="password"
                            className="form-control text-center"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger" style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '10px' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
