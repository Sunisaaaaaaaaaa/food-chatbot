const dialogflow = require('@google-cloud/dialogflow')
require('dotenv').config({ path: '../.env' })

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

const PROJECTID = CREDENTIALS.project_id

const CONFIGUATION = {
  condentials: {
    private_key: CREDENTIALS['private_key'],
    client_email: CREDENTIALS['client_email'],
  },
}

// create new session
const sessionClient = new dialogflow.SessionsClient(CONFIGUATION)

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId)

  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  }

  const response = await sessionClient.detectIntent(request)
  console.log(response)
  const result = response[0].queryResult
  console.log(result)

  return {
    response: result.fulfillmentText,
    intent: result.intent.isFallback,
    endOfConversation: result.intent.endInteraction,
  }
}

module.exports = { detectIntent }
