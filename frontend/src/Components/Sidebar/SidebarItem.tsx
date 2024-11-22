import { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import "./styles.css"

interface SidebarItemProps {
    active?: boolean;
    icon: React.ReactNode;
    text: string;
    expanded: boolean;
    subMenu?: SubMenuItemProps[] | null;
}

interface SubMenuItemProps extends Omit<SidebarItemProps, 'expanded'> {
    expanded?: never;
    subMenu?: never;
}

function HoveredSubMenuItem({ icon, text, active }: SubMenuItemProps) {
    return (
        <div className={`my-2 rounded-md p-2 ${active ? 'bg-gray-300' : 'hover:bg-indigo-50'}`}>
            <div className="flex items-center justify-center">
                <span className="text-primary-500 h-1 w-1">{icon}</span>
                <span className="text-primary-500 ml-3 w-28 text-start">{text}</span>
                <div className="bg-primary-200 h-1" />
            </div>
        </div>
    );
}

export default function SidebarItem({ icon, active = false, text, expanded = false, subMenu = null }: SidebarItemProps) {
    const [expandSubMenu, setExpandSubMenu] = useState(false);

    useEffect(() => {
        if (!expanded) {
            setExpandSubMenu(false);
        }
    }, [expanded]);

    const subMenuHeight = expandSubMenu && subMenu ? `${(subMenu.length * 40 + 15).toString()}px` : 0;

    return (
        <>
            <div
                className={`sidebar-item ${active ? 'active' : ''}`}
                onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
                style={{ height: '70px' }} 
            >
                <div className={`icon-container ${expanded ? '' : 'hidden'}`}>{icon}</div>
                <span className="menu-text">{text}</span> 
                {subMenu && (
                    <ChevronRightIcon className={`transition-transform ${expandSubMenu ? 'rotate-90' : ''} h-5 w-5`} />
                )}
            </div>
            {expanded && subMenu && (
                <div className="sidebar-submenu" style={{ height: subMenuHeight }}>
                    {subMenu.map((item, index) => (
                        <HoveredSubMenuItem key={index} {...item} />
                    ))}
                </div>
            )}
        </>
    );
}