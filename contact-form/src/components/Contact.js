import React from 'react';


class Contact extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.addToDB}>
                <div className="my-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" onChange={this.props.changeNameState} required />
                </div>
                <div className="my-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" onChange={this.props.changeEmailState} required />
                </div>
                <div className="my-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="3" onChange={this.props.changeMessageState} required></textarea>
                </div>
                <input type="submit" />
            </form>
        )
    }

}

export default Contact;