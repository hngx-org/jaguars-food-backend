const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getToken } = require('../utils/tokens.js');
const db = require('../models/index');
const transporter = require('../config/mailConfig');

const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

const verifyPassword = (password, passwordHash) => {
	return bcrypt.compareSync(password, passwordHash);
};

async function generateInvitationToken(email, orgId) {
	// Generate a random 6-digit number
	const generatedToken = crypto.randomInt(100000, 1000000).toString();
	const jwt_token = await getToken({ otp: generatedToken, orgId });
	// console.log(jwt_token);
	// Save the generated token to the database
	const token = await db.organizationInvites.findOne({
		where: { email: email },
	});
	if (token) {
		await db.organizationInvites.update(
			{ token: jwt_token },
			{ where: { email: email } }
		);
	} else {
		await db.organizationInvites.create({
			email: email,
			token: jwt_token,
			org_id: orgId,
		});
	}

	return generatedToken;
}

// function to send the invitation email
function sendInvitationEmail(data, invitationToken) {
	// console.log('Token:', invitationToken);
	const mailOptions = {
		from: process.env.MAIL_FROM_ADDRESS,
		to: data.email,
		subject: 'Free Lunch App Invitation',
		html: `<p>You have been invited by ${data.orgName} to join it's organization on Free Lunch App.<br/>Use the token below to create your account.</p>
				<p>Token: ${invitationToken}</p>
				`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error sending email:', error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

module.exports = {
	hashPassword,
	verifyPassword,
	generateInvitationToken,
	sendInvitationEmail,
};
