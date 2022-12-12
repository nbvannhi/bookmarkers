import React from 'react'

function SignIn() {
    return (
        <div className='auth'>
            <h1>Sign in page</h1>
            <form>
                <input type="text" placeholder="email"/>
                <input type="text" placeholder="password"/>
                <button>Sign in</button>
            </form>
        </div>
    )
}

export default SignIn