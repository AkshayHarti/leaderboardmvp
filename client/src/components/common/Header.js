import React from 'react';
import { NavLink } from 'react-router-dom';
import l10n from '../i18n/en';
 
const Header = () => (
    <div className="row1" id="page-header">
        <NavLink to="/" activeClassName="active-header">{l10n.ah_leaderboard}</NavLink>
    </div>
);

export default Header;