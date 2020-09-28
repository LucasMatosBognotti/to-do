import React from 'react';

function Menu() {
  return (
    <>
      <nav className="navbar navbar-inverse bg-inverse">
        <div className="container">
          
          <div className="navbar-header">
            <a href="/" className="nav-bar-brand">
              <i className="fa fa-calender-check-o">To-Do app</i>
            </a>
          </div>

          <div className="navbar-collapse collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li>
                <a href="/todo">Tarefas</a>
              </li>
              <li>
                <a href="/sobre">Sobre</a>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
    </>
  );
}

export default Menu;
