import React from 'react';
import Order from "../../models/orders/Order";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Address from "../../models/orders/Address";
import Checkbox from '@material-ui/core/Checkbox';
import {serviceOrderList} from "../../config/server-config";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function addressToString(a: Address): string {
    return `${a.house} ${a.street} Apt. ${a.apartment}`;
}

function Row(props: { order: Order }) {
    const {order} = props;
    const [open, setOpen] = React.useState(false);
    const [delivered, setDelivered] = React.useState(order.isDelivered);

    async function updateOrder(order: Order, delivered: boolean) {
        order.isDelivered = delivered;
        await serviceOrderList.updateOrder(order.id, order);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked: boolean = event.target.checked;
        setDelivered(checked);
        updateOrder(order, checked).catch(error => alert(error));
    };

    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{order.id}</TableCell>
                <TableCell align="right">{order.clientName}</TableCell>
                <TableCell align="right">{order.clientEmail}</TableCell>
                <TableCell align="right">{order.phoneNumber}</TableCell>
                <TableCell align="right">{order.orderCreationTime}</TableCell>
                <TableCell align="right">{order.orderDeliveryTime}</TableCell>
                <TableCell align="right">{addressToString(order.clientAddress)}</TableCell>
                <TableCell align="right">{order.payment}</TableCell>
                <TableCell align="right">{order.extraInformation}</TableCell>
                <TableCell align="right">{order.totalPrice}</TableCell>
                <TableCell align="center">
                    <Checkbox
                        checked={delivered}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'primary checkbox'}}/>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.orderContent.map((order) => (
                                        <TableRow key={order.name}>
                                            <TableCell component="th" scope="row">
                                                {order.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {order.size}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {order.price}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {order.nProducts}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const Orders: React.FC = () => {
    const orderList: Order[] = useSelector((state: ReducersType) => state.orderList);
    const rows = orderList.map(order => <Row key={order.id} order={order}/>);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Client Name</TableCell>
                        <TableCell align="right">Client Email</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                        <TableCell align="right">Order Creation Time</TableCell>
                        <TableCell align="right">Order Delivery Time</TableCell>
                        <TableCell align="right">Client Address</TableCell>
                        <TableCell align="right">Payment type</TableCell>
                        <TableCell align="right">Extra Information</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Is Delivered</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders;