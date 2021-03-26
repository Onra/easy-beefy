import { useEffect } from "react";
import numeral from "numeral";
import Card from "./Card";
import Typography from "@material-ui/core/Typography";
import useWallet from "../hooks/useWallet";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  title: {
    marginBottom: 20
  },

  earnings: {
    fontSize: 40
  }
});

const YieldRecap = () => {
  const classes = useStyles();
  const {
    fetchData,
    walletAddress,
    isLoading,
    data,
    getDailyEarnings
  } = useWallet();

  useEffect(() => {
    if (walletAddress) {
      fetchData();
    }
  }, [walletAddress, fetchData]);

  return (
    <Card className={classes.container}>
      <Typography variant="h6" className={classes.title} align="center">
        Daily Earnings
      </Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && data && (
        <>
          <Typography className={classes.earnings} align="center">
            {numeral(getDailyEarnings()).format("$0,0.0")}
          </Typography>
        </>
      )}
    </Card>
  );
};

export default YieldRecap;
