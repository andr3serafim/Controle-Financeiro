// components/NavbarMenu.js

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../assets/Images/logo1.png';

import '../pages/DashbordStyles/Style.css'

function NavbarMenu() {
  return (
    <Navbar className='custom-navbar' expand="md" >
    <NavbarBrand href="/"> 
      <img src={logo} alt="Logo" className='logo'/>
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink className="btn btn-primary mr-3" href="/receitas">Adicionar Receita</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="btn btn-primary mr-3" href="/despesas">Adicionar Despesa</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="btn btn-primary mr-3" href="/emprestimos">Adicionar Empréstimo</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="btn btn-primary mr-3" href="/listar-receitas">Ver Receitas</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="btn btn-primary mr-3" href="/listar-despesas">Ver Despesas</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="btn btn-primary mr-3" href="/listar-emprestimos">Ver Empréstimos</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
  );
}

export default NavbarMenu;