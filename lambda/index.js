/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const data = require('./data.json');

/*CALLING THE SECOND API*/

const GetExplanationAPIHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'getExplanationApi';
    },
    handle(handlerInput) {
        const getExplanationResult = handlerInput.requestEnvelope.request.apiRequest.arguments.getExplanationResult;

// setting the default response.
        let databaseResponse = `I don't know much about ${getExplanationResult.name}.`;

        const year = getExplanationResult.year;
        const month = getExplanationResult.month;
        const day = getExplanationResult.day;

// setting the actual response if we find a match for their preference
        if (year !== null && month !== null && day !== null) {
            const key = `${year}-${month}-${day}`;
            databaseResponse = data[key];
        }
            const descriptionEntity = {
                explanation: databaseResponse.explanation
    };
    const response = buildSuccessApiResponse(descriptionEntity);
    console.log('GetExplanationAPIHandler', JSON.stringify(response));

    return response;


    }
}



/*CALLING THE FIRST API*/
const getTitleApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
         && handlerInput.requestEnvelope.request.apiRequest.name === 'getTitleApi';
    },
    handle(handlerInput) {
        const apiRequest = handlerInput.requestEnvelope.request.apiRequest;

        let year = resolveEntity(apiRequest.slots, "year");
        let month = resolveEntity(apiRequest.slots, "month");
        let day = resolveEntity(apiRequest.slots, "day");

        const recommendationEntity = {};
        if (year !== null && month !== null && year !== null) {
            const key = `${year}-${month}-${day}`;
            const databaseResponse = data[key];

    console.log("Response from mock database ", databaseResponse);

    recommendationEntity.name = databaseResponse.title;
    recommendationEntity.year = year
    recommendationEntity.month = month
    recommendationEntity.day = day;
    }

    const response = buildSuccessApiResponse(recommendationEntity);
    console.log('GetRecommendationAPIHandler', JSON.stringify(response));
    return response;


    }
}
// *****************************************************************************
// Resolves slot value using Entity Resolution
const resolveEntity = function(resolvedEntity, slot) {

    //This is built in functionality with SDK Using Alexa's ER
    let erAuthorityResolution = resolvedEntity[slot].resolutions
        .resolutionsPerAuthority[0];
    let value = null;

    if (erAuthorityResolution.status.code === 'ER_SUCCESS_MATCH') {
        value = erAuthorityResolution.values[0].value.name;
    }

    return value;
};

const buildSuccessApiResponse = (returnEntity) => {
    return { apiResponse: returnEntity };
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        GetExplanationAPIHandler,
        getTitleApiHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
   // .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();