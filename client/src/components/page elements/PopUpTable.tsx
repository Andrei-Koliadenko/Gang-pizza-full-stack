import React from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import DetailsIcon from "@material-ui/icons/Details";
type Props = {
    data: string[]
}
const PopUpTable: React.FC<Props> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [flOpen, setFlOpen] = React.useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
        setFlOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setFlOpen(false)
    };
    return <React.Fragment>
        <IconButton size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <DetailsIcon/>
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={flOpen}
            onClose={handleClose}
        >
            {props.data.map(item =>
                <MenuItem onClick={handleClose} key={item}>{item}</MenuItem>)}


        </Menu>
    </React.Fragment>
}
export default PopUpTable;
