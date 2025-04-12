   import { useState } from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { useNavigate } from 'react-router-dom';
   import { login } from '../store/slices/authSlice';

   function AdminLogin() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { isLoading, error } = useSelector((state) => state.auth);

     const handleSubmit = async (e) => {
       e.preventDefault();
       const result = await dispatch(login({ username, password }));
       
       if (!result.error) {
         navigate('/dashboard');
       }
     };

     return (
       <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
         <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
           <div className="card-body">
             <div className="text-center mb-4">
               <h3 className="text-white mb-2">Admin Panel</h3>
               <p className="text-muted">Crushy Yönetici Paneline Hoş Geldiniz</p>
             </div>
             
             {error && (
               <div className="alert alert-danger" role="alert">
                 {error}
               </div>
             )}
             
             <form onSubmit={handleSubmit}>
               <div className="mb-3">
                 <label htmlFor="username" className="form-label text-white">Kullanıcı Adı</label>
                 <input
                   type="text"
                   className="form-control bg-dark text-white border-secondary"
                   id="username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required
                 />
               </div>
               
               <div className="mb-4">
                 <label htmlFor="password" className="form-label text-white">Şifre</label>
                 <input
                   type="password"
                   className="form-control bg-dark text-white border-secondary"
                   id="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
               </div>
               
               <button
                 type="submit"
                 className="btn btn-primary w-100"
                 disabled={isLoading}
               >
                 {isLoading ? (
                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                 ) : (
                   <i className="bi bi-shield-lock me-2"></i>
                 )}
                 {isLoading ? 'Giriş Yapılıyor...' : 'Yönetici Girişi'}
               </button>
             </form>
           </div>
         </div>
       </div>
     );
   }

   export default AdminLogin;