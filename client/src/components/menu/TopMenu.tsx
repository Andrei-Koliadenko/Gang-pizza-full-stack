import React, {FC, useCallback, useEffect, useState} from 'react';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";

type Props = {
    menu: { path: string, label: string, icon: FC, isAdmin?: boolean }[],
}

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#583100',
        },
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

const TopMenu: React.FC<RouteComponentProps & Props> = (props: RouteComponentProps & Props) => {
    const menu = props.menu;
    const userData = useSelector((state: ReducersType) => state.userData);
    const [tabValue, setTabValue] = useState<number>(0);
    const handleChange = (event: any, tabValue: number) => {
        setTabValue(tabValue);
    }

    function getMenuItems(): any[] {
        return menu.map(item => {
            if (userData.isAdmin && item.isAdmin) {
                return <Tab key={item.path} component={Link} to={item.path}
                            label={item.label} icon={<item.icon/>} disableRipple> </Tab>
            } else if (!userData.isAdmin && !item.isAdmin) {
                return <Tab key={item.path} component={Link} to={item.path}
                            label={item.label} icon={<item.icon/>} disableRipple> </Tab>
            } else {
                return null;
            }
        })
    }

    return (
        <StyledTabs value={tabValue} onChange={handleChange} aria-label="styled tabs">
            {getMenuItems()}
        </StyledTabs>
    );
}
export default withRouter(TopMenu);
