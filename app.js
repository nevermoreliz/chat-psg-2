const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const { adapterDB } = require('./provider/database')
const ServerBotAPI = require('./apiBot')

const welcomFlow = require('./flows/welcom.flow')
const ChatGPTClass = require('./provider/agents/chatgpt.class.js')



// const ChatGPTInstance = new ChatGPTClass()

const main = async () => {
    await adapterDB.init();
    const adapterFlow = createFlow([welcomFlow])

    const adapterProvider = createProvider(BaileysProvider)
    const serverBotApi = new ServerBotAPI(adapterProvider, adapterDB)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    

    // QRPortalWeb()
    serverBotApi.start()
}

main()
