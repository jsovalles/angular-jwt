export class User {
    username: string;
    password: string;
    user:{
        username: string;
        authorities: [
            {authority: string
            }
        ]

    };
    token : string;
}