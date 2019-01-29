import React, { Fragment } from 'react';
import Input from './Input';
import l10n from '../i18n/en';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            PASSWORD_LENGTH: 6
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        var formDataToBeSubmitted = {};
        const formData = new FormData(e.target);
        for(var pair of formData.entries()) {
            formDataToBeSubmitted[pair[0]] = pair[1];
        }
        let error = this.validateFormContent(e.target.id, formDataToBeSubmitted);
        if(error.length === 0) {
            e.target.reset();
            Array.from(e.target.querySelectorAll("input[type='text']")).forEach(function(item) {
                item.value = '';
            });
            
            this.props.onSubmit(formDataToBeSubmitted);            
        } else {
            this.setState({error: error});
        }
    }

    onFocusForm = () => {
        const error = "";
        this.setState({error});
    }

    getFormContent = (formId) => {
        switch(formId) {
            case "login-form":
                return(
                    <div>
                        <Input type="email" name="email" placeholder={l10n.email} required="true" />
                        <Input type="password" name="password" placeholder={l10n.password} required="true" />
                        <Input type="submit" name="login"  value={l10n.login} />
                        <label htmlFor='form-switch'>{l10n.not_member} <a>{l10n.register}</a></label>
                    </div>
                );
            case "register-form":
                return(
                    <div>
                        <Input type="email" name="email" placeholder={l10n.email} required="true" />
                        <Input type="text" name="name" placeholder={l10n.name} required="true" />
                        <Input type="password" name="password" placeholder={l10n.password} required="true" />
                        <Input type="password" name="reenter" placeholder={l10n.reenter_password} required="true" />
                        <Input type="submit" name="register"  value={l10n.register} />
                        <label htmlFor='form-switch'>{l10n.already_member} <a>{l10n.login}</a></label>
                    </div>
                );
            case "submitScores-form":
                return(
                    <div>
                        <Input type="text" name="competitor1" placeholder={l10n.competitor1} required="true" />
                        <Input type="text" name="competitor2" placeholder={l10n.competitor2} required="true" />
                        <div id="result-radio">
                            <h4>{l10n.h2h_result_title}</h4>
                            <div id="result-radio_group">
                                <Input type="radio" name="result" id="C1" value="1"/><label htmlFor="C1">{l10n.competitor1}</label>
                                <Input type="radio" name="result" id="C2" value="2"/><label htmlFor="C2">{l10n.competitor2}</label>
                                <Input type="radio" name="result" id="draw" value="0"/><label htmlFor="draw">{l10n.draw}</label>
                            </div>
                        </div>
                        <Input type="submit" name="register"  value={l10n.submit_result} />
                    </div>
                );
        }
    }

    isEmailValid = (email) => email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    validateFormContent = (formId, formContent) => {
        console.log(formContent);
        switch(formId) {
            case "login-form":
                let email = formContent.email;
                let password = formContent.password;

                if(!this.isEmailValid(email)) {
                    return "Please fill correct email ID";
                } 

                if(password.length < this.state.PASSWORD_LENGTH) {
                    return "Minimum password length should be 6";
                }
                return "";
            case "register-form":
                email = formContent.email;
                password = formContent.password;
                let repassword = formContent.reenter;
                let isEmailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

                if(!this.isEmailValid(email)) {
                    return "Please fill correct email ID";
                } 

                if(password.length < this.state.PASSWORD_LENGTH) {
                    return "Minimum password length should be 6";
                }

                if(password !== repassword) {
                    return "Passwords do not match";
                }
                return "";
        }
    }

    render() {
        let content = this.getFormContent(this.props.id)
        return(
            <div>
                {this.state.error.length > 0 && <h4 className="error">{this.state.error}</h4>}
                <form
                    id={this.props.id}
                    action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.onSubmitForm}
                    onFocus={this.onFocusForm}
                >
                    {content}
                </form>
            </div>
        );
    }
}

export default Form;