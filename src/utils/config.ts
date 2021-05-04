let DEV_URL = ''
let MQTT_URL = ''
if (process.env.NODE_ENV === 'development') {
  // 开发环境相关特殊方法
  /* DEV_URL = 'https://search.ygqp999.com'
  MQTT_URL = 'wss://emq.ygqp999.com:443/mqtt' */
  DEV_URL = 'http://192.168.10.120:8091'
  MQTT_URL = 'ws://192.168.10.22:8083/mqtt'
  /* DEV_URL = 'http://192.168.10.104:9081'
  MQTT_URL = 'ws://192.168.10.22:8083/mqtt' */
}

if (process.env.NODE_ENV === 'production') {
  // 生产环境相关特殊方法
  DEV_URL = 'http://192.168.10.120:8091'
  MQTT_URL = 'ws://192.168.10.22:8083/mqtt'
}

if (process.env.VUE_APP_SERVER_NAME === '1111') {
  // 生产环境相关特殊方法
  DEV_URL = 'https://search.betf.me'
  MQTT_URL = 'wss://emq.betf.me:443/mqtt'
  /* MQTT_URL = 'ws://35.189.178.190:8083/mqtt' */
}

if (process.env.VUE_APP_SERVER_NAME === '58') {
  // 生产环境相关特殊方法
  DEV_URL = 'http://192.168.10.104:8091'
  MQTT_URL = 'ws://192.168.10.22:8083/mqtt'
  /* MQTT_URL = 'ws://35.189.178.190:8083/mqtt' */
}

export {
  DEV_URL, MQTT_URL
}

export const POLL_TIME = {
  inPlay: 10,
  parlay: 30,
  today: 30,
  early: 30
}
