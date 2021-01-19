import React, {FC, useEffect} from 'react';
import styled from 'styled-components';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination, IconButton, Paper, Theme

} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PopUpTable from "./PopUpTable";

export type HeaderDescription = {
    displayName: string;
    numeric: boolean;
    width?: string
}
type Props = {
    headers: Map<string, HeaderDescription>
    rows: object[],
    innerWidth?: number
    defaultRowsPerPage?: number;
    isDetails?: boolean;
    actions?: { icon: JSX.Element, actionFn: (obj: object) => any }[

        ]
}
const StyledTablePagination = styled(TablePagination)`
.MuiTablePagination-actions {
margin: 0;
}
.MuiTablePagination-selectRoot {
margin-right: 2px;,
margin-left: 0
}
.MuiIconButton-root {
padding: 0;
}
` as typeof TablePagination;


const useStyles = makeStyles((theme: Theme) => ({
    table: (props: any) => ({
        width: props.width
    }),

    container: {
        [theme.breakpoints.down('sm')]: {width: "80%"},
        [theme.breakpoints.up('sm')]: {width: "90%"},
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {marginLeft: theme.spacing(1)},
        [theme.breakpoints.up('md')]: {marginLeft: theme.spacing(8)},
    },

    header: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },


}));

function getPopUpData(row: object): string[] {

    return Object.entries(row).map(e => `${e[0]}: ${e[1]}`);
}

export const DataTable: FC<Props> = (props: Props) => {
    const defaultRowsPerPage = props.defaultRowsPerPage || 5;
    const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
    const [page, setPage] = React.useState(0);
    const propsCSS = {width: props.innerWidth && (props.innerWidth < 500 ? 400 :
            530)}
    const classes = useStyles(propsCSS);

    if (rowsPerPage > 0 && props.rows.length / rowsPerPage < page) {
        setPage(0)
    }

   useEffect(()=>{
       setRowsPerPage(defaultRowsPerPage);
   }, [defaultRowsPerPage])

    function getHeaders(): JSX.Element[] {
        const cells: any[] = [];

        props.headers.forEach((value, key) => {
            cells.push(<TableCell className={classes.header}
                                  align={value.numeric ? 'right' : 'left'}
                                  key={key}>{value.displayName}</TableCell>)
        })
        if (props.actions) {
            for (let i = 0; i < props.actions.length; i++) {
                cells.push(<TableCell key={i}/>)
            }
        }
        if (props.isDetails) {
            cells.push(<TableCell key={props.actions ? props.actions.length : 1}/>)
        }

        return cells;

    }

    function getRows(): JSX.Element[] {

        const keys: string[] = [];

        props.headers.forEach((value, key) => {
            keys.push(key);
        })
        const rowsRes = rowsPerPage > 0 ?
            props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [...props.rows];
        return rowsRes.map((row, index) => getRow(row, index, keys));

    }

    function getRow(row: object, index: number, keys: string[]): JSX.Element {
        return <TableRow key={index}>
            {getDataCells(row, keys)}
        </TableRow>
    }

    function getActionButtons(row: object): JSX.Element[] {
        let res: JSX.Element[] = [];
        if (props.actions) {
            res = props.actions.map((a, index) => <TableCell key={index} padding="checkbox">
                <IconButton size={"small"} onClick={() => {
                    a.actionFn(row)
                }
                }>
                    {a.icon}
                </IconButton>
            </TableCell>)
        }
        return res;

    }

    function getDataCells(row: any, keys: string[]): JSX.Element[] {
        const res = keys.map(k => <TableCell key={k} align={props.headers.get(k)?.numeric ? 'right' : 'left'}
                                             style={!!props.headers.get(k)?.width ? {'width': props.headers.get(k)?.width} : undefined}>
            {row[k]}</TableCell>)
        props.isDetails && res.push(<TableCell key={row[keys[0]]} padding="checkbox">
            <PopUpTable data={getPopUpData(row)}/>
        </TableCell>)

        return props.actions ? res.concat(getActionButtons(row)) : res;
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(+event.target.value);

    };

    return <TableContainer component={Paper} elevation={3} className={classes.container}>
        <Table className={classes.table} size="medium">
            <TableHead>
                <TableRow>
                    {getHeaders()}
                </TableRow>
            </TableHead>
            <TableBody>
                {getRows()}
            </TableBody>
            <TableFooter>
                <TableRow>
                    {props.innerWidth && props.innerWidth < 500 ? <StyledTablePagination
                        labelRowsPerPage={'Rows'}
                        rowsPerPageOptions={[5, 10, 15, {
                            label: 'All',
                            value: -1
                        }]}
                        count={props.rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}


                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}

                    /> : <TablePagination
                        rowsPerPageOptions={[5, 10, 15, {
                            label: 'All',
                            value: -1
                        }]}
                        count={props.rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}


                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}/>}
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
}
