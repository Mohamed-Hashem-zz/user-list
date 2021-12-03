import axios from "axios";
import { useState, useEffect } from "react";
import Form from "./Components/Form";
import Loading from "./Components/Loading";
import UserList from "./Components/UserList";
import IUser from "./Interfaces/IUser";

export default function App() {
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async (numOfUsers: number = 1) => {
        try {
            await axios.get(`https://randomuser.me/api/?results=${numOfUsers}`).then((response) => {
                setUsers(response.data.results);
                setLoading(false);
                setError(null);
            });
        } catch (error) {
            setLoading(false);
            setError((error as Error).message);
            setUsers(null);
        }
    };

    useEffect(() => {
        const fetchData: () => Promise<void> = async () => await fetchUsers();
        fetchData();
    }, []);

    return (
        <div>
            <div className="App-header">User List</div>
            <main>
                <Form onSubmit={fetchUsers} />
                {loading && <Loading />}
                {!loading && users && <UserList users={users} />}
                {!loading && error && <h4 className="error">{error}</h4>}
            </main>
        </div>
    );
}
