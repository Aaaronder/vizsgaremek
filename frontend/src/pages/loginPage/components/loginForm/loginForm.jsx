import './loginForm.css'

function LoginForm() {

    return (
        <>
            <form class="form">
                <p class="title">Register </p>
                <p class="message">Signup now and enjoy everyones music.</p>
                <label>
                    <input class="input" type="text" placeholder="" required="" />
                    <span>Username</span>
                </label>

                <label>
                    <input class="input" type="email" placeholder="" required="" />
                    <span>Email</span>
                </label>

                <label>
                    <input class="input" type="password" placeholder="" required="" />
                    <span>Password</span>
                </label>
                <label>
                    <input class="input" type="password" placeholder="" required="" />
                    <span>Confirm password</span>
                </label>
                <button class="submit">Submit</button>
                <p class="signin">Already have an acount ? <a className='toSignIn' href="#">Signin</a> </p>
            </form>
        </>
    )
}

export default LoginForm