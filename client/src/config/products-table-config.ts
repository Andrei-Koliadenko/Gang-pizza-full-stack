import {HeaderDescription} from "../components/page elements/DataTable";
import FoodType from "../models/food/FoodType";

export const headersAll: Map<string, HeaderDescription> = new Map([
    ['id', {displayName: 'ID', numeric: false}],
    ['foodType', {displayName: 'FoodType', numeric: false}],
    ['name', {displayName: 'Name', numeric: false}],
    ['description', {displayName: 'Description', numeric: false}],
    ['hot', {displayName: 'Hot', numeric: false}],
    ['isVegan', {displayName: 'Vegetarian', numeric: false}],
    ['price', {displayName: 'Price', numeric: false}],
    ['picture', {displayName: 'Picture', numeric: false}],


]);
const headersXsAdmin: Map<string, HeaderDescription> = new Map([
    ['name', {displayName: 'Name', numeric: false}],

]);
const headersXs: Map<string, HeaderDescription> = new Map([
    ['name', {displayName: 'Name', numeric: false}],
    ['description', {displayName: 'Description', numeric: false}],

]);
const headersMdAdmin: Map<string, HeaderDescription> = new Map([

    ['name', {displayName: 'Name', numeric: false}],
    ['description', {displayName: 'Description', numeric: false}],
]);
const headersMd: Map<string, HeaderDescription> = new Map([
    ['id', {displayName: 'ID', numeric: false}],
    ['name', {displayName: 'Name', numeric: false}],
    ['price', {displayName: 'Price', numeric: false}],
    ['description', {displayName: 'Description', numeric: false}],
]);
export const headersWidth: Array<[number, Map<string, HeaderDescription>]> = [
    [1200, headersAll],
    [500, headersMd],
    [200, headersXs]
];
export const headersWidthAdmin: Array<[number, Map<string, HeaderDescription>]> = [
    [1200, headersAll],
    [500, headersMdAdmin],
    [0, headersXsAdmin]
]
