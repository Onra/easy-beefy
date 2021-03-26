import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "../res/search.svg";
import SvgIcon from "@material-ui/core/SvgIcon";
import useWallet from "../hooks/useWallet";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#f2f5fa",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    alignItems: "center",
    marginBottom: 40
  },

  input: {
    flex: 1,
    marginLeft: 20
  },

  icon: {
    width: 20,
    height: 20,
    color: "#b6babd"
  }
});

const AddressInput = () => {
  const classes = useStyles();
  const { fetchData } = useWallet();

  const [address, setAddress] = useState();

  return (
    <div className={classes.container}>
      <SvgIcon
        component={SearchIcon}
        viewBox="0 0 500 500"
        className={classes.icon}
      />
      <TextField
        id="input-with-icon-grid"
        placeholder="Please enter a BEP20 Wallet Address"
        className={classes.input}
        InputProps={{
          disableUnderline: true
        }}
        value={address}
        onChange={event => setAddress(event?.target?.value)}
      />
      <Button disabled={!address} onClick={() => fetchData(address)}>
        Ok
      </Button>
    </div>
  );
};

export default AddressInput;
