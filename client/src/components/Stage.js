import React from 'react';
import axios from 'axios';
import Header from './common/Header';
import Input from './common/Input';
import Form from './common/Form';
import l10n from './i18n/en';

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actor: (props.match.params.id === "1") ? l10n.referee : (props.match.params.id === "2") ? l10n.competitor : l10n.subscriber,
            urls: {
                "Referee": ["http://localhost:3001/api/newReferee", "http://localhost:3001/api/myReferee"],
                "Competitor": ["http://localhost:3001/api/newCompetitor", "http://localhost:3001/api/myCompetitor"],
                "Subscriber": ["http://localhost:3001/api/newSubscriber", "http://localhost:3001/api/mySubscriber"]
            }
        }
    }

    onFormSubmit = (formData) => {
        if(Object.keys(formData).length > 2) {
            this.registerForm(formData, this.state.actor);
        } else {
            this.loginForm(formData, this.state.actor);
        }
        const route = "/" + this.state.actor;
        this.props.history.push(route);
    }

    loginForm = (formData, actor) => {
        axios.get(this.state.urls[actor][1], {
            usn: formData.email,
            pwd: formData.password
        })
        .then(function(response){
            console.log();
        })
    }

    registerForm = (formData, actor) => {
        var self = this;
        axios.post(this.state.urls[actor][0], {
            usn: formData.email,
            pwd: formData.password,
            name: formData.name
        })
        .then(function(response) {
            if(response.status === 200) {
                console.log(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let route = "/" + this.state.actor;
        return(
            <div className="row2" id={this.state.actor}>
                <h3>{this.state.actor} - {l10n.login}/{l10n.register} <br /></h3>
                <Input type='checkbox' id='form-switch' />
                <Form id='login-form' action="" method='get' to={this.state.actor} onSubmit={this.onFormSubmit} />
                <Form id='register-form' action="" method='get' to={this.state.actor} onSubmit={this.onFormSubmit} />
            </div>
        );
    }
}

export default Stage;
