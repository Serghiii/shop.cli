const MenuSideDrawerButton: React.FC<any> = props => {
   return (
      <div className="menu-side-drawer" onClick={props.click}>
         <i className="burger"></i>
      </div>
   )
}

export default MenuSideDrawerButton