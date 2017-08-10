import courier from 'courier-js';
import React, { Component } from 'react';
import { Email, Item, Span, A } from 'react-html-email';

const action = process.argv[2];

export default class MailComponent extends Component {
	klik() {
		
const MyLinkComponent = ({ href }) => (
  <Email title='link'>
    <Item>
      <Span data-mc-edit="article_content" style={styles.text}>
        <A href={href}>We are hiring!</A>
      </Span>
    </Item>
  </Email>
);
const allTemplates = {
  myTemplate: {
    template: MyLinkComponent,
    fileName: 'linkcomponent'
  }
};
const templateProps = {
  href: 'http://mic.com/jobs'
};

const { render, compile, mailchimp } = courier({ allTemplates });
const mailchimpConfig = {
  key: '63a36243370021b003693b2f228277db-us16',
  datacenter: 'us-16'
};
const mailchimpOpts = {
  campaign: { }, // Mailchimp campaign details
  templateId: '', // Mailchimp template id
    templateData: {
      name: 'My Link Component Template', // template name on Mailchimp
      html: render('myTemplate', templateProps) // html string from our template
    }
};
// render is a wrapper around `renderEmail` with provides Mailchimpify and pretty HTML
render('myTemplate', templateProps); // renders html string from 'myTemplate'’s template with your template props.
compile('myTemplate', templateProps, __dirname); // creates a `linkcomponent.html` file from your component on the current directory.
const { init } = mailchimp(mailchimpConfig, mailchimpOpts);
// updates Mailchimp template, creates new campaign, updates campaign content and sends it
init()
  .then(() => console.log('done sending campaign'))
  .catch((error) => console.log(error));

}
	render(){
		


		return (
		<button onClick={this.klik} >klik </button>

		);
	}
}