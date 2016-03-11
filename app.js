/**
 * Created by Zoltan_Biro on 1/5/2016.
 */

var Twitter = require('twitter');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs');

var webPath = path.join(__dirname, 'web');

/**Enable servicing static files from hdd*/
app.use(express.static(webPath));

server.listen(1708);

app.get('/', function (req, res) {
    res.sendFile(path.join(webPath, 'index.html'));
});

var client = new Twitter({
		consumer_key: 'pY4KMMD7Ft3WUBf0sYCKZgG5W',
		consumer_secret: 'L1sFN07vRETO8kNw87NAWqnkkHTK6cjzVcQae1MHSfwURB2GJ8',
		access_token_key: '2635117170-pbnfUQbyOoaaQn7ZEI2hPbTrwX8lC3Hk0zGCWOV',
		access_token_secret: 'wsxGgNn3sK39ZVgc1EqnS1dIMsLKtPH0FKchK2Lla83v1'
	});

	var whiteList=['uolwin','fncwin','elwin','spywin','ogwin','g2win','rocwin','vitwin','tsmwin','imtwin','clgwin','digwin','renwin','h2kwin','giawin','c9win','lcs','tipwin','nrgwin','tlwin','foxwin','eulcs','nalcs'];

	var teamMapObj= {
		"uolwin":0,
		"fncwin":0,
		"elwin":0,
		"spywin":0,
		"ogwin":0,
		"g2win":0,
		"rocwin":0,
		"vitwin":0,
		"tsmvin":0,
		"imtwin":0,
		"clgwin":0,
		"digwin":0,
		"renwin":0,
		"h2kwin":0,
		"giawin":0,
		"c9win":0,
		"tipwin":0,
		"nrgwin":0,
		"tlwin":0,
		"foxwin":0,
		"lcs":0,
		"eulcs":0,
		"nalcs":0
	};

	var extractHastag = function(txt){
		var tags = txt.split(' ').filter(function(value, index, obj){
				if (value.indexOf('#')===0 && value.length>1){
					return true;
				}
				return false;
			});
		return tags;
	};

	var checkWhiteList = function(allHashTags){
		var checkedList = [];
		allHashTags.forEach(function(element, i ,allHashTags){
			var str = element.toLocaleLowerCase().slice(1);
			if (whiteList.indexOf(str)!==-1){
				checkedList.push(str);

			}
		});
		return checkedList;
	};

	var filter = whiteList.toString();

	client.stream('statuses/filter', {track: filter}, function(stream) {
		
		stream.on('data', function(tweet) {
			if (tweet.hasOwnProperty('text')){
				var allHastags = extractHastag(tweet.text);
				var hastags = checkWhiteList(allHastags);

				if (hastags.length > 0){
					hastags.forEach(function(element){
						teamMapObj[element]++;
					});
					console.log(tweet.text);
					Object.getOwnPropertyNames(teamMapObj).forEach(function(element){
						console.log(element+" : "+teamMapObj[element]);
					});
					console.log('---------------------------------------------------');
					
					io.emit('update',JSON.stringify(teamMapObj));
				}
			}
		});

		stream.on('error', function(error) {
			throw error;
		});
	});
