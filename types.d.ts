import { Connection } from "mongoose"
declare global{
    var mongoose: {
        conn: Connection | null, //either it will be connecting
        promise: Promise<Connection> | null //Or it will return a promise saying connection will happen soon
    }//here the  promise type is connection so it has to return a connection
}