import React from 'react';
import '../styles/Account.css';

class Account extends React.Component {
  render() {
    return (
      <div className="account-page">
        <h2 className="account-title">Account Information</h2>
        <div className="account-info">
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <p>Account Created: January 1, 2020</p>
          <button className="edit-account-btn">Edit Account</button>
        </div>
      </div>
    );
  }
}

export default Account;
