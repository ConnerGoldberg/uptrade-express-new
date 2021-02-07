import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Utilities from "../../views/utils/utilities.js";
import "./sidebar.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.expandLogo = this.expandLogo.bind(this);
    this.activeRoute.bind(this);
    this.state = {
      dashboard: this.activeRoute("/admin/dashboard") !== "" ? true : false,
      data: this.activeRoute("/admin/data") !== "" ? true : false,
      tools: this.activeRoute("/admin/tools") !== "" ? true : false,
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  /*--------------------------------------------------------------------------------*/
  /*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
  /*--------------------------------------------------------------------------------*/
  expandLogo() {
    // document.getElementById('logobg').classList.toggle('expand-logo');
  }
  /*--------------------------------------------------------------------------------*/
  /*Verifies if routeName is the one active (in browser input)                      */
  /*--------------------------------------------------------------------------------*/
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? "selected"
      : "";
  }

  render() {
    const { footerRoute } = this.props;

    return (
      <aside
        className="left-sidebar"
        id="sidebarbg"
        data-sidebarbg={this.props.data.settings[0].sidebarbg}
        onMouseEnter={this.expandLogo}
        onMouseLeave={this.expandLogo}
      >
        <div className="scroll-sidebar">
          <PerfectScrollbar className="custom-perfect-scrollbar-container sidebar-nav">
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar Menus will go here                                                     */}
            {/*--------------------------------------------------------------------------------*/}
            <Nav id="sidebarnav">
              {this.props.routes.map((prop, key) => {
                if (prop.redirect) {
                  return null;
                } else if (prop.navlabel) {
                  return (
                    <li className="nav-small-cap" key={key}>
                      <i className={prop.icon}></i>
                      <span className="hide-menu">{prop.name}</span>
                    </li>
                  );
                } else if (prop.collapse) {
                  if (
                    (prop.permissions && prop.permissions === "basic_admin") ||
                    (prop.permissions &&
                      Utilities.findObjectInArray(
                        prop.permissions.toLowerCase(),
                        this.props.profileData.userPermissions,
                        "name"
                      )) ||
                    prop.roles.toLowerCase() ===
                      this.props.profileData.roles.toLowerCase()
                  ) {
                    let child = [];
                    prop.child.map((prop2, key2) => {
                      if (
                        (prop2.permissions &&
                          Utilities.findObjectInArray(
                            prop2.permissions.toLowerCase(),
                            this.props.profileData.userPermissions,
                            "name"
                          )) ||
                        prop2.roles.toLowerCase() ===
                          this.props.profileData.roles.toLowerCase()
                      ) {
                        child.push(prop2);
                      }
                    });
                    if (
                      child.length > 0 ||
                      prop.name.toLowerCase() === "filters"
                    ) {
                      prop.visible = true;
                    } else {
                      prop.visible = false;
                    }
                    if (prop.visible) {
                      let firstdd = {};
                      firstdd[prop["state"]] = !this.state[prop.state];
                      return (
                        /*--------------------------------------------------------------------------------*/
                        /* Menus wiil be goes here                                                        */
                        /*--------------------------------------------------------------------------------*/
                        <li
                          className={
                            this.activeRoute(prop.path) + " sidebar-item"
                          }
                          key={key}
                        >
                          <a
                            data-toggle="collapse"
                            className="sidebar-link has-arrow"
                            aria-expanded={this.state[prop.state]}
                            onClick={() => this.setState(firstdd)}
                          >
                            <i className={prop.icon}></i>
                            <span className="hide-menu">{prop.name}</span>
                          </a>
                          {/*--------------------------------------------------------------------------------*/}
                          {/* Sub-Menus wiil be goes here                                                    */}
                          {/*--------------------------------------------------------------------------------*/}
                          <Collapse isOpen={this.state[prop.state]}>
                            <ul className="first-level">
                              {prop.child.map((prop, key) => {
                                if (
                                  (prop.permissions &&
                                    prop.permissions === "basic_admin") ||
                                  (prop.permissions &&
                                    Utilities.findObjectInArray(
                                      prop.permissions.toLowerCase(),
                                      this.props.profileData.userPermissions,
                                      "name"
                                    )) ||
                                  prop.roles.toLowerCase() ===
                                    this.props.profileData.roles.toLowerCase()
                                ) {
                                  if (prop.redirect) return null;
                                  if (prop.collapse) {
                                    let seconddd = {};
                                    seconddd[prop["state"]] = !this.state[
                                      prop.state
                                    ];
                                    return (
                                      <li
                                        className={
                                          this.activeRoute(prop.path) +
                                          " sidebar-item"
                                        }
                                        key={key}
                                      >
                                        <a
                                          data-toggle="collapse"
                                          className="sidebar-link has-arrow"
                                          aria-expanded={this.state[prop.state]}
                                          onClick={() =>
                                            this.setState(seconddd)
                                          }
                                        >
                                          <i className={prop.icon}></i>
                                          <span className="hide-menu">
                                            {prop.name}
                                          </span>
                                        </a>
                                      </li>
                                    );
                                  }
                                  return (
                                    /*--------------------------------------------------------------------------------*/
                                    /* Adding Sidebar Item                                                            */
                                    /*--------------------------------------------------------------------------------*/
                                    <li
                                      className={
                                        this.activeRoute(prop.path) +
                                        (prop.pro ? " active active-pro" : "") +
                                        " sidebar-item"
                                      }
                                      key={key}
                                    >
                                      <NavLink
                                        to={prop.path}
                                        className="sidebar-link"
                                        activeClassName="active"
                                      >
                                        <i className={prop.icon}></i>
                                        <span className="hide-menu">
                                          {prop.name}
                                        </span>
                                      </NavLink>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          </Collapse>
                        </li>
                      );
                    }
                  }
                } else {
                  if (
                    (prop.permissions && prop.permissions === "basic_admin") ||
                    (prop.permissions &&
                      Utilities.findObjectInArray(
                        prop.permissions.toLowerCase(),
                        this.props.profileData.userPermissions,
                        "name"
                      ))
                  ) {
                    return (
                      /*--------------------------------------------------------------------------------*/
                      /* Adding Sidebar Item                                                            */
                      /*--------------------------------------------------------------------------------*/
                      <li
                        className={
                          this.activeRoute(prop.path) +
                          (prop.pro ? " active active-pro" : "") +
                          " sidebar-item"
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.path}
                          className="sidebar-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <span className="hide-menu">{prop.name}</span>
                        </NavLink>
                      </li>
                    );
                  }

                  //} else  {
                  // 	return (
                  // 		/*--------------------------------------------------------------------------------*/
                  // 		/* Adding Sidebar Item                                                            */
                  // 		/*--------------------------------------------------------------------------------*/
                  // 		<li
                  // 			className={
                  // 				this.activeRoute(prop.path) +
                  // 				(prop.pro ? ' active active-pro' : '') +
                  // 				' sidebar-item'
                  // 			}
                  // 			key={key}
                  // 		>
                  // 			<NavLink
                  // 				to={prop.path}
                  // 				className="sidebar-link"
                  // 				activeClassName="active"
                  // 			>
                  // 				<i className={prop.icon} />
                  // 				<span className="hide-menu">{prop.name}</span>
                  // 			</NavLink>
                  // 		</li>
                  // 	);
                  // }
                }
              })}
              {footerRoute && footerRoute.path && (
                <footer className="sidebar-footer">
                  <li
                    className={
                      this.activeRoute(footerRoute.path) +
                      (footerRoute.pro ? " active active-pro" : "") +
                      " sidebar-item"
                    }
                    key={`${footerRoute.name}-key`}
                  >
                    <NavLink
                      to={footerRoute.path}
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      <i className={footerRoute.icon} />
                      <span className="hide-menu">{footerRoute.name}</span>
                    </NavLink>
                  </li>
                </footer>
              )}
            </Nav>
          </PerfectScrollbar>
        </div>
      </aside>
    );
  }
}
export default Sidebar;
