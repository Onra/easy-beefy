import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: 20,
    backgroundColor: "#f2f5f9",
    borderRadius: 8
  }
});

const Card = ({ ...otherProps }) => {
  const classes = useStyles();
  const containerClasses = clsx(classes.container, otherProps.className);

  return <div className={containerClasses}>{otherProps.children}</div>;
};

export default Card;
