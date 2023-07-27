const Heading = ({ as: Component = "h1", children}) => {
    let fontSize = "3rem";
    let fontWeight = 700;
  
    if (Component === "h2") {
      fontSize = "2rem";
      fontWeight = 700;
    } else if (Component === "h3") {
      fontSize = "1.5rem";
      fontWeight = 600;
    }
  
    return (
      <Component className={`line-height-1.4 font-semibold`} style={{ fontSize, fontWeight }}>
        {children}
      </Component>
    );
  };
  
  export default Heading;
  