const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const Canvas = require('canvas');
const client = new Discord.Client({
    restRequestTimeout: 1048576,
	retryLimit: 64
  })

const nodeModulesPath = path.join(__dirname, "node_modules");

function installDeps() {
	console.log("Installing dependencies, please wait...");
	execSync("npm install --only=prod", {
		cwd: __dirname, 
		stdio: [ null, null, null ]
	});
	console.log("Dependencies successfully installed!");
	//powercord.pluginManager.remount(__dirname);
}

if (!fs.existsSync(nodeModulesPath)) {
	installDeps();
	return;
}

let sender

client.on('ready', () => {
	try{
		console.log("Connected as "+client.user.tag)
		
		client.user.setActivity("for ^stoopit", {type: "WATCHING"})
		
		/*
		console.log("Servers:")
		client.guilds.cache.forEach((guild) => {
			console.log(" - " + guild.name)
	
			guild.channels.cache.forEach((channel) => {
				console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
				//if (channel.type=="text"){
				//	let channel1=client.channels.cache.get(channel.id)
				//	channel1.send("Guys, help, I can't log into discord. This message is sent from the code, so I won't know what you reply.")
				//}
			})
			//general text channel --> 731034798667333664
		})
		*/
		
		let generalChannel = client.channels.cache.get("731034798667333664")
		let botChannel = client.channels.cache.get("731035579910848612")
		let general2Channel = client.channels.cache.get("730255393816838237")
		let bot2Channel = client.channels.cache.get("733931897931169802")
		let general3Channel = client.channels.cache.get("739069493078392842")
		let bot3Channel = client.channels.cache.get("739069776332324975")
		const attachment = new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/731035165819666520/738049503063703662/communism.gif")
		//generalChannel.send(attachment)
		//botChannel.send(attachment)
		//general2Channel.send(attachment)
		//bot2Channel.send(attachment)
		//general3Channel.send(attachment)
		//botChannel3.send(attachment)
		//generalChannel.send("The Comunist Pig bot is ready to be used.")
		//botChannel.send("The Comunist Pig bot is ready to be used.")
		//general2Channel.send("The Comunist Pig bot is ready to be used.")
		//bot2Channel.send("The Comunist Pig bot is ready to be used.")
		//general3Channel.send("The Comunist Pig bot is ready to be used.")
		//bot3Channel.send("The Comunist Pig bot is ready to be used.")
		
		
		
		
		//client.channels.cache.get("791600195603267584").send(piFunction())
		
	} catch(err) {
		console.log(err.stack)
	}
})

client.on('message', async (receivedMessage) => {
	try{
		if (receivedMessage.author.bot) {
			return
		}
	
		//receivedMessage.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)
		
		//receivedMessage.react("👍")
		//let customEmoji = receivedMessage.guild.emojis.get("727151557925273630")
		//receivedMessage.react(customEmoji)
		
		if (receivedMessage.content.trim().toLowerCase().startsWith("^stoopit ")) {
			if (receivedMessage.channel.name=="e") {
				return
			}
			processFunction(receivedMessage)
		}
		else if (receivedMessage.content.trim().toLowerCase()=="^stoopit") {
			receivedMessage.channel.send("Yes? Oh, uh, right. I'm fully working with no errors (I guess. Is that my line?)")
		}
		else if (receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
			receivedMessage.channel.send("Hmm, typos")
		}
		if (receivedMessage.content.trim().toLowerCase().includes(" gg ") || receivedMessage.content.trim().toLowerCase()=="gg" || receivedMessage.content.trim().toLowerCase().startsWith("gg ") || receivedMessage.content.trim().toLowerCase().endsWith(" gg") || receivedMessage.content.trim().toLowerCase().endsWith("\ngg") || receivedMessage.content.trim().toLowerCase().endsWith("gg\n") || receivedMessage.content.trim().toLowerCase().endsWith("\ngg\n")) {
			receivedMessage.react("🅱")
		}
		if (receivedMessage.channel.name=="e") {
			eFunction(receivedMessage)
		}
		if (receivedMessage.mentions.members.size > 0) {
			mentionMessageFunction(receivedMessage)
		}
		/*
		if (receivedMessage.mentions.roles.size > 0) {
			receivedMessage.mentions.roles.array().forEach((role) => {
				if (role.permissions.has("ADMINISTRATOR")) {
					if (receivedMessage.mentions.everyone==true || receivedMessage.author==client.user || receivedMessage.member.hasPermission("ADMINISTRATOR") || receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
						return
					}
					adminMentionFunction(receivedMessage)
				}
			})
		}
		if (receivedMessage.mentions.everyone) {
			if (receivedMessage.member.hasPermission("ADMINISTRATOR") || receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
				return
			}
			everyoneMentionFunction(receivedMessage)
		}
		*/
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
})


function processFunction(receivedMessage) {
	try{
		let fullCommand = receivedMessage.content.trim()./*toLowerCase().*/substring(9)
		let splitCommand = fullCommand.split(" ")
		let primaryCommand = splitCommand[0]
		let arguments = splitCommand.slice(1)
		
		if (primaryCommand.trim().toLowerCase() == "help" || primaryCommand.trim().toLowerCase() == "halp" || primaryCommand.trim().toLowerCase() == "command" || primaryCommand.trim().toLowerCase() == "commands") {
			helpCommand(arguments, receivedMessage)
		} else if (primaryCommand.trim().toLowerCase() == "multiply" || primaryCommand.trim().toLowerCase() == "time" || primaryCommand.trim().toLowerCase() == "times") {
			multiplyCommand(arguments, receivedMessage)
		} 
		else if (primaryCommand.trim().toLowerCase() == "add" || primaryCommand.trim().toLowerCase() == "sum" || primaryCommand.trim().toLowerCase() == "plus") {
			addCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "minus" || primaryCommand.trim().toLowerCase() == "subtract" || primaryCommand.trim().toLowerCase() == "difference") {
			minusCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "divide") {
			divideFunction(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "factorial" || primaryCommand.trim().toLowerCase() == "fac" || primaryCommand.trim().toLowerCase() == "factorialize" || primaryCommand.trim().toLowerCase() == "factorialise" || primaryCommand.trim().toLowerCase() == "fct") {
			facCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "ping" || primaryCommand.trim().toLowerCase() == "speed" || primaryCommand.trim().toLowerCase() == "network" || primaryCommand.trim().toLowerCase() == "latency" || primaryCommand.trim().toLowerCase() == "uptime" || primaryCommand.trim().toLowerCase() == "downtime") {
			pingCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "pong") {
			pongCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "die") {
			dieFunction(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "google" || primaryCommand.trim().toLowerCase() == "search") {
			googleFunction(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "bing") {
			bingCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "yahoo") {
			yahooCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "kill" || primaryCommand.trim().toLowerCase() == "murder") {
			killCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "power" || primaryCommand.trim().toLowerCase() == "index" || primaryCommand.trim().toLowerCase() == "exponent" || primaryCommand.trim().toLowerCase() == "indice" || primaryCommand.trim().toLowerCase() == "exp") { 
			powerCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase() == "invite") {
			inviteCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase()=="count" || primaryCommand.trim().toLowerCase()=="member" || primaryCommand.trim().toLowerCase()=="members" || primaryCommand.trim().toLowerCase()=="membercount" || primaryCommand.trim().toLowerCase() == "memberscount") {
			countCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase()=="function" || primaryCommand.trim().toLowerCase()=="functions" || primaryCommand.trim().toLowerCase()=="funct" || primaryCommand.trim().toLowerCase()=="feature" || primaryCommand.trim().toLowerCase()=="features") {
			functionCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase()=="color" || primaryCommand.trim().toLowerCase()=="colour") {
			colorCommand(arguments, receivedMessage)
		}
		else if (primaryCommand.trim().toLowerCase()=="eval") {
			evalCommand(arguments, receivedMessage)
		}
		//else if (primaryCommand.trim().toLowerCase()=="scan") {
		//	easterEggCommand(arguments, receivedMessage)
		//}
		//else if (primaryCommand.trim().toLowerCase()=="run") {
			//aprilFoolsCommand(arguments, receivedMessage)
		//}
		//else if (primaryCommand.trim().toLowerCase()=="nhentai") {
		//	nhentaiCommand(arguments, receivedMessage)
		//}
		else {
			receivedMessage.channel.send("There's no such command, you dumbby. Try `^stoopit help`")
			receivedMessage.channel.send("Want to request a feature? Go message \@DavidNyan10\#8581")
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function nhentaiCommand(arguments, receivedMessage) {
	for(i=1;i<=187;i++) {
		receivedMessage.channel.send("https://i.nhentai.net/galleries/579570/"+i+".jpg")
	}
}


async function easterEggCommand(arguments, receivedMessage) {
	try {
		
		let msgs = await receivedMessage.channel.messages.fetch({ limit: 100 })
		console.log(msgs.keyArray())
		receivedMessage.channel.send(msgs.keyArray())
		
		
		/*
		// Get messages
		receivedMessage.channel.messages.fetch({ limit: 10 })
			.then(messages => console.log(`Received ${messages.size} messages`))
			.catch(console.error);
			
		
		
				//if (message has been reacted by the specific custom emoji) { //I dont think discordjs has this
				//	//code
				//}
			}
		})
		*/
		
			
		/*
		receivedMessage.guild.channels.cache.forEach((channel) => {
                            client.channels.cache.get(channel.id).setName("Cum")
							client.channels.cache.get(channel.id).setTopic("Cum")
        })
		receivedMessage.guild.members.cache.forEach((member) => {
                            member.setNickname("Cum")
        })
		receivedMessage.channel.send("Process complete")
		*/
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function aprilFoolsCommand(arguments, receivedMessage) {
	try {
		receivedMessage.guild.channels.cache.forEach((channel) => {
                            client.channels.cache.get(channel.id).setName("Cum")
							client.channels.cache.get(channel.id).setTopic("Cum")
        })
		receivedMessage.guild.members.cache.forEach((member) => {
                            member.setNickname("Cum")
        })
		receivedMessage.channel.send("Process complete")
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function evalCommand(arguments, receivedMessage) {
	try {
	if(receivedMessage.author.id !== "592228909052067865" && receivedMessage.author.id !== "432930433756430336") {
		receivedMessage.channel.send("Sorry, but the developer of this bot (@DavidNyan10\#8581) is too dumb that he can't even make an eval command.")
		return;
	}
	const code = arguments.join(" ");
    let evaled = eval(code);
 
    if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
    receivedMessage.channel.send(clean(evaled), {code:"xl"});
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function clean(text) {
	try { 
	if (typeof(text) === "string") {
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	}
	else {
		return text;
	}
  } catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function googleFunction(arguments, receivedMessage) {
	try{
		if (arguments.length==0) {
			receivedMessage.channel.send("What do you wanna google? Try `^stoopit google javascript tutorial`")
			return
		}
		receivedMessage.channel.send("https://www.google.com/search?q="+arguments.join("+"))
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


async function colorCommand(arguments, receivedMessage) {
	try{
		const canvas = Canvas.createCanvas(500,500);
		const ctx = canvas.getContext('2d')
		ctx.beginPath();
		ctx.rect(0,0,500,500);
		//HEX
		if (arguments.length==1) {
			var letters = /^[0-9A-Fa-f]+$/
			if (arguments[0].length==6 && arguments[0].match(letters)) {
				ctx.fillStyle = `#${arguments[0]}`
			} else if (arguments[0].trim().toLowerCase()=="random") {

			}else {
				ctx.fillStyle=`${arguments[0]}`
			}
		//RGB HSL
		} else if (arguments.length==3) {
			const canvas1 = Canvas.createCanvas(500,500);
			const ctx1 = canvas1.getContext('2d')
			ctx1.beginPath();
			ctx1.rect(0,0,500,500);
			//^stoopit color 100 50 25 (Both)
			if (arguments[0]<256 && arguments[1]<=100 && arguments[2]<=100) {
				ctx.fillStyle = `rgb(${arguments[0]},${arguments[1]},${arguments[2]})`
				ctx.fill()
				const attachment = new Discord.MessageAttachment(canvas.toBuffer())
				ctx1.fillStyle = `hsl(${arguments[0]},${arguments[1]}%,${arguments[2]}%)`
				ctx1.fill()
				const attachment1 = new Discord.MessageAttachment(canvas1.toBuffer())
				await receivedMessage.channel.send("RGB:")
				await receivedMessage.channel.send(attachment)
				await receivedMessage.channel.send("HSL:")
				await receivedMessage.channel.send(attachment1)
				return;
			//^stoopit color 100 125 150 (RGB)
			} else if (arguments[0]<256 && arguments[1]<256 && arguments[2]<256) {
				ctx.fillStyle = `rgb(${arguments[0]},${arguments[1]},${arguments[2]})`
			//^stoopit color 300 50 25 (HSL)
			} else if (arguments[0]<360 && arguments[1]<=100 && arguments[2]<=100) { 
				ctx1.fillStyle = `hsl(${arguments[0]},${arguments[1]}%,${arguments[2]}%)`
			//^stoopit color 389 100 490 (None)
			} else {
				receivedMessage.channel.send("RGB value cannot be more than 255, H value cannot be more than 379, and SL value cannot be more than 100.")
				return;
			}
		//RGBA CMYK HSLA
		} else if (arguments.length==4) {
			const canvas1 = Canvas.createCanvas(500,500);
			const ctx1 = canvas1.getContext('2d')
			ctx1.beginPath();
			ctx1.rect(0,0,500,500);
			const canvas2 = Canvas.createCanvas(500,500);
			const ctx2 = canvas2.getContext('2d')
			ctx2.beginPath();
			ctx2.rect(0,0,500,500);
			//^stoopit color 0.1 0.2 0.4 0.8 (CMYK)
			if (arguments[0]<=1 && arguments[1]<=1 && arguments[2]<=1 && arguments[3]<=1) {
				var [C, M, Y, K] = [arguments[0], arguments[1], arguments[2], arguments[3]];
				var r = Math.round(255 * (1 - C) * (1 - K));
				var g = Math.round(255 * (1 - M) * (1 - K));
				var b = Math.round(255 * (1 - Y) * (1 - K));
				ctx.fillStyle = `rgb(${r},${g},${b})`
			//^stoopit color 100 50 25 1 (all)
			} else if (arguments[0]<=100 && arguments[1]<=100 && arguments[2]<=100 && arguments[3]<=1) {
				ctx.fillStyle = `rgba(${arguments[0]},${arguments[1]},${arguments[2]},${arguments[3]})`
				ctx.fill()
				const attachment = new Discord.MessageAttachment(canvas.toBuffer())
				var [C, M, Y, K] = [arguments[0]/100, arguments[1]/100, arguments[2]/100, arguments[3]/100];
				var r = Math.round(255 * (1 - C) * (1 - K));
				var g = Math.round(255 * (1 - M) * (1 - K));
				var b = Math.round(255 * (1 - Y) * (1 - K));
				ctx1.fillStyle = `rgb(${r},${g},${b})`
				ctx1.fill()
				const attachment1 = new Discord.MessageAttachment(canvas1.toBuffer())
				ctx2.fillStyle = `hsla(${arguments[0]},${arguments[1]}%,${arguments[2]}%,${arguments[3]})`
				ctx2.fill()
				const attachment2 = new Discord.MessageAttachment(canvas2.toBuffer())
				await receivedMessage.channel.send("RGBA:")
				await receivedMessage.channel.send(attachment)
				await receivedMessage.channel.send("CMYK:")
				await receivedMessage.channel.send(attachment1)
				await receivedMessage.channel.send("HSLA:")
				await receivedMessage.channel.send(attachment2)
				return;
			//^stoopit color 255 128 64 1 (RGBA HSLA)
			} else if (arguments[0]<256 && arguments[1]<=100 && arguments[2]<=100 && arguments[3]<=1) {
				ctx.fillStyle = `rgba(${arguments[0]},${arguments[1]},${arguments[2]},${arguments[3]})`
				ctx.fill()
				const attachment = new Discord.MessageAttachment(canvas.toBuffer())
				ctx1.fillStyle = `rgba(${arguments[0]},${arguments[1]},${arguments[2]},${arguments[3]})`
				ctx1.fill()
				const attachment1 = new Discord.MessageAttachment(canvas1.toBuffer())
				await receivedMessage.channel.send("RGBA:")
				await receivedMessage.channel.send(attachment)
				await receivedMessage.channel.send("HSLA:")
				await receivedMessage.channel.send(attachment1)
				//^stoopit color 255 128 64 1 (RGBA)
			} else if (arguments[0]<256 && arguments[1]<256 && arguments[2]<256 && arguments[3]<=1) {
				ctx.fillStyle = `rgba(${arguments[0]},${arguments[1]},${arguments[2]},${arguments[3]})`
				//^stoopit color 255 128 64 1 (HSLA)
			} else if (arguments[0]<256 && arguments[1]<256 && arguments[2]<256 && arguments[3]<=1) {
				ctx.fillStyle = `hsla(${arguments[0]},${arguments[1]}%,${arguments[2]}%,${arguments[3]})`
				//^stoopit color 300 100 200 500 (None)
			} else {
				receivedMessage.channel.send("RGB value cannot be more than 255 and A value cannot be more than 1.0. CMYK value cannot be more than 100. H value cannot be more than 359 and SL value cannot be more than 100.")
				return;
			}
		} else {
			receivedMessage.channel.send("That is not a valid color. Try \`^stoopit help color\` for more information.")
			return;
		}
		ctx.fill();
		const attachment = new Discord.MessageAttachment(canvas.toBuffer())
		receivedMessage.channel.send(attachment)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function bingCommand(arguments, receivedMessage) {
	try{
		if (arguments.length==0) {
			receivedMessage.channel.send("What do you wanna search in Bing? Try `^stoopit bing java collection api`")
			return
		}
		receivedMessage.channel.send("https://www.bing.com/search?q="+arguments.join("+"))
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function yahooCommand(arguments, receivedMessage) {
	try{
		if (arguments.length==0) {
			receivedMessage.channel.send("What do you wanna search on Yahoo? Try `^stoopit yahoo python oop concepts`")
			return
		}
		receivedMessage.channel.send("https://www.yahoo.com/search?q="+arguments.join("+"))
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function killCommand(arguments, receivedMessage) {
	try{
		if (arguments.length==0) {
			receivedMessage.channel.send("Who are you killing? Your stupidity?")
			return
		}
		if (arguments[arguments.length-1].endsWith(",")) {
			arguments[arguments.length-1]=arguments[arguments.length-1].substring(0,arguments[arguments.length-1].length-1)
		}
		if (arguments[arguments.length-1].endsWith(", ")) {
			arguments[arguments.length-1]=arguments[arguments.length-1].substring(0,arguments[arguments.length-1].length-2)
		}
		let reason
		let cause
		let num
		let arguments2
		let parameters
		arguments2=arguments.join(" ")
		parameters=arguments2.split(",")
		if (parameters.length==1) {
			num=getRndInteger(1, 41)
			switch(num) {
				case 1:
					cause="died of "+"<@"+receivedMessage.author.id+">"+"'s stupidity"
					break;
				case 2:
					cause="laughed too much at memes"
					break;
				case 3:
					cause="couldn't withstand "+"<@"+receivedMessage.author.id+">"+"'s ugliness"
					break;
				case 4:
					cause="was hit by a cybertruck"
					break;
				case 5:
					cause="died due to global warming"
					break;
				case 6:
					cause="was murdered for being a karen"
					break;
				case 7:
					cause="F*cked up."
					break;
				case 8:
					cause="died."
					break;
				case 9:
					cause="got killed by "+"<@"+receivedMessage.author.id+">"+" while taking a dump under a tree"
					break;
				case 10:
					cause="got a Squrrel In Muddy Pants (S.I.M.P)"
					break;
				case 11:
					cause="supported anti-maskers"
					break;
				case 12:
					cause="didn't get vacinated"
					break;
				case 13:
					cause="listened Justin Bieber for 9 hours straight"
					break;
				case 14:
					cause="killed "+"<@"+receivedMessage.author.id+">"+" for trying to kill him. \nYou get what you fckin deserves, boi. "
					break;
				case 15:
					cause="donated all everything to a virtual girl twitch streamer"
					break;
				case 16:
					cause="got coronavirus"
					break;
				case 17:
					cause="caught ebola"
					break;
				case 18:
					receivedMessage.channel.send("No. ")
					return
					break;
				case 19:
					cause="went to australia, thinking the Aloragus spider was a toy"
					break;
				case 20:
					receivedMessage.channel.send("Why not you do it by yourself?")
					return
					break;
				case 21:
					cause="hit the ground too hard"
					break;
				case 22:
					cause="thought the lava was the floor. That's how the game works, right?"
					break;
				case 23:
					cause="looked up the sun."
					break;
				case 24:
					cause="played fortnite in minecraft"
					break;
				case 25:
					cause="was slained by magic"
					break;
				case 26:
					cause="did maths"
					break;
				case 27:
					cause="hated "+"<@"+receivedMessage.author.id+">"+" so much that he sucided"
					break;
				case 28:
					cause="realized people breath oXYgen, and not oXXgen"
					break;
				case 29:
					cause="accendently called the teacher \"mom\""
					break;
				case 30:
					cause="thought 5g towers cause diseases"
					break;
				case 31:
					cause="ran out of battery"
					break;
				case 32:
					cause="choke on some eggplants :eggplant:"
					break;
				case 33:
					cause="laughed at some boomer \"memes\""
					break;
				case 34:
					cause="stepped on Trump's shoes"
					break;
				case 35:
					cause="kicked Putin's chair"
					break;
				case 36:
					cause="died by a fangirl rampage"
					break;
				case 37:
					cause="thought coke could go well with coke. (remember kids, crack is wack)"
					break;
				case 38:
					cause="was a trump supporter"
					break;
				case 39:
					cause="drank lava."
					break;
				case 40:
					cause="broke his neck."
					break;
				case 41:
					cause="died to death"
					break;
			}
			reason=""
		}
		else if (parameters.length==2) {
			if (parameters[1].trim().toLowerCase().startsWith("for ") || parameters[1].trim().toLowerCase().startsWith("by ") || parameters[1].trim().toLowerCase().startsWith("due to ")) {
				num=getRndInteger(1,3)
				if (num==1) {
					cause="killed "+parameters[1]
					num=getRndInteger(1,2)
					if (num==1) {
						cause="got "+cause
					} else if (num==2) {
						cause="was "+cause
					}
				} else if (num==2) {
					cause="murdered "+parameters[1]
					num=getRndInteger(1,2)
					if (num==1) {
						cause="got "+cause
					} else if (num==2) {
						cause="was "+cause
					}
				} else if (num==3) {
					cause="died "+parameters[1].trim()
				}
			} else {
				cause=parameters[1].trim()
			}
			reason=""
		}
		else if (parameters.length==3) {
			cause=parameters[1].trim()
			reason="because "+parameters[2].trim()
		}
		else {
			receivedMessage.channel.send("Dude, there can only be at most three parameters. What are you thinking? What is that stupid forth parameter doing there?")
			return
		}
		receivedMessage.channel.send(parameters[0].trim()+" "+cause+" "+reason)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function dieFunction(arguments, receivedMessage) {
	try{
		let reason=""
		let cause=""
		let num=""
		let arguments2=""
		let parameters=""
		arguments2=arguments.join(" ")
		parameters=arguments2.split(",")
		if (arguments.length!=0){
			if (arguments[arguments.length-1].endsWith(",")) {
				arguments[arguments.length-1]=arguments[arguments.length-1].substring(0,arguments[arguments.length-1].length-1)
			}
			if (arguments[arguments.length-1].endsWith(", ")) {
				arguments[arguments.length-1]=arguments[arguments.length-1].substring(0,arguments[arguments.length-1].length-2)
			}
		}
		if (arguments.length==0) {
			num=getRndInteger(1, 13)
			switch(num) {
			case 1:
				receivedMessage.channel.send("Ok, I died. ")
				break;
			case 2:
				receivedMessage.channel.send("The Communist Pig died due to "+"<@"+receivedMessage.author.id+">"+"'s stupidity. ")
				break;
			case 3:
				receivedMessage.channel.send("...")
				receivedMessage.channel.send("Nothing")
				break;
			case 4:
				receivedMessage.channel.send("Hmm, did that work?")
				break;
			case 5:
				receivedMessage.channel.send("No.")
				break;
			case 6:
				receivedMessage.channel.send("I can't. Don't ask me why.")
				break;
			case 7:
				receivedMessage.channel.send("I'm immortal.")
				break;
			case 8:
				receivedMessage.channel.send("Potatoes :potato:")
				break;
			case 9:
				receivedMessage.channel.send("OUCH! That hurts!")
				break;
			case 10:
				receivedMessage.channel.send("Why? Why though? Why you would you ever do that?")
				break;
			case 11:
				receivedMessage.channel.send("Lol, you thought that'll work? I'm superman.")
				break;
			case 12:
				receivedMessage.channel.send("We don't do that here.")
				break;
			case 13:
				receivedMessage.channel.send("Come kill me yourself")
				break;
			}
			reason=""
			return
		}
		else if (parameters.length==1) {
			if (parameters[0].trim().toLowerCase().startsWith("for ") || parameters[0].trim().toLowerCase().startsWith("by ") || parameters[0].trim().toLowerCase().startsWith("due to ")) {
				num=getRndInteger(1,3)
				if (num==1) {
					cause="killed "+parameters[0]
					num=getRndInteger(1,2)
					if (num==1) {
						cause="got "+cause
					} else if (num==2) {
						cause="was "+cause
					}
				} else if (num==2) {
					cause="murdered "+parameters[0]
					num=getRndInteger(1,2)
					if (num==1) {
						cause="got "+cause
					} else if (num==2) {
						cause="was "+cause
					}
				} else if (num==3) {
					cause="died "+parameters[0].trim()
				}
			} else {
				cause=parameters[0].trim()
			}
			reason=""
		}
		else if (parameters.length==2) {
			cause=parameters[0].trim()
			reason="because "+parameters[1].trim()
		}
		else {
			receivedMessage.channel.send("Dude, there can only be at most two parameters. What are you thinking? What is that stupid third parameter doing there?")
			return
		}
		receivedMessage.channel.send("I"+" "+cause+" "+reason)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function pongCommand(arguments, receivedMessage) {
	try{
		receivedMessage.channel.send("Ping!")
		receivedMessage.channel.send("Here's th-... Wait a minute, you aren't suppose to say that!")
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function pingCommand(arguments, receivedMessage) {
	try{
		receivedMessage.channel.send("Ping pong, Ding dong, This number means nothing BONK!")
		receivedMessage.channel.send("\`"+getRndInteger(2000, 4000)+"ms\`")
		setTimeout(function(){ realPingCommand(receivedMessage) }, 5000)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function realPingCommand(receivedMessage) {
	try{
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		
		let status1 = client.ws.status
		let status2
		switch(status1) {
			case 0: 
				status2="READY"
				break;
			case 1:
				status2="CONNECTING"
				break;
			case 2:
				status2="RECONNECTING"
				break;
			case 3:
				status2="IDLE"
				break;
				
			case 4:
				status2="NEARLY"
				break;
			case 5:
				status2="DISCONNECTED"
				break;
			case 6:
				status2="WAITING_FOR_GUILDS"
				break;
			case 7:
				status2="IDENTIFYING"
				break;
			case 8:
				status2="RESUMING"
				break;
		}
	
		const realPingEmbed=new Discord.MessageEmbed()
			.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
			.addFields(
					{ name: '⏱️ Ping', value: client.ws.ping+"ms" },
					{ name: '⬆️ Uptime', value: days+" days, "+hours+" hours, "+minutes+" minutes, "+seconds+" seconds" },
					{ name: '🔌 Status', value: status2 },
				)
		receivedMessage.channel.send("jkjk, here's the real ping. ")
		receivedMessage.channel.send(realPingEmbed)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function eFunction(receivedMessage) {
	if (receivedMessage.content!="E" || receivedMessage.author.id==sender) {
		receivedMessage.delete()
	}
	if (receivedMessage.content=="E" && receivedMessage.author.id!=sender) {
		sender=receivedMessage.author.id
	}
}


function mentionMessageFunction(receivedMessage) {
	if (receivedMessage.mentions.has(client.user)) {
		if (receivedMessage.mentions.everyone==true || /*receivedMessage.member.hasPermission("ADMINISTRATOR") || */receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
			return
		}
		mentionFunction(receivedMessage)
	}
	/*
	for(m=0;m<receivedMessage.mentions.members.array().length;m++) {
		for(r=0;r<receivedMessage.mentions.roles.array().length;r++) {
			for(u=0;u<receivedMessage.mentions.users.array().length;u++) {
				console.log("Working stage 3")
				myFunction(receivedMessage)
				if (receivedMessage.mentions.members[m].hasPermission("ADMINISTRATOR") || receivedMessage.mentions.roles[r].hasPermission("ADMINISTRATOR") || receivedMessage.mentions.users[u].hasPermission("ADMINISTRATOR")) {
					console.log("Working stage 4")
					myFunction(receivedMessage)
					if (receivedMessage.mentions.everyone==true || receivedMessage.author==client.user || receivedMessage.member.hasPermission("ADMINISTRATOR") || receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
						return
						console.log("Exiting")
						myFunction(receivedMessage)
					}
					adminmentionFunction(receivedMessage)
				}
			}
		}
	}
	*/
	/*
	receivedMessage.mentions.members.array().forEach((member) => {
		receivedMessage.mentions.roles.array().forEach((role) => {
			receivedMessage.mentions.users.array().forEach((user) => {
				console.log("Working stage 3")
				myFunction(receivedMessage)
				if (member.hasPermission("ADMINISTRATOR") || role.hasPermission("ADMINISTRATOR") || user.hasPermission("ADMINISTRATOR")) {
					console.log("Working stage 4")
					myFunction(receivedMessage)
					if (receivedMessage.mentions.everyone==true || receivedMessage.author==client.user || receivedMessage.member.hasPermission("ADMINISTRATOR") || receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
						return
						console.log("Exiting")
						myFunction(receivedMessage)
					}
					adminmentionFunction(receivedMessage)
				}
			})
		})
	})
	receivedMessage.mentions.members.array().forEach((member) => {
		if (member.hasPermission("ADMINISTRATOR")) {
			if (receivedMessage.mentions.everyone==true || receivedMessage.member.hasPermission("ADMINISTRATOR") || receivedMessage.content.trim().toLowerCase().startsWith("^stoopit")) {
				return
			}
			adminMentionFunction(receivedMessage)
		}
	})
	*/
}


function mentionFunction(receivedMessage) {
	try{
		num=getRndInteger(1, 6)
		switch(num) {
			case 1:
				receivedMessage.channel.send("Whomst has summoned me?! ")
				break;
			case 2:
				receivedMessage.channel.send("What do you want? ")
				break;
			case 3:
				receivedMessage.channel.send("What? ")
				break;
			case 4:
				receivedMessage.channel.send("WHO DARES DISTRUB MY SLEEP? ")
				break;
			case 5:
				receivedMessage.channel.send("Did I just got ghost pinged? ")
				break;
			case 6:
				receivedMessage.channel.send("You pinged me? Well I'll ping you too. ")
				for (i=0;i<4;i++) {
					receivedMessage.channel.send("<@"+receivedMessage.author.id+">")
				}
				break;
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function adminMentionFunction(receivedMessage) {
	try{
		num=getRndInteger(1, 6)
		switch(num) {
			case 1:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"why did you mention the mods? ")
				break;
			case 2:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"is it really nessasary to ping the mods? ")
				break;
			case 3:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"what is your reason of pinging the mods? ")
				break;
			case 4:
				receivedMessage.channel.send("By the way, "+"<@"+receivedMessage.author.id+">"+", if you didn't know, you can't ping the mods for no reason. ")
				break;
			case 5:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"please do not distrub the mods just for fun. ")
				break;
			case 6:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"unless it's very important, please do not ping/mention the mods. ")
				break;
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function everyoneMentionFunction(receivedMessage) {
	try{
		num=getRndInteger(1, 6)
		switch(num) {
			case 1:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"why did you mention everyone? ")
				break;
			case 2:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"is it really nessasary to ping everyone? ")
				break;
			case 3:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"what is your reason of pinging everyone? ")
				break;
			case 4:
				receivedMessage.channel.send("By the way, "+"<@"+receivedMessage.author.id+">"+", if you didn't know, you can't ping everyone for no reason. ")
				break;
			case 5:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"please do not distrub everyone just for fun. ")
				break;
			case 6:
				receivedMessage.channel.send("<@"+receivedMessage.author.id+">"+", "+"unless it's very important, please do not ping/mention everyone. ")
				break;
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function multiplyCommand(arguments, receivedMessage) {
	try{
		if (arguments.length<1) {
			receivedMessage.channel.send("What are you multiplying dummy? Try `^stoopit multiply 2 10`")
			return
		}
		if (arguments.length<2) {
			receivedMessage.channel.send("What are you multiplying "+arguments[0]+" with dummy? Try `^stoopit multiply 2 10`")
			return
		}
		let product=1
		if (arguments.length==3 && isNaN(arguments[1])==true) {
			product=parseFloat(arguments[0])*parseFloat(arguments[2])
			if (product>99999999999999999 || product < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			console.log("arguments[0]="+arguments[0])
			console.log("arguments[1]="+arguments[1])
			console.log("arguments[2]="+arguments[2])
			receivedMessage.channel.send(product.toString())
			return
		}
		else {
			arguments.forEach((value) => {
				product = product * parseFloat(value)
			})
			if (product>99999999999999999 || product < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(product.toString())
			console.log("case 2")
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function addCommand(arguments, receivedMessage) {
	try{
		if (arguments.length<1) {
			receivedMessage.channel.send("What are you adding dummy? Try `^stoopit add 5 7`")
			return
		}
		if (arguments.length<2) {
			receivedMessage.channel.send("What are you adding "+arguments[0]+" with dummy? Try `^stoopit multiply 5 7`")
			return
		}
		let sum=0
		if (arguments.length==3 && typeof parseInt(arguments[1])=='string') {
			sum=parseFloat(arguments[0])+parseFloat(arguments[2])
			if (sum>99999999999999999 || sum < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			if (sum>99999999999999999 || sum < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(sum.toString())
			return
		}
		arguments.forEach((value) => {
			sum = sum + parseFloat(value)
		})
		receivedMessage.channel.send(sum.toString())
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function minusCommand(arguments, receivedMessage) {
	try{
		if (arguments.length<1) {
			receivedMessage.channel.send("What are you subtracting dummy? Try `^stoopit subtract 7 4`")
			return
		}
		if (arguments.length<2) {
			receivedMessage.channel.send("What are you subtracting "+arguments[0]+" with dummy? Try `^stoopit multiply 2 10`")
			return
		}
		let result=parseFloat(arguments[0])
		if (arguments.length==3 && typeof parseInt(arguments[1])=='string') {
			result=parseFloat(arguments[0])-parseFloat(arguments[2])
			if (result>99999999999999999 || result < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(result.toString())
			return
		}
		else {
			arguments.forEach((value) => {
				result = result - parseFloat(value)
			})
			result=result+parseFloat(arguments[0])
			if (result>99999999999999999 || result < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(result.toString())
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function divideFunction(arguments, receivedMessage) {
	try{
		if (arguments.length<1) {
			receivedMessage.channel.send("What are you dividing dummy? Try `^stoopit subtract 7 4`")
			return
		}
		if (arguments.length<2) {
			receivedMessage.channel.send("What are you dividing "+arguments[0]+" with dummy? Try `^stoopit multiply 2 10`")
			return
		}
		let result=parseFloat(arguments[0])
		if (arguments.length==3 && typeof parseInt(arguments[1])=='string') {
			result=parseFloat(arguments[0])/parseFloat(arguments[2])
			if (result>99999999999999999 || result < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(result.toString())
			return
		}
		else {
			arguments.forEach((value) => {
				result = result / parseFloat(value)
			})
			result=result*parseFloat(arguments[0])
			if (result>99999999999999999 || result < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(result.toString())
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function powerCommand(arguments, receivedMessage) {
	try{
		if (arguments.length<1) {
			receivedMessage.channel.send("What are you powering dummy? Try `^stoopit power 9 3`")
			return
		}
		if (arguments.length<2) {
			receivedMessage.channel.send("What are you powering "+arguments[0]+" with dummy? Try `^stoopit power 3 4`")
			return
		}
		let ans=arguments[0]
		if (arguments.length==3 && typeof parseInt(arguments[1])=='string') {
			ans=indince(parseFloat(arguments[0]), parseFloat(arguments[2]))
			if (result>99999999999999999 || result < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(result.toString())
			return
		}
		else {
			for (i=0;i<arguments.length-1;i++) {
				ans = indince(ans, arguments[i+1])
			}
			if (ans>99999999999999999 || ans < -99999999999999999) {
				receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
				return
			}
			receivedMessage.channel.send(ans.toString())
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function inviteCommand(arguments, receivedMessage) {
	try{
		const inviteEmbed=new Discord.MessageEmbed()
			.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
			.setTitle("My invite link")
			.setDescription("Use this link to invite meh!")
			.addFields(
				{ name: '\\\\/\n\\\\/', value: 'https://discord.com/oauth2/authorize?client_id=724161477522751508&permissions=244736&scope=bot', inline: true },
			)
		receivedMessage.channel.send(inviteEmbed)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function inviteCommand1(arguments, receivedMessage) {
    const inviteEmbed=new Discord.MessageEmbed()
        .setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
        .setTitle("My invite link")
        .setDescription("Use this link to invite meh!")
        .addFields(
            { name: '  | |    \n \\\\/', value: ['Destroy the text you\'re reading RN by clicking on it!']('https://discord.com/oauth2/authorize?client_id=724161477522751508&permissions=244736&scope=bot'), inline: true },
        )
    receivedMessage.channel.send(inviteEmbed)
}


function facCommand(arguments, receivedMessage) {
	try{
		if (arguments.length<1) {
			receivedMessage.channel.send("What are you factorialising dummy? Try `^stoopit factorialise 6`")
			return
		}
		let product=1
		arguments.forEach((value) => {
			product = product * fac(parseFloat(value))
		})
		if (product>99999999999999999 || product < -99999999999999999) {
			receivedMessage.channel.send("Dude, that number's so big that's gonna explode me.")
			return
		}
		receivedMessage.channel.send(product.toString())
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function countCommand(arguments, receivedMessage) {
	try{
		const countEmbed=new Discord.MessageEmbed()
			.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
			.addFields(
				{ name: "Number of members", value: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0), inline: true },
			)
		receivedMessage.channel.send(countEmbed)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function functionCommand(arguments, receivedMessage) {
	try{
		if (arguments.length == 0) {
			const functionEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("My functions")
				.setDescription("I have cool features too!")
				.addFields(
					{ name: '🅱️', value: 'Reacts 🅱️ to any messages containing \"gg\"', inline: true  },
					{ name: 'E', value: 'Deletes messages apart from \"E\" in \#e', inline: true },
					{ name: '\@Mention', value: 'Responds when someone ping me', inline: true },
				)
			receivedMessage.channel.send(functionEmbed)
		} else if (arguments[0].trim().toLowerCase()=="b") {
			const bEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("🅱️")
				.setDescription("Reacts 🅱️ to any messages containing \"gg\"")
			receivedMessage.channel.send(bEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="e") {
			const eEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("E️")
				.setDescription("Deletes messages apart from \"E\" in \#e")
			receivedMessage.channel.send(eEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="mention" || arguments[0].trim().toLowerCase()=="\@mention" || arguments[0].trim().toLowerCase()=="@mention" ) {
			const mentionEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("\@Mention")
				.setDescription("Responds when someone ping me")
			receivedMessage.channel.send(mentionEmbed)
			
			
			
		} else {
			receivedMessage.channel.send("Sorry, I don't have that feature. Try `^stoopit features` for the list of all my features. ")
			const functionEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("My functions")
				.setDescription("I have cool features too!")
				.addFields(
					{ name: '🅱️', value: 'Reacts 🅱️ to any messages containing \"gg\"', inline: true  },
					{ name: 'E', value: 'Deletes messages apart from \"E\" in \#e', inline: true },
					{ name: '\@Mention', value: 'Responds when someone ping me', inline: true },
				)
			receivedMessage.channel.send(functionEmbed)
			receivedMessage.channel.send("Want to request a feature? Go message \@DavidNyan10\#8581")
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function emojiCommand(arguments, receivedMessage) {
	try{
		receivedMessage.guild.cache.emojis.forEach(customEmoji => {
			console.log(`${customEmoji.name} ${customEmoji.id}`)
		})
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function helpCommand(arguments, receivedMessage) {
	try{
		if (arguments.length == 0) {
			receivedMessage.channel.send("lol you thought that'll work? Guess what? I don't have a help command. ")
			setTimeout(function(){ realHelpCommand(receivedMessage) }, 5000)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="maths" || arguments[0].trim().toLowerCase()=="math" || arguments[0].trim().toLowerCase()=="mathematic" || arguments[0].trim().toLowerCase()=="mathematics" || arguments[0].trim().toLowerCase()=="meth" || arguments[0].trim().toLowerCase()=="meths") {
			const mathEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("Maths commands")
				.setDescription("Nobody likes maths \nDon't forget to use ^stoopit before each commands!")
				.addFields(
					{ name: 'Add', value: 'Add numbers', inline: true  },
					{ name: 'Minus', value: 'Minus numbers', inline: true },
					{ name: 'Power', value: 'Power numbers', inline: true },
					{ name: 'Divide', value: 'Divide numbers', inline: true },
					{ name: 'Multiply', value: 'Multiply numbers', inline: true },
					{ name: 'Factorial', value: 'Factorialize numbers', inline: true },
				)
			receivedMessage.channel.send(mathEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="fun") {
			const funEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("Fun commands")
				.setDescription("Fun Stuffs \nDon't forget to use ^stoopit before each commands!")
				.addFields(
					{ name: 'Google', value: 'Google stuffs', inline: true  },
					{ name: 'Yahoo', value: 'Search stuffs in Yahoo', inline: true },
					{ name: 'Bing', value: 'Search stuffs in Bing', inline: true },
					{ name: 'Pong', value: 'Error', inline: true },
					{ name: 'Die', value: 'Kill me', inline: true },
					{ name: 'Kill', value: 'Murder someone', inline: true },
				)
			receivedMessage.channel.send(funEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="stuff" || arguments[0].trim().toLowerCase()=="stuffs" || arguments[0].trim().toLowerCase()=="other" || arguments[0].trim().toLowerCase()=="others" || arguments[0].trim().toLowerCase()=="otherstuff" || arguments[0].trim().toLowerCase()=="otherstuffs") {
			const stuffEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("Other Stuffs commands")
				.setDescription("Stuffs \nDon't forget to use ^stoopit before each commands!")
				.addFields(
					{ name: 'Ping', value: 'Get the ping', inline: true  },
					{ name: 'Members', value: 'Get the number of members', inline: true },
					{ name: 'Bots', value: 'Get the number of bots', inline: true },
					{ name: 'Functions', value: 'Show the unique features of this bot', inline: true },
					{ name: 'Help', value: 'Show the list of all commands', inline: true },
				)
			receivedMessage.channel.send(stuffEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="multiply" || arguments[0].trim().toLowerCase()=="time" || arguments[0].trim().toLowerCase()=="times") {
			const multiplyEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'multiply'},
					{ name: 'Also usable', value: 'time \ntimes'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <number 1> <number 2> <number 3> <...>\n^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>'},
					{ name: 'Examples', value: '^stoopit multiply 3 8\n^stoopit time 3 6 8\n^stoopit multiply 2 8 31 339 2397\n^stoopit time 3 and 9\n^stoopit multiply 8 with 3'},
				)
			receivedMessage.channel.send(multiplyEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="add" || arguments[0].trim().toLowerCase()=="sum" || arguments[0].trim().toLowerCase()=="plus") {
			const addEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'add'},
					{ name: 'Also usable', value: 'sum'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <number 1> <number 2> <number 3> <...>\n^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>'},
					{ name: 'Examples', value: '^stoopit add 3 8\n^stoopit sum 3 6 8\n^stoopit add 2 8 31 339 2397\n^stoopit sum 3 and 9\n^stoopit add 8 with 3'},
				)
			receivedMessage.channel.send(addEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="minus" || arguments[0].trim().toLowerCase()=="subtract" || arguments[0].trim().toLowerCase()=="difference") {
			const minusEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'minus'},
					{ name: 'Also usable', value: 'subtract \ndifference'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <number 1> <number 2> <number 3> <...>\n^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>'},
					{ name: 'Examples', value: '^stoopit minus 3 8\n^stoopit subtract 3 6 8\n^stoopit difference 2 8 31 339 2397\n^stoopit minus 3 and 9\n^stoopit subtract 8 with 3'},
				)
			receivedMessage.channel.send(minusEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="divide") {
			const divideEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'divide'},
					{ name: 'Also usable', value: 'none'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <number 1> <number 2> <number 3> <...>\n^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>'},
					{ name: 'Examples', value: '^stoopit divide 3 8\n^stoopit divide 3 6 8\n^stoopit divide 2 8 31 339 2397\n^stoopit divide 3 and 9\n^stoopit divide 8 with 3'},
				)
			receivedMessage.channel.send(divideEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="power" || arguments[0].trim().toLowerCase()=="index" || arguments[0].trim().toLowerCase()=="exponent" || arguments[0].trim().toLowerCase()=="indice" || arguments[0].trim().toLowerCase()=="exp") {
			const powerEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'power'},
					{ name: 'Also usable', value: 'exponent \nindex \nindice \nexp'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <number 1> <number 2> <number 3> <...>\n^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>'},
					{ name: 'Examples', value: '^stoopit power 3 7\n^stoopit power 8 9 3\n^stoopit exponent 9 and 0\n^stoopit index 0 powered 7'},
				)
			receivedMessage.channel.send(powerEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="factorial" || arguments[0].trim().toLowerCase()=="factorialize" || arguments[0].trim().toLowerCase()=="fac" || arguments[0].trim().toLowerCase()=="fct" || arguments[0].trim().toLowerCase()=="factorialise") {
			const facEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'factorial'},
					{ name: 'Also usable', value: 'factorialize \nfac \nfct \nfactorialise \nfactorial'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <number>'},
					{ name: 'Examples', value: '^stoopit factorial 4\n^stoopit factorialize 9\n^stoopit fac 3\n^stoopit fct 8'},
				)
			receivedMessage.channel.send(facEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="ping" || arguments[0].trim().toLowerCase()=="speed" || arguments[0].trim().toLowerCase()=="network" || arguments[0].trim().toLowerCase()=="latency" || arguments[0].trim().toLowerCase()=="uptime") {
			const pingEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'ping'},
					{ name: 'Also usable', value: 'speed \nnetwork \nlatency \nuptime \ndowntime'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command>'},
					{ name: 'Examples', value: '^stoopit ping'},
				)
			receivedMessage.channel.send(pingEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="google") {
			const googleEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'google'},
					{ name: 'Also usable', value: 'search'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <query>'},
					{ name: 'Examples', value: '^stoopit google am i stupid'},
				)
			receivedMessage.channel.send(googleEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="bing") {
			const bingEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'bing'},
					{ name: 'Also usable', value: 'none'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <query>'},
					{ name: 'Examples', value: '^stoopit bing what is a comparator'},
				)
			receivedMessage.channel.send(bingEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="yahoo") {
			const yahooEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'yahoo'},
					{ name: 'Also usable', value: 'none'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command> <query>'},
					{ name: 'Examples', value: '^stoopit yahoo who am i'},
				)
			receivedMessage.channel.send(yahooEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="pong") {
			const pongEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'pong'},
					{ name: 'Also usable', value: 'none'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command>'},
					{ name: 'Examples', value: '^stoopit pong'},
				)
			receivedMessage.channel.send(pongEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="die") {
			const dieEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'die'},
					{ name: 'Also usable', value: 'none'},
					{ name: 'Usages', value: 'Note the spaces and commas carefully.\n^stoopit <command>\n^stoopit <command> <death message>\n^stoopit <command> <death message>,<reason>'},
					{ name: 'Examples', value: '^stoopit die\n^stoopit die drank too much coffee\n^stoopit die killed by potatoes, ate their friend\n^stoopit die for no reason'},
				)
			receivedMessage.channel.send(dieEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="kill" || arguments[0].trim().toLowerCase()=="murder") {
			const killEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'kill'},
					{ name: 'Also usable', value: 'murder'},
					{ name: 'Usages', value: 'Note the spaces and commas carefully.\n^stoopit <command> <target>\n^stoopit <command> <target>,<death message>\n^stoopit <command> <target>,<death message>,<reason>'},
					{ name: 'Examples', value: '^stoopit kill @user\n^stoopit murder @someone\n^stoopit kill david , shot by a gun\n^stoopit murder trump, hit by a car\n^stoopit kill potato, said my bot was bad\n^stoopit kill a dinosaur named bob, hit by a car, wished for a girlfriend'},
				)
			receivedMessage.channel.send(killEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="count" || arguments[0].trim().toLowerCase()=="member" || arguments[0].trim().toLowerCase()=="members" || arguments[0].trim().toLowerCase()=="membercount") {
			const pongEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'count'},
					{ name: 'Also usable', value: 'member \nmembers \nmembercount'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command>'},
					{ name: 'Examples', value: '^stoopit count \n^stoopit members \n^stoopit membercount'},
				)
			receivedMessage.channel.send(pongEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="functions" || arguments[0].trim().toLowerCase()=="function" || arguments[0].trim().toLowerCase()=="funct" || arguments[0].trim().toLowerCase()=="feature" || arguments[0].trim().toLowerCase()=="features") {
			const functionEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'functions'},
					{ name: 'Also usable', value: 'function \nfunct \nfeature \nfeatures'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command>'},
					{ name: 'Examples', value: '^stoopit functions'},
				)
			receivedMessage.channel.send(functionEmbed)
			
			
			
		} else if (arguments[0].trim().toLowerCase()=="help" || arguments[0].trim().toLowerCase()=="halp" || arguments[0].trim().toLowerCase()=="command" || arguments[0].trim().toLowerCase()=="comands") {
			const functionEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle(arguments[0]+" command")
				.setDescription("Don't forget to use ^stoopit before the command!")
				.addFields(
					{ name: 'Command', value: 'help'},
					{ name: 'Also usable', value: 'halp \ncommand \ncommands'},
					{ name: 'Usages', value: 'Note the spaces carefully.\n^stoopit <command>\n^stoopit <command> <command>\n^stoopit <command> <category>'},
					{ name: 'Examples', value: '^stoopit help \n^stoopit help ping \n^stoopit help maths'},
				)
			receivedMessage.channel.send(functionEmbed)
			
			
			
		} else {
			receivedMessage.channel.send("There is no such command. Try `^stoopit help` for the list of commands. ")
			const realHelpEmbed=new Discord.MessageEmbed()
				.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
				.setTitle("Commands")
				.setDescription("Don't forget to use `^stoopit help` before each topics!")
				.addFields(
					{ name: 'Fun', value: 'Fun Stuffs', inline: true  },
					{ name: 'Maths', value: 'Nobody likes maths', inline: true },
					{ name: 'Other stuffs', value: 'Stuffs', inline: true },
				)
			receivedMessage.channel.send(realHelpEmbed)
			receivedMessage.channel.send("Want to request a feature? Go message \@DavidNyan10\#8581")
		}
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function realHelpCommand(receivedMessage) {
	try{
		const realHelpEmbed=new Discord.MessageEmbed()
			.setColor([getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)])
			.setTitle("Commands")
			.setDescription("Don't forget to use `^stoopit help` before each topics!")
			.addFields(
				{ name: 'Fun', value: 'Fun Stuffs', inline: true  },
				{ name: 'Maths', value: 'Nobody likes maths', inline: true },
				{ name: 'Other stuffs', value: 'Stuffs', inline: true },
			)
		receivedMessage.channel.send("jkjk. Here. ")
		receivedMessage.channel.send(realHelpEmbed)
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function piFunction() {
	let result = ":three:.";
	let pi = "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690927210797509302955321165344987202755960236480665499119881834797753566369807426542527862551818417574672890977772793800081647060016145249192173217214772350141441973568548161361157352552133475741849468438523323907394143334547762416862518983569485562099219222184272550254256887671790494601653466804988627232791786085784383827967976681454100953883786360950680064225125205117392984896084128488626945604241965285022210661186306744278622039194945047123713786960956364371917287467764657573962413890865832645995813390478027590"
	let worded;
	let digit;
	let wordArray = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"]
	for(i=0;i<2000;i++) {
		worded = wordArray[pi.charAt(i)]
		if (result.length+worded.length>2000) {
			return result; //send the message to the channel
			break;
		}
		result = result + worded
	}
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function indince(num1, num2) {
	try{
		let answer=1
		for (j=1;j<=num2;j++) {
			answer=answer*num1
		}
		return answer
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


function fac(num) {
	try{
		let result=1
		for (i=1;i<=num;i++) {
			result=result*i
		}
		return result
	} catch(err) {
		const errEmbed=new Discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setTitle("❌ Error")
			.setDescription("😵 An error has occured")
			.addFields(
				{ name: err.name+":", value: err.message, inline: true },
			)
		receivedMessage.channel.send(errEmbed)
		console.log(err.stack)
		receivedMessage.channel.send("\`\`\`"+err.stack+"\`\`\`")
	}
}


const token = fs.readFileSync("token.txt", "utf8")
client.login(token)



//https://discord.com/api/oauth2/authorize?client_id=724161477522751508&permissions=384064&scope=bot

/*



Commands

Maths



multiply																	//command

time																		//also usable

^stoopit <command> <number 1> <number 2> <number 3> <...>					//usages
^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>

^stoopit multiply 3 8														//examples
^stoopit time 3 6 8
^stoopit multiply 2 8 31 339 2397
^stoopit time 3 and 9
^stoopit multiply 8 with 3


add

sum

^stoopit <command> <number 1> <number 2> <number 3> <...>
^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>

^stoopit add 3 8
^stoopit sum 3 6 8
^stoopit add 2 8 31 339 2397
^stoopit sum 3 and 9
^stoopit add 8 with 3


minus

subtract, difference

^stoopit <command> <number 1> <number 2> <number 3> <...>
^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>

^stoopit minus 3 8
^stoopit subtract 3 6 8
^stoopit difference 2 8 31 339 2397
^stoopit minus 3 and 9
^stoopit subtract 8 with 3


divide

none

^stoopit <command> <number 1> <number 2> <number 3> <...>
^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>

^stoopit divide 3 8
^stoopit divide 3 6 8
^stoopit divide 2 8 31 339 2397
^stoopit divide 3 and 9
^stoopit divide 8 with 3


power

exponent, index, indice, exp

^stoopit <command> <number 1> <number 2> <number 3> <...>
^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>

^stoopit power 3 7
^stoopit power 8 9 3
^stoopit exponent 9 and 0
^stoopit index 0 powered 7


factorial

factorialize, fac, fct, factorialise

^stoopit <command> <number 1> <number 2> <number 3> <...>
^stoopit <command> <number 1> <any word (and, with, etc.)> <number 2>

^stoopit factorial 4
^stoopit factorialize 9
^stoopit fac 3
^stoopit fct 8



Other stuffs


ping

^stoopit <command>

speed, network, latency

^stoopit ping



Fun

google

none

^stoopit <command> <query>

^stoopit google am i stupid


yahoo

none

^stoopit <command> <query>

^stoopit yahoo who am i


bing

^stoopit <command> <query>

none

^stoopit bing what is a comparator


pong

^stoopit <command>

none

^stoopit pong


die

^stoopit <command>
^stoopit <command> <death message>
^stoopit <command> <death message>,<reason>

none

die


kill

murder

^stoopit <command> <target>
^stoopit <command> <target>,<death message>
^stoopit <command> <target>,<death message>,<reason>

^stoopit kill @user
^stoopit murder @someone
^stoopit kill david , shot by a gun
^stoopit murder trump, hit by a car
^stoopit kill potato, said my bot was bad
^stoopit kill a dinosaur named bob, hit by a car, wished for a girlfriend


*/

/*

To-do list

2. maths command string thing 1
3. google command 4
4. count command 5
6. avatar command 6
7. status function 3
8. custom emojis 7
9. spam command 2
8. data for each server
9. Hentai command

*/