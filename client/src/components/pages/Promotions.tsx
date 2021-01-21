import React from "react";
import {CarouselLoop} from "../page elements/Carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
    }),
);
const Promotions: React.FC = () => {
    const classes = useStyles();
    return <React.Fragment>
        <Grid className={classes.sectionDesktop} container spacing={0} justify="center">
            <Grid item xs={8} container justify="center">
                <div>
                    <Box boxShadow={15}>
                        <CarouselLoop/>
                    </Box>
                </div>
            </Grid>
        </Grid>
        <Grid className={classes.sectionMobile} container spacing={0} justify="center">
            <Grid item xs={12} container justify="center">
                <div>
                    <CarouselLoop/>
                </div>
            </Grid>
        </Grid>
    </React.Fragment>
}
export default Promotions;