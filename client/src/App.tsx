import React, {useEffect} from 'react';
import './App.css';
import createMuiTheme, {Theme} from "@material-ui/core/styles/createMuiTheme";
import {HashRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core';
import {
    PATH_PRODUCTS,
    PATH_DRINK,
    PATH_HOME,
    PATH_ORDERS,
    PATH_PIZZA, PATH_STATISTIC,
    PATH_MAKE_ORDER
} from "./config/links";
import Promotions from "./components/pages/Promotions";
import Pizza from "./components/pages/Pizza";
import Drink from "./components/pages/Drink";
import Header from "./components/page elements/Header";
import Orders from "./components/pages/Orders";
import Statistic from "./components/pages/Statistic";
import Products from "./components/pages/Products";
import Footer from "./components/page elements/Footer";
import {orderListAction, productListAction, userDataAction, widthAction} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import usePollerRedux from "./components/Poller";
import {authService, POLLING_INTERVAL, serviceOrderList, serviceProductList} from "./config/server-config";
import ErrorTypes from "./util/ErrorTypes";
import FoodServer from "./models/food/FoodServer";
import MakeOrder from "./components/pages/MakeOrder";
import Order from "./models/orders/Order";
import Spinner from "./components/page elements/Spinner";
import {UserData} from "./services/auth/AuthService";
import {ReducersType} from "./store/store";
import {brown} from "@material-ui/core/colors";


function errorHandler(error: ErrorTypes) {
    // if (error === ErrorTypes.AUTH_ERROR) {
    //     authService.logout().then();
    // }
}

function App() {
    usePollerRedux<FoodServer[]>(serviceProductList, serviceProductList.getProductsObservable, productListAction, errorHandler, POLLING_INTERVAL)
    usePollerRedux<Order[]>(serviceOrderList, serviceOrderList.getOrders, orderListAction, errorHandler, POLLING_INTERVAL)
    usePollerRedux<UserData>(authService, authService.getUserData, userDataAction, errorHandler)
    const dispatch = useDispatch();
    const userData = useSelector((state: ReducersType) => state.userData);
    useEffect(() => window.addEventListener('resize',
        () => dispatch(widthAction(window.innerWidth))), [dispatch])
    const theme: Theme = createMuiTheme({
        spacing: 8,
        palette: {
            primary: {
                main: brown[500],
            },
            secondary: {
                main:'#fff7e6',
            },
            //main: "#052736",
            info: {
                main: '#FFFEF7',
            },
            error: {
                main: "#BF1650",
            }
        },
    })

    return <ThemeProvider theme={theme}>
        <Spinner/>
        <div className={'page-container'}>
            <div className={'content-wrap'}>
                <HashRouter>
                    <Header/>
                    <Switch>
                        <Route path={PATH_HOME} exact render={() => {
                            return <Promotions/>
                        }}/>
                        <Route path={PATH_PIZZA} exact render={() => {
                            return <Pizza/>
                        }}/>
                        <Route path={PATH_DRINK} exact render={() => {
                            return <Drink/>
                        }}/>
                        <Route path={PATH_PRODUCTS} exact render={() => {
                            return userData.isAdmin && <Products/>
                        }}/>
                        <Route path={PATH_ORDERS} exact render={() => {
                            return userData.isAdmin && <Orders/>
                        }}/>
                        <Route path={PATH_STATISTIC} exact render={() => {
                            return userData.isAdmin && <Statistic/>
                        }}/>
                        <Route path={PATH_MAKE_ORDER} exact render={() => {
                            return <MakeOrder/>
                        }}/>
                    </Switch>
                </HashRouter>
            </div>
            <Footer/>
        </div>
    </ThemeProvider>
}

export default App;
