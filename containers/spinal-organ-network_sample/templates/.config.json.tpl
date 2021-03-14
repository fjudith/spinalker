{
  spinalConnector: {
    user: __SPINAL_USER_ID__, // user id - process.env.SPINAL_USER_ID
    password: "__SPINAL_PASSWORD__", // user password - process.env.SPINAL_USER_ID 
    host: "__SPINALHUB_IP__", // can be an ip address - process.env.SPINALHUB_IP
    port: __SPINALHUB_PORT__ // port - process.env.SPINALHUB_PORT
  },
  file: {
    // path to a digital twin in spinalhub filesystem || process.env.SPINAL_DTWIN_PATH
    path: '__SPINAL_DTWIN_PATH__' 
  },
  organ: {
    contextName: "Network",
    contextType: "Network",
    networkType: "NetworkVirtual",
    networkName: "NetworkVirtual"
  }
}