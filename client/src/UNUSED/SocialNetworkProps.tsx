import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";

const SocialNetworlProps: ReadonlyMap<string, [string, JSX.Element]> = new Map([
        ['Twitter', ['https://www.instagram.com/danilhvr/?hl=ru', <TwitterIcon style={{'color': "#d0d5d9"}}/>]],
        ['LinkedIn', ['https://www.instagram.com/danilhvr/?hl=ru', <LinkedInIcon style={{'color': "#d0d5d9"}}/>]],
        ['Mail', ['https://www.instagram.com/danilhvr/?hl=ru', <MailIcon style={{'color': "#d0d5d9"}}/>]],
        ['Instagram', ['https://www.instagram.com/danilhvr/?hl=ru', <InstagramIcon style={{'color': "#d0d5d9"}}/>]],
        ['Facebook', ['https://www.instagram.com/danilhvr/?hl=ru', <FacebookIcon style={{'color': "#d0d5d9"}}/>]],
        ['YouTube', ['https://www.instagram.com/danilhvr/?hl=ru', <YouTubeIcon style={{'color': "#d0d5d9"}}/>]]
    ]
)
export default SocialNetworlProps

// import React from 'react'
// import FacebookIcon from '@material-ui/icons/Facebook';
// import TwitterIcon from '@material-ui/icons/Twitter';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import MailIcon from '@material-ui/icons/Mail';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import YouTubeIcon from '@material-ui/icons/YouTube';
//
// const SocialNetworlProps = new Map();
// SocialNetworlProps.set('TwitterIcon', ['https://www.instagram.com/danilhvr/?hl=ru', <TwitterIcon style={{'color': "white"}}/>])
// SocialNetworlProps.set('LinkedInIcon', ['https://www.instagram.com/danilhvr/?hl=ru', <LinkedInIcon style={{'color': "white"}}/>])
// SocialNetworlProps.set('MailIcon', ['https://www.instagram.com/danilhvr/?hl=ru', <MailIcon style={{'color': "white"}}/>])
// SocialNetworlProps.set('InstagramIcon', ['https://www.instagram.com/danilhvr/?hl=ru', <InstagramIcon style={{'color': "white"}}/>])
// SocialNetworlProps.set('FacebookIcon', ['https://www.instagram.com/danilhvr/?hl=ru', <FacebookIcon style={{'color': "white"}}/>])
// SocialNetworlProps.set('YouTubeIcon', ['https://www.instagram.com/danilhvr/?hl=ru', <YouTubeIcon style={{'color': "white"}}/>])
// export default SocialNetworlProps