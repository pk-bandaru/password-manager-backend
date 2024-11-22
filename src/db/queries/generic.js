
module.exports.GET_CATEGORIES =
`SELECT	[category_code] AS id,
		[category_name] AS name
FROM	[Category] WITH(NOLOCK);`;

module.exports.GET_PASSWORD_TYPES = 
`SELECT	[type_code] AS id,
		[type_name] AS name
FROM	[Password_Type] WITH(NOLOCK);`;
