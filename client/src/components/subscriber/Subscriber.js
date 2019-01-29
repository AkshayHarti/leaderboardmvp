import React from 'react';
import axios from 'axios';

class Subscriber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: "http://localhost:3001/api/leaderboardInfo",
            lbInterval: "",
            countDownInterval: "",
            timer: 0,
            countDownDate: new Date("Feb 20, 2020 00:00:00").getTime(),
            FETCH_INTERVAL: 30000
        }
    }

    componentWillMount() {
        this.fetchLeaderboard();
        this.state.countDownInterval = setInterval(this.calculateCountDownTimer, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.state.countDownInterval);
    }

    calculateCountDownTimer = () => {            
        // To calculate countdown
        let now = new Date().getTime();
        let distance = this.state.countDownDate - now;
        let seconds = Math.floor((distance % (1000 * 60)) / 1000  % 30);
        if(seconds === 0) {
            this.fetchLeaderboard();
        }
        this.setState({timer: seconds});
    }

    fetchLeaderboard = () => {    
        var self = this;
        axios.get(this.state.url + "?type=basic")
            .then(function(response) {
                self.setState({data: response.data});
            })
            .catch(function (error) {
              console.log(error);
            })
    }

    render() {
        let data = this.state.data;
        let dataLength = data.length;

        return(
            <div className="row2" id="lbs">
                {(this.state.timer <= 10 && this.state.timer > 0) && (<div>
                    <span>Updating in {this.state.timer}s</span>
                </div>)}
                <table id="lb_basic">
                    <tbody>
                        <tr>
                            <th>Rank</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        {data.map((content, index) => {
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{content.id}</td>
                                    <td>{content.name}</td>
                                    <td>{content.totalScore}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Subscriber;