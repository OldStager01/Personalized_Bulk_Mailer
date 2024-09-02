let messages = [];

//*Parsing message for a multiple object
const parseMessages = (headers, data, message) => {
  return new Promise((resolve, reject) => {
    if (!message) {
      reject(new Error("Message cannot be empty"));
    }
    data.forEach((obj) => {
      //Parsing message for a single object
      let parsedMessage = message;
      headers.forEach((header) => {
        parsedMessage = parsedMessage.replaceAll(`$${header}$`, obj[header]);
      });
      messages.push(parsedMessage);
      //obj.message = parsedMessage; //Adding message to object
    });
    if (messages) {
      resolve(messages);
    } else {
      reject(new Error("Error parsing message"));
    }
  });
};

module.exports = parseMessages;
