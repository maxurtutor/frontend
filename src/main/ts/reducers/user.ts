import User from "../domain/User";

const initialState: User = new User();

export default function reducer(user: User = initialState): User {
    return user;
}
