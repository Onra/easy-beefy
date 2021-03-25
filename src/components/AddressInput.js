import TextField from "@material-ui/core/TextField";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#f2f5fa",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    alignItems: "center"
  },

  input: {
    flex: 1,
    marginLeft: 20
  }
});

const AddressInput = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AccountBalanceWalletIcon />
      <TextField
        id="input-with-icon-grid"
        placeholder="Please enter a BEP20 Wallet Address"
        className={classes.input}
        InputProps={{
          disableUnderline: true
        }}
      />
    </div>
  );
};

export default AddressInput;
