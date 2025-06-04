import { Image, Button } from "@heroui/react";
import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/auth';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <aside className="bg-white p-6 w-72 min-w-72 shadow-sm flex flex-col justify-between">
            <div>
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={109}
                    height={32}
                    className="rounded-none shadow-none"
                />
            </div>
            
            <div className="mt-auto">
                <Button
                    color="danger"
                    variant="light"
                    onClick={handleLogout}
                    className="w-full"
                    startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    }
                >
                    Logout
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
