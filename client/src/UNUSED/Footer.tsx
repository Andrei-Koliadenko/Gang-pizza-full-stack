import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Info, InfoSubtitle, InfoTitle} from '@mui-treasury/components/info';
import {useD01InfoStyles} from '@mui-treasury/styles/info/d01';
import SocialLinks from "./SocialLinks";
import {email, phoneNumber, pizzeria_name} from "../config/contact-Info";
import SocialNetworlProps from "./SocialNetworkProps";
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const theme = createMuiTheme();
theme.typography.h3 = {
    fontSize: '0.8rem',
    '@media (min-width:433px)': {
        fontSize: '1.0rem',
    },
};
theme.typography.h4 = {
    fontSize: '0.7rem',
    '@media (min-width:433px)': {
        fontSize: '0.8rem',
    },
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionDesktop: {
            display: 'none',
            '@media (min-width:433px)': {
                display: 'box',
            },
        },
        sectionMobile: {
            display: 'box',
            '@media (min-width:433px)': {
                display: 'none',
            },
        },
    }),
);



const Footer: React.FC = () => {
    const classes = useStyles();
    return <React.Fragment>
        <ThemeProvider theme={theme}>
        <Grid className={classes.sectionDesktop} container spacing={0} style={{backgroundColor: "#000"}}>
            <Grid item xs={8}>
                <Typography align={"center"} variant="h3" style={{color: '#f5f5f5'}}>
                    {pizzeria_name}
                </Typography>
                <Typography align={"center"} variant="h4" style={{color: '#d0d5d9'}}>
                    {email}<br/>{email}<br/>{email}
                </Typography>
                {/*<Info useStyles={useD01InfoStyles}>*/}
                {/*    <text >{pizzeria_name}</text>*/}
                {/*    <InfoSubtitle align={"center"}>{email}</InfoSubtitle>*/}
                {/*    <InfoSubtitle align={"center"}>{email}</InfoSubtitle>*/}
                {/*    <InfoSubtitle align={"center"}>{email}</InfoSubtitle>*/}
                {/*    */}
                {/*</Info>*/}
            </Grid>
            <Grid item xs={4}>
                <Typography align={"left"} variant="h3" style={{color: '#f5f5f5', paddingLeft: '13%'}}>
                    Phone number:
                </Typography>
                <Typography align={"left"} variant="h4" style={{color: '#d0d5d9', paddingLeft: '13%'}}>
                    {phoneNumber}
                </Typography>
                {/*<Info style={{paddingLeft: '15%'}} useStyles={useD01InfoStyles}>*/}
                {/*    <InfoSubtitle align={"left"}>Phone number:</InfoSubtitle>*/}
                {/*    <InfoTitle align={"left"}>{phoneNumber}</InfoTitle>*/}
                {/*</Info>*/}
                <SocialLinks socialNetworkProps={SocialNetworlProps}/>
            </Grid>
        </Grid>
        <Grid className={classes.sectionMobile} container spacing={0} style={{backgroundColor: "#000"} }>
            <Grid item xs={12}>
                <Typography align={"center"} variant="h3" style={{color: '#f5f5f5'}}>
                    {pizzeria_name}
                </Typography>
                <Typography align={"center"} variant="h4" style={{color: '#d0d5d9'}}>
                    {email}<br/>{email}<br/>{email}
                </Typography>
                <Typography align={"center"} variant="h3" style={{color: '#f5f5f5'}}>
                    Phone number:
                </Typography>
                <Typography align={"center"} variant="h4" style={{color: '#d0d5d9'}}>
                    {phoneNumber}
                </Typography>
                    {/*<InfoTitle align={"center"}>{pizzeria_name}</InfoTitle>*/}
                    {/*<InfoSubtitle align={"center"}>{email}</InfoSubtitle>*/}
                    {/*<InfoSubtitle align={"center"}>{email}</InfoSubtitle>*/}
                    {/*<InfoSubtitle align={"center"}>{email}</InfoSubtitle>*/}
                    {/*<InfoSubtitle align={"center"}>Phone number:</InfoSubtitle>*/}
                    {/*<InfoTitle align={"center"}>{phoneNumber}</InfoTitle>*/}
                    <SocialLinks socialNetworkProps={SocialNetworlProps}/>
            </Grid>
        </Grid>
            
        </ThemeProvider>
    </React.Fragment>
}
export default Footer;



