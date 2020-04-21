import React from 'react';
import Loader from 'react-loader-spinner';

import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsList extends React.Component {
    state = {
        friends: []
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

    render() {
        console.log('this state', this.state)
        return (
            <div>
                <h1>Friends List</h1>
                
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