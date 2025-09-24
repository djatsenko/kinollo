import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loading from '../../components/Loading';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { isAdmin, fetchIsAdmin } = useAppContext();

  // Запрос статуса только если он ещё не известен
  useEffect(() => {
    if (isAdmin === undefined || isAdmin === null) {
      fetchIsAdmin?.();
    }
  }, [isAdmin, fetchIsAdmin]);

  // LOADING — показываем каркас админки + спиннер, чтобы не «мигало»
  if (isAdmin === undefined || isAdmin === null) {
    return (
      <>
        <AdminNavbar />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 px-4 py-10 md:px-10">
            <Loading />
          </main>
        </div>
      </>
    );
  }

  // DENIED — уводим на главную (или на /signin, если захочешь)
  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }

  // ALLOWED — обычный лэйаут
  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 px-4 py-10 md:px-10 min-h-[calc(100vh-64px)] overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
