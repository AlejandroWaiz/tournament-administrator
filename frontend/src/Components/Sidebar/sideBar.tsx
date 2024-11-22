import { ArrowRightIcon, ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPenToSquare, faFileWord } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    expanded: boolean;
    setExpanded: (expanded: boolean | ((curr: boolean) => boolean)) => void;
    children?: React.ReactNode;
}


function Sidebar({ children, expanded, setExpanded }: SidebarProps) {
    return (
        <div className={`sidebar ${expanded ? '' : 'collapsed'}`}>
            <div className="toggle-container">
                <button
                    onClick={() => setExpanded((curr) => !curr)}
                    className="toggle-button rounded-lg bg-blue-600 text-white p-1.5 hover:bg-blue-700 transition duration-200"
                >
                    {expanded ? (
                        <ArrowLeftIcon className="h-5 w-5" />
                    ) : (
                        <ArrowRightIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            {expanded && children}
        </div>
    );
}

export default function MakeSidebar({ expanded, setExpanded }: SidebarProps) {
    const navBarItems = [
        { icon: <HomeIcon className="h-5 w-5" />, text: 'Home', active: false }, 
        {
            icon: <FontAwesomeIcon icon={faFileExcel} />,
            subMenu: [
                { icon: <FontAwesomeIcon icon={faPenToSquare} />, text: 'Crear inventario' },
                { icon: <FontAwesomeIcon icon={faPenToSquare} />, text: 'Crear resumenes compras' },
            ],
            text: 'Excel',
        },
        {
            icon: <FontAwesomeIcon icon={faFileWord} />,
            subMenu: [
                { icon: <FontAwesomeIcon icon={faPenToSquare} />, text: 'Crear inventario' },
                { icon: <FontAwesomeIcon icon={faPenToSquare} />, text: 'Generar documento' },
            ],
            text: 'Word',
        },
    ];

    return (
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
            {navBarItems.map((item, index) => (
                <SidebarItem key={index} expanded={expanded} {...item} />
            ))}
        </Sidebar>
    );
}
