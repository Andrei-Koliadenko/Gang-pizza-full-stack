import React, {FC} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import {AccountCircleOutlined} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";

type Props = {
    menu: { path: string, label: string, icon: FC, isAdmin?: boolean }[],
    onClickLogin: any,
}

const SideMenu: FC<Props> = (props: Props) => {
    const userData = useSelector((state: ReducersType) => state.userData);
    function getMenuItems(): any[] {
        const menuItems = props.menu;
        return menuItems.map(item => {
            if(userData.isAdmin && item.isAdmin) {
                return <ListItem button key={item.path} component={Link} to={item.path}>
                    <ListItemIcon><item.icon/></ListItemIcon>
                    <ListItemText primary={item.label}/>
                </ListItem>
            } else if (!userData.isAdmin && !item.isAdmin) {
                return <ListItem button key={item.path} component={Link} to={item.path}>
                    <ListItemIcon><item.icon/></ListItemIcon>
                    <ListItemText primary={item.label}/>
                </ListItem>
            } else {
                return null;
            }
        })
    }

    return (
        <div>
            <List>
                {getMenuItems()}
            </List>
            <Divider/>
            <List>
                <ListItem button key={"login"} onClick={props.onClickLogin}>
                    <ListItemIcon><AccountCircleOutlined/></ListItemIcon>
                    <ListItemText primary={"Account"}/>
                </ListItem>
                {/*<ListItem button key={"night-mode"}>*/}
                {/*    <ListItemIcon><Brightness4Outlined/></ListItemIcon>*/}
                {/*    <ListItemText primary={"Night mode"}/>*/}
                {/*</ListItem>*/}
            </List>

        </div>
    );
}
export default SideMenu