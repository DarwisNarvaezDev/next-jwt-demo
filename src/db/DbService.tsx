import knex from "knex";
import { development, staging, production } from '../../knexfile';

export default function getDb(){
    // validate node profile
    return knex(development);
}