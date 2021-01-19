import React from 'react'
import {IconButton,} from "@material-ui/core";

type Props = {
    socialNetworkProps: ReadonlyMap<string, [string, JSX.Element]>
}

const SocialLinks: React.FC<Props> = (props: Props) => {
    const socialNetworkData = props.socialNetworkProps;

    function getIconLinksItems(): JSX.Element[] {
        function handleIconClick(socialNetworkName: string) {
            const linkAndIcon: [string, JSX.Element] | undefined = socialNetworkData.get(socialNetworkName);
            if (linkAndIcon) {
                const link = linkAndIcon[0];
                window.location.assign(link)
            }
        }

        return Array.from(socialNetworkData.keys()).map((keys, index) => {
            const linkAndIcon: [string, JSX.Element] | undefined = socialNetworkData.get(keys);
            if (linkAndIcon) {
                const icon = linkAndIcon[1];
                return <IconButton key={index} onClick={() => handleIconClick(keys)}>
                    {icon}
                </IconButton>
            }
            return <React.Fragment/>;
        })
    }

    return (
        <React.Fragment>
            {getIconLinksItems()}
        </React.Fragment>
    )
}

export default SocialLinks;