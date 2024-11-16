
module.exports.GET_USER_ID = 
`SELECT TOP 1 [user_id] FROM App_User WITH(NOLOCK) WHERE username = @username;`;

module.exports.INSERT_NEW_USER_RECORD = 
`INSERT INTO [App_User] 
(
	first_name,
	last_name,
	username,
	hashed_password,
	default_passcode,
	passcode_hint
)
VALUES 
(
	@firstname,
	@lastname,
	@username,
	@password,
	@passcode,
	@hint
);`;