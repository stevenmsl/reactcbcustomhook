import * as React from "react";
import classes from "./Section.module.css";

/*  you have to define children explicitly after React 18 */
type SectionProps = {
  children?: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }) => {
  return <section className={classes.section}>{children}</section>;
};

export default Section;
