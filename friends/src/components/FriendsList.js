import React from 'react';
import Loader from 'react-loader-spinner';

import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsList extends React.Component {
    state = {
        friends: [],
        newFriend: {
            id: '',
            name: '',
            age: '',
            email: '',
        }
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                console.log(res.data)
                this.setState({
                    friends: res.data
                });
            })
            .catch(err => console.log({ err }));
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name
        this.setState({
            ...this.state,
            newFriend: {
                ...this.state.newFriend,
                id: Date.now(),
                [name]: value
            }
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axiosWithAuth()
            .post('/api/friends', this.state.newFriend)
            .then(res => {
                this.setState({
                    ...this.state,
                    friends: [
                        ...this.state.friends,
                        this.state.newFriend
                    ]
                })
            })
            .catch(err => console.log({ err }))
    }

    render() {
        console.log('this state', this.state)
        return (
            <div>
                <h1>Friends List</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:
                    <input
                            type="text"
                            name='name'
                            value={this.state.newFriend.value}
                            onChange={this.handleChange} />
                    </label>
                    <label>Age:
                    <input
                            type="text"
                            name='age'
                            value={this.state.newFriend.value}
                            onChange={this.handleChange} />
                    </label>
                    <label>Email:
                    <input
                            type="text"
                            name='email'
                            value={this.state.newFriend.value}
                            onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
                <div className='cards'>
                    {this.state.friends.map(friend => (
                        <div className='friend-card' key={friend.id}>
                            <h2>{friend.name}</h2>
                            <p>{friend.age}</p>
                            <p>{friend.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default FriendsList;