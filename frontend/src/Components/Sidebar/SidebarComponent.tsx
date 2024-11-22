import React, { useState } from 'react'
import MakeSidebar from './sideBar';

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean | ((curr: boolean) => boolean)) => void;
  children?: React.ReactNode;
}

const SidebarComponent = ({ children, expanded, setExpanded }: SidebarProps) => {

  return (
    <>
    <MakeSidebar expanded={expanded} setExpanded={setExpanded} />
    <main className={`flex-1 transition-all duration-300 ${expanded ? 'ml-0' : 'ml-0'} overflow-auto`}> 
      </main></>
  )
}

export default SidebarComponent;