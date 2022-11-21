//Declaration Merging:
//Merge two separate declarations with same name into a single def,
//with the features of both.
//Add additional property to the express Request interface -> use this
//custom implementation where we know the value is set (eg authenticated routes)

import { UserInterface } from "../user";

declare module 'express-serve-static-core' {
    interface Request {
        user: UserInterface;
    }
}