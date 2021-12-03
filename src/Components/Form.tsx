import { ReactElement, useState } from "react";

interface Props {
    onSubmit: (numOfUsers?: number) => Promise<void>;
}

export default function Form({ onSubmit }: Props): ReactElement {
    const [counter, setCounter] = useState<number>(1);

    return (
        <>
            <form
                className="number-of-users-form"
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    onSubmit(counter);
                }}
            >
                <div className="form-group">
                    <label htmlFor="number-of-users">Number oF Users</label>
                    <input
                        type="number"
                        min={1}
                        max={200}
                        id="number-of-users"
                        className="form-control"
                        value={counter}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCounter(
                                parseInt(event.target.value) >= 1
                                    ? parseInt(event.target.value)
                                    : 1
                            );
                        }}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}
