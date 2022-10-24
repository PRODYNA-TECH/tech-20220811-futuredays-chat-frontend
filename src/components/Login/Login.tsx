import React from "react";
import './Login.css';

type LoginProps = {
    setUserName: (username: string) => void;
};

const Login = ({setUserName}: LoginProps): JSX.Element => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = event.currentTarget.elements.namedItem('inputUserName') as HTMLInputElement;
        setUserName(name.value);
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputUserName" className="sr-only">Username</label>
            <input type="text" id="inputUserName" className="form-control" placeholder="Username" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
}

export default Login;
