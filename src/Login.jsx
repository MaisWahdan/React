import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';// يُستخدم للتنقل بين الصفحات داخل التطبيق بدون إعادة تحميل الصفحةuseNavigate
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // لحفظ حالة remember me
    const [error, setError] = useState('');
    const navigate = useNavigate();
     //يُستخدم لتنفيذ منطق معين عند تحميل المكون أو عند تغيير حالة معينة
    // تحميل البيانات من localStorage عند تحميل الصفحة
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (savedRememberMe) {
            setUsername(savedUsername || '');
            setPassword(savedPassword || '');
            setRememberMe(savedRememberMe);
        }
    }, []);
//يشير إلى الكائن event الذي يحمل تفاصيل حول الحدث الذي حدث. e:
    const handleSubmit = (e) => {
        e.preventDefault();//تمنع إعادة تحميل الصفحة عند الضغط على زر "Login".
        if (username === '' || password === '') {
            setError('Please fill in both fields');
        } else {
            setError('');

            // إذا كان remember me مفعلاً، حفظ البيانات في localStorage
            if (rememberMe) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('rememberMe', rememberMe);
            } else {
                // إذا لم يكن remember me مفعلاً، مسح البيانات
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('rememberMe');
            }

            // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول باستخدام useNavigate
            navigate('/home');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Your Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            /> Remember Me
                        </label>
                    </div>
                    <button type="submit" className="btn-submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
