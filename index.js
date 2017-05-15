'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_key') {
		res.send(req.query['hub.challenge'])
	} else {
		res.send('Error, wrong token')
	}
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Generic'){ 
				console.log("welcome to chatbot")
				//sendGenericMessage(sender)
				continue
			}
			if(text.includes("kaart")){ 
			//var myButton = function(sendButtonMessage)
			sendTextMessage(sender, "Leuk dat je kaartjes wil bestellen! ")
			sendGenericMessage(sender)
			}
			else if(text.includes("ticket")){
				sendTextMessage(sender, "Leuk dat je tickets wil bestellen!")
				sendGeneric2Message(sender)
			}
			else if(text.includes("bewijs")){
				sendTextMessage(sender, "Leuk dat je kaartjes wil bestellen!")
				//sendButtonMessage(sender, text)
			}
			else if(text.includes("H")){
				sendTextMessage(sender, "Hoi! Wat kan ik voor je doen?")
			}
			else{
				sendTextMessage(sender, "Sorry, ik begrijp je niet helemaal, probeer eens kaartje of ticket !")
			}
			
			}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, text.substring(0, 200), token)
			//sendGeneric2Message(sender)
			continue
		}
		
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN
var token = "EAADAKF2rD7UBAHFPNtbSgcobModwbCstgthKey8yPp0HACPGlW3W45nEaB9SEtldMaP0l7sQBobiFDtDdDjr82lLnKiDss5fndtqkVjZC2DZBnW9kOQBdKnulJh0T13gyTeouEoi2IaqjIIsD9axEOuZCCcsgMfsxlvERr5uQZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {

	let messageData = {

		"attachment": {

			"type": "template",

			"payload": {

				"template_type": "generic",

				"elements": [{

					"title": "Wat voor kaartjes zou je willen bestellen?",

					"subtitle": "We hebben VIP of Regular tickets!",

					"image_url": "https://www.google.co.uk/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi4_PS8r_LTAhUkIMAKHRwNBBkQjRwIBw&url=https%3A%2F%2Fwww.repro.nl%2Ffotobehang-zeeolifant.html&psig=AFQjCNHVDqq-CBQSJ2t-UO61OLFilNFmhg&ust=1494953916727295",

					"buttons": [{

						"type": "postback",

						"title": "VIP",

						"payload": "Leuk dat je VIP tickets wil bestellen!"

					}, {

						"type": "postback",

						"title": "Regular",

						"payload": "Leuk dat je Regular tickets wil bestellen!",

					}],

				}]
				
			}

		}

	}
	
	request({

		url: 'https://graph.facebook.com/v2.6/me/messages',

		qs: {access_token:token},

		method: 'POST',

		json: {

			recipient: {id:sender},

			message: messageData,

		}

	}, function(error, response, body) {

		if (error) {

			console.log('Error sending messages: ', error)

		} else if (response.body.error) {

			console.log('Error: ', response.body.error)

		}

	})

}

function sendGeneric2Message(sender) {

	let messageData = {

		"attachment": {

			"type": "template",

			"payload": {

				"template_type": "generic",

				"elements": [{

					"title": "Hoe veel kaartjes zou je willen bestellen?",

					"subtitle": "Je kan per persoon maximaal 5 kaartjes bestellen!",

					"image_url": "",

					"buttons": [{

						"type": "web_url",

						"url": "",

						"title": "1"

					}, {

						"type": "web_url",

						"url": "",

						"title": "2",

					},{

						"type": "web_url",

						"url": "",

						"title": "3",

					},{

						"type": "web_url",

						"url": "",

						"title": "4",

					},{

						"type": "web_url",

						"url": "",

						"title": "5",

					}],

				}]
				
			}

		}

	}
	
	request({

		url: 'https://graph.facebook.com/v2.6/me/messages',

		qs: {access_token:token},

		method: 'POST',

		json: {

			recipient: {id:sender},

			message: messageData,

		}

	}, function(error, response, body) {

		if (error) {

			console.log('Error sending messages: ', error)

		} else if (response.body.error) {

			console.log('Error: ', response.body.error)

		}

	})

}

function sendButtonMessage(sender, text){
	let messagedata = {
		"message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"web_url",
            "title":"Vip",
            "payload":"Leuk dat je Vip tickets wil bestellen ! Hoe veel wil je er bestellen?"
          },
          {
            "type":"postback",
            "title":"Regular",
            "payload":"Leuk dat je regular tickets wil bestellen! Hoe veel wil je er bestellen?"
          }
        ]
      }
    }
  }
}
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
