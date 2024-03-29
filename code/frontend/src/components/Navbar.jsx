import React, {useContext, useEffect} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import {AuthContext} from "../contexts/AuthContext";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
          type="button"
          onClick={() => customFunc()}
          style={{ color }}
          className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
      <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
        {icon}
      </button>
    </TooltipComponent>
);

const Navbar = () => {
    const {user} = useContext(AuthContext)
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (

      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

        <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
        <div className="flex">
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick('userProfile')}
            >
                {user ? <img
                    className="rounded-full w-8 h-8"
                    src={avatar}
                    alt="user-profile"
                /> :<div></div>}
              <p>
                <span className="text-gray-400 text-14">{user?"Hi,":""}</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">
                {user?user.username:""}
              </span>
              </p>
                {user?<MdKeyboardArrowDown className="text-gray-400 text-14"/>:""}
            </div>
          </TooltipComponent>

          {isClicked.userProfile && (<UserProfile />)}
        </div>
      </div>
  );
};

export default Navbar;
