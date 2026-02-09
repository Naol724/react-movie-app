import React from 'react'
import NetflixLogo from "../../assets/images/Netflix logo.png"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Classes from './header.module.css'
const Header = () => {
return (
    <div className={Classes.header_outer_container}>
        <div className={Classes.header_container}>
            <div className={Classes.header_left}>
                <ul>
                    <li><img src={NetflixLogo} alt ={"Netflix Logo" }/></li>
                    <li>Netflix</li>
                    <li>Home</li>
                    <li>TvShows</li>
                    <li>Movies</li>
                    <li>Latest</li>
                    <li>MyList</li>
                    <li>Browser by Languages</li>
                </ul>
            </div>
            <div className={Classes.header_right}>
                <ul>
                    <li><SearchIcon /></li>
                    <li><NotificationsNoneIcon /></li>
                    <li><AccountBoxIcon /></li>
                    <li><ArrowDropDownIcon /></li>
                </ul>
            </div>
        </div>
    </div>
)
}

export default Header
