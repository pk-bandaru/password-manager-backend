
module.exports.GET_ACCOUNTS = 
`SELECT	a.[account_id] AS id,
		a.[account_name] AS accountName,
		c.[category_code] AS categoryCode
FROM	[Account] a
JOIN	[Category] c
ON		a.category_id = c.category_id
WHERE	a.[user_id] = @userId;`;