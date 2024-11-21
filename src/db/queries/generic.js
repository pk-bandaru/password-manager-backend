
module.exports.GET_CATEGORIES =
`SELECT	[category_id] AS id,
		[category_code] AS code,
		[category_name] AS name
FROM	[Category] WITH(NOLOCK);`;

module.exports.GET_PASSWORD_TYPES = 
`SELECT	[type_id] AS id,
		[type_code] AS code,
		[type_name] AS name
FROM	[Password_Type] WITH(NOLOCK);`;
