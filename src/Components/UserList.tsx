import React, { ReactElement, useState } from "react";
import IUser from "./../Interfaces/IUser";
import User from "./User";
type IProps = {
    users: IUser[];
};

const UserList: React.FC<IProps> = ({ users }): ReactElement => {
    const [query, setQuery] = useState<string>("");

    const showingUsers: IUser[] =
        query === ""
            ? users
            : users.filter((user: IUser): boolean => {
                  const name = `${user.name.first} ${user.name.last}`;
                  return name.toLowerCase().includes(query.trim().toLowerCase());
              });

    return (
        <div className="list-users">
            <div className="list-users-top">
                <input
                    type="search"
                    name="search"
                    className="search-users"
                    placeholder="Search Users"
                    value={query}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                />
            </div>

            {showingUsers.length !== users.length && (
                <div className="showing-users">
                    <span>
                        Now Showing {showingUsers.length} from {users.length}
                    </span>
                    <button onClick={() => setQuery("")}>Show All</button>
                </div>
            )}

            <div className="row users-container">
                {users &&
                    showingUsers
                        .sort((user1: IUser, user2: IUser) => user1.name.first.localeCompare(user2.name.first))
                        .map((user: IUser): ReactElement => {
                            return (
                                <div className="col-12 col-md-6" key={user.login.uuid}>
                                    <User user={user} />
                                </div>
                            );
                        })}
            </div>
        </div>
    );
};

export default UserList;
