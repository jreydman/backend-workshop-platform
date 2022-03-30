config = {}
config.mode=process.env.NODE_ENV || 'production'
config.port=process.env.SERVER_PORT || 8000
config.mongoose = {
    url: process.env.DB_MONGO_URI || '',
    options: {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //reconnectTries: Number.MAX_VALUE, //Mongoose продолжать выполнять попытки подключения неопределенный срок
        //reconnectInterval: 500, //определяет период между попытками переподключения в миллисекундах
        //connectTimeoutMS: 10000, // указывает [N] секунд в качестве периода, которое драйвер Mongo будет ждать, прежде чем попытаться снова установить соединение.
    },
}
config.templater = {
    engine: process.env.SERVER_VIEW_ENGINE,
    path: {
        view: process.env.SERVER_FOLDER_VIEWS,
        static: process.env.SERVER_FOLDER_STATIC
    }
}
config.session = {
    secret: process.env.APP_SECRET,
    key: "sid",
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null,
    }
}

config.authenticate = {
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessTime: process.env.JWT_ACCESS_TIME,
        refreshTime: process.env.JWT_REFRESH_TIME,
    }
}
config.mailer = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMPT_PASSWORD,
}

module.exports=config