import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.scss'; // ملف CSS أو SCSS الخاص بالتنسيق

const UserProfile = () => {
  const { id } = useParams();  // الحصول على معرف المستخدم من المسار
  const [user, setUser] = useState(null);  // حالة لتخزين بيانات المستخدم
  const [loading, setLoading] = useState(true);  // حالة للتحكم بعرض رسالة "Loading"
  const [error, setError] = useState(null);  // حالة للتعامل مع الأخطاء

  // جلب بيانات المستخدم باستخدام Axios بناءً على المعرف (id)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://freetestapi.com/api/v1/users/${id}`);
        setUser(response.data);  // تحديث حالة المستخدم بالبيانات المستلمة
        setLoading(false);  // إيقاف عرض رسالة "Loading"
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');  // عرض رسالة خطأ في حال الفشل
        setLoading(false);  // إيقاف عرض رسالة "Loading" حتى في حالة الخطأ
      }
    };

    fetchUserData();  // استدعاء الدالة لجلب البيانات
  }, [id]);

  // عرض رسالة "Loading" إذا كانت البيانات قيد التحميل
  if (loading) {
    return <p>Loading user data...</p>;
  }

  // عرض رسالة خطأ في حال الفشل
  if (error) {
    return <p>{error}</p>;
  }

  // تأكد من أن البيانات موجودة قبل عرضها لتجنب الأخطاء
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <div className="profile-header">
          <img src="/src/assets/images.png" alt="User" className="profile-image" />
          <h1>{user?.name || 'No Name Available'}</h1>
        </div>
        
        {/* إضافة الخط المقطع تحت الرأس */}
        <hr className="profile-divider" />
  
        <div className="profile-details">
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${user?.email || ''}`}>{user?.email || 'No Email Available'}</a>
          </p>
          <p>
            <strong>Website: </strong>
            <a href={user?.website ? `https://${user.website}` : '#'} target="_blank" rel="noopener noreferrer">{user?.website || 'No Website Available'}</a>
          </p>
          <p><strong>Phone: </strong>{user?.phone || 'No Phone Available'}</p>
          <p><strong>Address: </strong>{user?.address?.street || 'No Street Available'}, {user?.address?.city || 'No City Available'}</p>
          
          {/* عرض الهوايات إذا كانت موجودة */}
          <p><strong>Hobbies: </strong></p>
          {user?.hobbies && user.hobbies.length > 0 ? (
            <ul>
              {user.hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          ) : (
            <p>No Hobbies Available</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default UserProfile;
