import Container from "@material-ui/core/Container";
import AddressInput from "./components/AddressInput";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    padding: 20
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <AddressInput />
    </Container>
  );
};

export default App;
