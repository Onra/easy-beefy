import Container from "@material-ui/core/Container";
import AddressInput from "./components/AddressInput";
import { makeStyles } from "@material-ui/core/styles";
import YieldRecap from "./components/YieldRecap";
import { ContextProvider } from "./context";

const useStyles = makeStyles({
  container: {
    padding: 20
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <ContextProvider>
      <Container className={classes.container}>
        <AddressInput />
        <YieldRecap />
      </Container>
    </ContextProvider>
  );
};

export default App;
