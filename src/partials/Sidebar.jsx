import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';
import { ban_quyen, dashboard_active, he_thong, khach_hang, logo, menu, menu_active, nhan_vien, thong_ke, thu_chi, update } from '../assets/images';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute bg-white z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-92vh overflow-y-scroll lg:overflow-y-auto no-scrollbar !w-170 lg:w-20 lg:sidebar-expanded:!w-170 2xl:!w-170 shrink-0 p-4 rounded-b-md transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-170'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-11 w-full block">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={logo} alt="logo" className=''></img>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-6 items-end flex">
              <img src={menu_active} alt="logo" className='w-9'></img>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block font-myriad capitalize text-blue-x text-base py-px pl-0.5">Menu</span>
            </h3>
            <ul className="mt-3 pl-12">
              {/* Dashboard */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('dashboard') && 'bg-blue-z'}`}>
                <NavLink
                  end
                  to="/dashboard"
                  className={`block text-blue-x hover:text-blue-x truncate transition duration-150 ${
                    pathname.includes('dashboard') && 'hover:text-blue-x'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={dashboard_active}></img>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">Dashboard</span>
                  </div>
                </NavLink>
              </li>
              {/* License */}
              <SidebarLinkGroup activecondition={pathname.includes('license')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block  hover:text-blue-x truncate transition duration-150 ${
                          pathname.includes('license') && 'hover:bg-blue-z'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={ban_quyen} className='w-5'></img>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                              Quản lý bản quyền 
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 rotate-270 ${open && '!rotate-0'}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-3 mt-2 last:mb-0">
                            <NavLink
                              end
                              to="/license/list-license"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Danh sách bản quyền
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/license/service"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Danh sách dịch vụ
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/license/trial"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Danh sách dùng thử
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/license/about-to-expire"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Danh sách sắp hết hạn
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Customer */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('customer') && 'bg-blue-z'}`}>
                <NavLink
                  end
                  to="/customer"
                  className={`block  hover:text-blue-x truncate transition duration-150 ${
                    pathname.includes('customer') && 'hover:bg-blue-z'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={khach_hang} className='w-5'></img>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">Danh sách khách hàng</span>
                  </div>
                </NavLink>
              </li>
              {/* Personnel */}
              <SidebarLinkGroup activecondition={pathname.includes('personnel')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block  hover:text-blue-x truncate transition duration-150 ${
                          pathname.includes('personnel') && 'hover:'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={nhan_vien} className='w-5'></img>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                              Quản lý nhân viên 
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 rotate-270 ${open && '!rotate-0'}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-3 mt-2 last:mb-0">
                            <NavLink
                              end
                              to="/personnel/list-personnel"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Danh sách nhân viên
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/personnel/add-personnel"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Thêm nhân viên
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* System */}
              <SidebarLinkGroup activecondition={pathname.includes('system')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block  hover:text-blue-x truncate transition duration-150 ${
                          pathname.includes('system') && 'hover:'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={he_thong}></img>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                              Cấu hình hệ thống
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 rotate-270 ${open && '!rotate-0'}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-3 mt-2 last:mb-0">
                            <NavLink
                              end
                              to="/system/product-management"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Quản lý sản phẩm
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/system/service-management"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Quản lý dịch vụ
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/system/payment-management"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Quản lý thanh toán
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/system/logs-management"
                              className={({ isActive }) =>
                                'block text-black hover:text-blue-x transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Quản lý Logs
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* Accounting group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-6 items-end flex">
              <img src={menu_active} alt="logo" className='w-9'></img>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block font-myriad normal-case text-blue-x text-base py-px pl-0.5 ">Kế toán</span>
            </h3>
            <ul className="mt-3 pl-12">
              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block  hover:text-blue-x truncate transition duration-150 ${open && 'hover:'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={thong_ke} className='w-5'></img>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                              Báo cáo thống kê
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 rotate-270 ${open && '!rotate-0'}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-3 mt-2 last:mb-0">
                            <NavLink end to="/statistic" className="block text-black hover:text-blue-x transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">
                                Thống kê
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Revenue And Expenditure */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('revenue-and-expenditure') && 'bg-blue-z'}`}>
                <NavLink
                  end
                  to="/revenue-and-expenditure"
                  className={`block  hover:text-blue-x truncate transition duration-150 ${
                    pathname.includes('revenue-and-expenditure') && 'hover:bg-blue-z'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={thu_chi} className='w-5'></img>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">Quản lý thu chi</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-6 items-end flex">
              <img src={menu_active} alt="logo" className='w-9'></img>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block font-myriad capitalize text-blue-x text-base py-px pl-0.5">Hỗ trợ</span>
            </h3>
            <ul className="mt-3 pl-12">
            {/* Uppdate */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('uppdate') && 'bg-blue-z'}`}>
                <NavLink
                  end
                  to="/uppdate"
                  className={`block  hover:text-blue-x truncate transition duration-150 ${
                    pathname.includes('uppdate') && 'hover:bg-blue-z'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={update} className='w-5'></img>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-base">Cập nhật</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;