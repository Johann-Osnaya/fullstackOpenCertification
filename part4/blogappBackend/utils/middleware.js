const logger = require('./logger')
const jwt = require('jsonwebtoken')
const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method)
	logger.info('Path:   ', request.path)
	logger.info('Body:   ', request.body)
	logger.info('---')
	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).send({ error: error.message })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).send({ error: 'token expired' })
	}
	next(error)
}

const TokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	}
	next()
}

const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if(!decodedToken.id) {
		return response.status(400).send({ error: 'token ivalid' })
	}
	request.user = decodedToken.id
	next()
}

module.exports ={
	requestLogger,errorHandler, TokenExtractor, userExtractor
}