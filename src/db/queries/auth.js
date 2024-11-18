
module.exports.GET_USER_ID = 
`SELECT [user_id] AS userId FROM App_User WITH(NOLOCK) WHERE username = @username;`;

module.exports.GET_LOGIN_PASSWORD = 
`SELECT [hashed_password] AS hashedPassword FROM [App_User] WITH(NOLOCK) WHERE [user_id] = @userId;`;

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