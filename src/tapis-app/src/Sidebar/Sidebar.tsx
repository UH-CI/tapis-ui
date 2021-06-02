import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Icon } from 'tapis-ui/_common';
import { Token } from 'tapis-redux/authenticator/types';
import './Sidebar.global.scss';
import './Sidebar.module.scss';


type SidebarItemProps = {
  to: string,
  label: string,
  iconName: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, label, iconName }) => {
  return (
    <NavItem>
      <NavLink
        tag={RRNavLink}
        to={to}
        exact
        styleName="link"
        activeStyleName="link--active"
        disabled={false}
      >
        <div styleName="content" className="nav-content">
          <Icon name={iconName} />
          <span styleName="text">{label}</span>
        </div>
      </NavLink>
    </NavItem>
  );
};


interface SidebarProps {
  token?: Token
}

const Sidebar: React.FC<SidebarProps> = ({ token }) => {
  return (
    <Nav styleName="root" vertical>
      <SidebarItem to="/" label="Dashboard" iconName="dashboard" />
      <SidebarItem to="/login" label="Login" iconName="link" />
      {token && (
        <SidebarItem to="/systems" label="Systems" iconName="allocations" />
      )}
      <SidebarItem to="/uipatterns" label="UI Patterns" iconName="copy" />
    </Nav>
  );
};

Sidebar.defaultProps = {
  token: null
}

export default Sidebar;
