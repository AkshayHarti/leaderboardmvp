import React from 'react';
import axios from 'axios';
import l10n from '../i18n/en';
import Form from '../common/Form';

class Referee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "http://localhost:3001/api/score",
            error: ""
        }
    }

    onFormSubmit = (content) => {
        let { competitor1, competitor2, result} = content;
        competitor1 = parseInt(competitor1);
        competitor2 = parseInt(competitor2);
        axios.post(this.state.url, {
            competitor1,
            competitor2,
            result
        })
        .then(function (response) {
            if(response.status === 200) {
                alert("Scores registered!");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return(            
            <div className="row2" id="actor">
                <h3>{l10n.welcome} {l10n.referee}</h3>
                <Form id='submitScores-form' action="" method='get' onSubmit={this.onFormSubmit} />
            </div>
        );
    }
}


export default Referee;