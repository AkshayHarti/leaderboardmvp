import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = (props) => (
    <button>
        <NavLink to={"/stage/" + props.id} activeClassName="is-active">{props.name}</NavLink>
    </button>
);

export default Button;
